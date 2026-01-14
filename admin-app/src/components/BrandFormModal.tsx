import React from 'react'
import { X } from 'lucide-react'
import type { Brand } from '../types'

type Props = {
  show: boolean
  onClose: () => void
  brandForm: any
  setBrandForm: (b: any) => void
  handleAddBrand: () => void
}

const BrandFormModal: React.FC<Props> = ({ show, onClose, brandForm, setBrandForm, handleAddBrand }) => {
  if (!show) return null
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Add New Brand</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={24} /></button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Brand Name <span className="text-red-500">*</span></label>
            <input type="text" value={brandForm.name} onChange={(e)=>setBrandForm({...brandForm, name: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., Atlanta Sports Gear" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
            <select value={brandForm.category} onChange={(e)=>setBrandForm({...brandForm, category: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option value="">Select category</option>
              <option value="Apparel">Apparel</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Fitness">Fitness</option>
              <option value="Technology">Technology</option>
              <option value="Automotive">Automotive</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Health & Wellness">Health & Wellness</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location <span className="text-red-500">*</span></label>
            <input type="text" value={brandForm.location} onChange={(e)=>setBrandForm({...brandForm, location: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., Atlanta, GA" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Budget ($) <span className="text-red-500">*</span></label>
            <input type="number" value={brandForm.budget} onChange={(e)=>setBrandForm({...brandForm, budget: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., 15000" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience <span className="text-red-500">*</span></label>
            <input type="text" value={brandForm.targetAudience} onChange={(e)=>setBrandForm({...brandForm, targetAudience: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g., College athletes, Sports fans" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea value={brandForm.description} onChange={(e)=>setBrandForm({...brandForm, description: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none" rows={4} placeholder="Brief description" />
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button onClick={onClose} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={handleAddBrand} className="flex-1 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600">Add Brand</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandFormModal
