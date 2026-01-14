import React from 'react'
import { Award, BarChart3, Building2, Users, TrendingUp } from 'lucide-react'

type Props = {
  activeTab: string
  setActiveTab: (s: any) => void
  sidebarOpen: boolean
  setSidebarOpen: (v: boolean) => void
  setShowBrandForm: (v: boolean) => void
  setShowAthleteForm: (v: boolean) => void
}

const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, setShowBrandForm, setShowAthleteForm }) => {
  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gradient-to-b from-orange-500 to-orange-600 text-white transition-all duration-300 overflow-hidden flex-shrink-0`}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Award size={28} className="text-white" />
          <h1 className="text-2xl font-bold">Peakline</h1>
        </div>
        <nav className="space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'}`}>
            <BarChart3 size={20} />
            <span className="font-medium">Dashboard</span>
          </button>
          <button onClick={() => setActiveTab('brands')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'brands' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'}`}>
            <Building2 size={20} />
            <span className="font-medium">Brands</span>
          </button>
          <button onClick={() => setActiveTab('athletes')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'athletes' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'}`}>
            <Users size={20} />
            <span className="font-medium">Athletes</span>
          </button>
          <button onClick={() => setActiveTab('matches')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'matches' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'}`}>
            <TrendingUp size={20} />
            <span className="font-medium">Smart Matches</span>
          </button>
          <button onClick={() => setActiveTab('deals')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'deals' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'}`}>
            <Award size={20} />
            <span className="font-medium">Deals</span>
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
