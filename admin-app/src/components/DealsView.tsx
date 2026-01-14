import React from 'react'

const DealsView: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
      <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/></svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Deals Management</h3>
      <p className="text-gray-600">Deal tracking and contract management coming soon</p>
    </div>
  )
}

export default DealsView
