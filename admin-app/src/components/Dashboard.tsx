import React from 'react'
import { Building2, Users, Award, TrendingUp } from 'lucide-react'
import type { Brand, Athlete, MatchEvaluation } from '../types'

type Props = {
  stats: { totalBrands: number; totalAthletes: number; activeDeals: number; topMatches: number }
  matchEvaluations: MatchEvaluation[]
  brands: Brand[]
  athletes: Athlete[]
  setActiveTab: (s: any) => void
  setShowBrandForm: (v: boolean) => void
  setShowAthleteForm: (v: boolean) => void
}

const Dashboard: React.FC<Props> = ({ stats, matchEvaluations, brands, athletes, setActiveTab, setShowBrandForm, setShowAthleteForm }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Total Brands</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalBrands}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Building2 className="text-orange-600" size={28} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Total Athletes</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalAthletes}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="text-orange-600" size={28} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Active Deals</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeDeals}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Award className="text-orange-600" size={28} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Top Matches (80+)</p>
              <p className="text-3xl font-bold text-gray-900">{stats.topMatches}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="text-orange-600" size={28} />
            </div>
          </div>
        </div>
      </div>

      {matchEvaluations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="text-orange-600" size={40} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Peakline</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">Add brands and athletes to unlock AI-powered smart match recommendations</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => { setActiveTab('brands'); setShowBrandForm(true); }} className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm">Add Your First Brand</button>
            <button onClick={() => { setActiveTab('athletes'); setShowAthleteForm(true); }} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">Add Your First Athlete</button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Match Recommendations</h3>
          <div className="space-y-4">
            {matchEvaluations.slice(0, 5).map(match => {
              const brand = brands.find(b => b.id === match.brandId);
              const athlete = athletes.find(a => a.id === match.athleteId);
              return (
                <div key={match.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">{brand?.name} <span className="text-gray-400">×</span> {athlete?.name}</p>
                    <p className="text-sm text-gray-600">{match.explanation}</p>
                  </div>
                  <div className="ml-6 text-right">
                    <div className={`text-3xl font-bold ${match.score >= 80 ? 'text-green-600' : match.score >= 65 ? 'text-orange-500' : 'text-gray-600'}`}>{match.score}</div>
                    <p className="text-xs text-gray-500 font-medium">FIT SCORE</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
