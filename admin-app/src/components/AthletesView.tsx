import React from 'react'
import { Award, Building2, MapPin, Users, TrendingUp } from 'lucide-react'
import type { Athlete } from '../types'

type Props = { athletes: Athlete[]; setShowAthleteForm: (v: boolean) => void }

const AthletesView: React.FC<Props> = ({ athletes, setShowAthleteForm }) => {
  if (athletes.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="text-orange-600" size={40} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Athletes Yet</h3>
        <p className="text-gray-600 mb-6">Start by adding your first athlete to the platform</p>
        <button onClick={() => setShowAthleteForm(true)} className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm">Add First Athlete</button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {athletes.map(athlete => (
        <div key={athlete.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{athlete.name}</h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600"><Award size={16} className="text-orange-500" /><span className="font-medium">{athlete.sport}</span></div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><Building2 size={16} className="text-orange-500" /><span>{athlete.school}</span></div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><MapPin size={16} className="text-orange-500" /><span>{athlete.location}</span></div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><Users size={16} className="text-orange-500" /><span className="font-semibold">{athlete.followers.toLocaleString()}</span> followers</div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><TrendingUp size={16} className="text-orange-500" /><span className="font-semibold">{athlete.engagementRate.toFixed(1)}%</span> engagement</div>
          </div>
          {athlete.bio && <p className="text-sm text-gray-700 border-t border-gray-100 pt-3">{athlete.bio}</p>}
        </div>
      ))}
    </div>
  )
}

export default AthletesView
