import React from 'react'
import { AlertCircle, TrendingUp } from 'lucide-react'
import type { MatchEvaluation, Brand, Athlete } from '../types'

type Props = { matchEvaluations: MatchEvaluation[]; brands: Brand[]; athletes: Athlete[] }

const MatchesView: React.FC<Props> = ({ matchEvaluations, brands, athletes }) => {
  if (matchEvaluations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="text-orange-600" size={40} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Matches Available</h3>
        <p className="text-gray-600">Add brands and athletes to generate AI-powered smart match recommendations</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {matchEvaluations.map(match => {
        const brand = brands.find(b => b.id === match.brandId);
        const athlete = athletes.find(a => a.id === match.athleteId);
        return (
          <div key={match.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{brand?.name} <span className="text-gray-400 font-normal">×</span> {athlete?.name}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded font-medium">{brand?.category}</span>
                  <span className="text-gray-400">•</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">{athlete?.sport}</span>
                </div>
              </div>
              <div className="text-right ml-6">
                <div className={`text-4xl font-bold ${match.score >= 80 ? 'text-green-600' : match.score >= 65 ? 'text-orange-500' : 'text-gray-600'}`}>{match.score}</div>
                <p className="text-sm text-gray-500 font-medium">FIT SCORE</p>
              </div>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">{match.explanation}</p>

            <div className="grid grid-cols-5 gap-3 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center"><div className="text-xl font-bold text-gray-900">{Math.round(match.audienceOverlap)}</div><div className="text-xs text-gray-600 mt-1">Audience</div></div>
              <div className="text-center"><div className="text-xl font-bold text-gray-900">{Math.round(match.locationMatch)}</div><div className="text-xs text-gray-600 mt-1">Location</div></div>
              <div className="text-center"><div className="text-xl font-bold text-gray-900">{Math.round(match.engagementQuality)}</div><div className="text-xs text-gray-600 mt-1">Engagement</div></div>
              <div className="text-center"><div className="text-xl font-bold text-gray-900">{Math.round(match.categoryAlignment)}</div><div className="text-xs text-gray-600 mt-1">Category</div></div>
              <div className="text-center"><div className="text-xl font-bold text-gray-900">{Math.round(match.budgetFit)}</div><div className="text-xs text-gray-600 mt-1">Budget</div></div>
            </div>

            {match.riskFactors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-900 mb-2">Risk Factors</p>
                    <ul className="text-sm text-red-700 space-y-1">
                      {match.riskFactors.map((risk, idx) => (<li key={idx} className="flex items-start gap-2"><span className="text-red-400 mt-1">•</span><span>{risk}</span></li>))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MatchesView
