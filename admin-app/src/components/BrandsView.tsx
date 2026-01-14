import React from 'react'
import { Building2, Target, MapPin, DollarSign, Users } from 'lucide-react'
import type { Brand } from '../types'

type Props = { brands: Brand[]; setShowBrandForm: (v: boolean) => void }

const BrandsView: React.FC<Props> = ({ brands, setShowBrandForm }) => {
  if (brands.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="text-orange-600" size={40} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Brands Yet</h3>
        <p className="text-gray-600 mb-6">Start by adding your first brand to the platform</p>
        <button onClick={() => setShowBrandForm(true)} className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm">Add First Brand</button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {brands.map(brand => (
        <div key={brand.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{brand.name}</h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600"><Target size={16} className="text-orange-500" /><span className="font-medium">{brand.category}</span></div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><MapPin size={16} className="text-orange-500" /><span>{brand.location}</span></div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><DollarSign size={16} className="text-orange-500" /><span className="font-semibold">${brand.budget.toLocaleString()}</span> budget</div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><Users size={16} className="text-orange-500" /><span>{brand.targetAudience}</span></div>
          </div>
          {brand.description && <p className="text-sm text-gray-700 border-t border-gray-100 pt-3">{brand.description}</p>}
        </div>
      ))}
    </div>
  )
}

export default BrandsView
