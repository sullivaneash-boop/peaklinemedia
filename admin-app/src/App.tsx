import React, { useState, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import type { Brand, Athlete, MatchEvaluation, Deal } from './types'
import { calculateFitScore } from './lib/calc'
import Auth0Guard from './components/Auth0Guard'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import BrandsView from './components/BrandsView'
import AthletesView from './components/AthletesView'
import MatchesView from './components/MatchesView'
import DealsView from './components/DealsView'
import BrandFormModal from './components/BrandFormModal'
import AthleteFormModal from './components/AthleteFormModal'

const AppContent: React.FC = () => {
  const { user, logout } = useAuth0()
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [matchEvaluations, setMatchEvaluations] = useState<MatchEvaluation[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'brands' | 'athletes' | 'deals' | 'matches'>('dashboard');
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [showAthleteForm, setShowAthleteForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [brandForm, setBrandForm] = useState({ name: '', category: '', location: '', budget: '', targetAudience: '', description: '' });
  const [athleteForm, setAthleteForm] = useState({ name: '', sport: '', school: '', location: '', followers: '', engagementRate: '', bio: '' });

  const generateMatches = (newBrands: Brand[], newAthletes: Athlete[]) => {
    const matches: MatchEvaluation[] = [];
    newBrands.forEach(brand => {
      newAthletes.forEach(athlete => {
        const evaluation = calculateFitScore(brand, athlete);
        matches.push({ ...evaluation, id: `${brand.id}-${athlete.id}`, createdAt: new Date().toISOString() });
      });
    });
    return matches.sort((a, b) => b.score - a.score);
  }

  const handleAddBrand = () => {
    if (!brandForm.name || !brandForm.category || !brandForm.location || !brandForm.budget || !brandForm.targetAudience) { alert('Please fill in all required fields'); return; }
    const newBrand: Brand = { id: Date.now().toString(), name: brandForm.name, category: brandForm.category, location: brandForm.location, budget: parseFloat(brandForm.budget), targetAudience: brandForm.targetAudience, description: brandForm.description, createdAt: new Date().toISOString() };
    const updatedBrands = [...brands, newBrand];
    setBrands(updatedBrands);
    setMatchEvaluations(generateMatches(updatedBrands, athletes));
    setBrandForm({ name: '', category: '', location: '', budget: '', targetAudience: '', description: '' });
    setShowBrandForm(false);
  }

  const handleAddAthlete = () => {
    if (!athleteForm.name || !athleteForm.sport || !athleteForm.school || !athleteForm.location || !athleteForm.followers) { alert('Please fill in all required fields'); return; }
    const followers = parseInt(athleteForm.followers);
    const engagementRate = athleteForm.engagementRate ? parseFloat(athleteForm.engagementRate) : (followers > 50000 ? 4.2 : followers > 20000 ? 3.8 : 3.5);
    const newAthlete: Athlete = { id: Date.now().toString(), name: athleteForm.name, sport: athleteForm.sport, school: athleteForm.school, location: athleteForm.location, followers, engagementRate, bio: athleteForm.bio, createdAt: new Date().toISOString() };
    const updatedAthletes = [...athletes, newAthlete];
    setAthletes(updatedAthletes);
    setMatchEvaluations(generateMatches(brands, updatedAthletes));
    setAthleteForm({ name: '', sport: '', school: '', location: '', followers: '', engagementRate: '', bio: '' });
    setShowAthleteForm(false);
  }

  const stats = useMemo(() => ({ totalBrands: brands.length, totalAthletes: athletes.length, activeDeals: deals.filter(d => d.status === 'active').length, topMatches: matchEvaluations.filter(m => m.score >= 80).length }), [brands, athletes, deals, matchEvaluations]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setShowBrandForm={setShowBrandForm} setShowAthleteForm={setShowAthleteForm} />
      <div className="flex-1 overflow-auto">
        <Header activeTab={activeTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setShowBrandForm={setShowBrandForm} setShowAthleteForm={setShowAthleteForm} />
        <div className="p-8">
          {activeTab === 'dashboard' && <Dashboard stats={stats} matchEvaluations={matchEvaluations} brands={brands} athletes={athletes} setActiveTab={setActiveTab} setShowBrandForm={setShowBrandForm} setShowAthleteForm={setShowAthleteForm} />}
          {activeTab === 'brands' && <BrandsView brands={brands} setShowBrandForm={setShowBrandForm} />}
          {activeTab === 'athletes' && <AthletesView athletes={athletes} setShowAthleteForm={setShowAthleteForm} />}
          {activeTab === 'matches' && <MatchesView matchEvaluations={matchEvaluations} brands={brands} athletes={athletes} />}
          {activeTab === 'deals' && <DealsView />}
        </div>
      </div>

      <BrandFormModal show={showBrandForm} onClose={()=>setShowBrandForm(false)} brandForm={brandForm} setBrandForm={setBrandForm} handleAddBrand={handleAddBrand} />
      <AthleteFormModal show={showAthleteForm} onClose={()=>setShowAthleteForm(false)} athleteForm={athleteForm} setAthleteForm={setAthleteForm} handleAddAthlete={handleAddAthlete} />
    </div>
  )
}

const App: React.FC = () => {
  return (
    <Auth0Guard>
      <AppContent />
    </Auth0Guard>
  )
}

export default App;

