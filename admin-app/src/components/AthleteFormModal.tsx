import React from 'react'
import { X } from 'lucide-react'
import type { Athlete } from '../types'

type Props = {
  show: boolean
  onClose: () => void
  athleteForm: any
  setAthleteForm: (b: any) => void
  handleAddAthlete: () => void
}

const AthleteFormModal: React.FC<Props> = ({ show, onClose, athleteForm, setAthleteForm, handleAddAthlete }) => {
  if (!show) return null
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Add New Athlete</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={24} /></button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Athlete Name <span className="text-red-500">*</span></label>
            <input type="text" value={athleteForm.name} onChange={(e)=>setAthleteForm({...athleteForm, name: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., Jordan Smith" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sport <span className="text-red-500">*</span></label>
            <select value={athleteForm.sport} onChange={(e)=>setAthleteForm({...athleteForm, sport: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option value="">Select sport</option>
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Baseball">Baseball</option>
              <option value="Soccer">Soccer</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Track">Track & Field</option>
              <option value="Swimming">Swimming</option>
              <option value="Tennis">Tennis</option>
              <option value="Golf">Golf</option>
              <option value="Wrestling">Wrestling</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">School <span className="text-red-500">*</span></label>
            <input type="text" value={athleteForm.school} onChange={(e)=>setAthleteForm({...athleteForm, school: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., University of Georgia" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location <span className="text-red-500">*</span></label>
            <input type="text" value={athleteForm.location} onChange={(e)=>setAthleteForm({...athleteForm, location: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., Athens, GA" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Followers <span className="text-red-500">*</span></label>
            <input type="number" value={athleteForm.followers} onChange={(e)=>setAthleteForm({...athleteForm, followers: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 45000" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Engagement Rate (%) <span className="text-gray-500 font-normal ml-2 text-xs">Optional - auto-estimated if blank</span></label>
            <input type="number" step="0.1" value={athleteForm.engagementRate} onChange={(e)=>setAthleteForm({...athleteForm, engagementRate: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 4.2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
            <textarea value={athleteForm.bio} onChange={(e)=>setAthleteForm({...athleteForm, bio: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none" rows={4} placeholder="Brief bio" />
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button onClick={onClose} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={handleAddAthlete} className="flex-1 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600">Add Athlete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AthleteFormModal
