import React from 'react'
import { Menu, Plus } from 'lucide-react'

type Props = {
  activeTab: string
  sidebarOpen: boolean
  setSidebarOpen: (v: boolean) => void
  setShowBrandForm: (v: boolean) => void
  setShowAthleteForm: (v: boolean) => void
}

const Header: React.FC<Props> = ({ activeTab, sidebarOpen, setSidebarOpen, setShowBrandForm, setShowAthleteForm }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 hover:text-gray-900 transition-colors"><Menu size={24} /></button>
        <h2 className="text-2xl font-bold text-gray-900">
          {activeTab === 'dashboard' && 'Dashboard'}
          {activeTab === 'brands' && 'Brands'}
          {activeTab === 'athletes' && 'Athletes'}
          {activeTab === 'matches' && 'Smart Matches'}
          {activeTab === 'deals' && 'Deals'}
        </h2>
      </div>
      {activeTab === 'brands' && (
        <button onClick={() => setShowBrandForm(true)} className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
          <Plus size={20} />
          <span className="font-medium">Add Brand</span>
        </button>
      )}
      {activeTab === 'athletes' && (
        <button onClick={() => setShowAthleteForm(true)} className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
          <Plus size={20} />
          <span className="font-medium">Add Athlete</span>
        </button>
      )}
    </div>
  )
}

export default Header
