import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import React from 'react'

const SearchAsset = () => {
  return (
    <div className="relative max-w-xl w-full border animate-none">
      <input
        type="text"
        placeholder="Buscar Ativo ou Local"
        className="w-full pl-4 pr-12 h-12 outline-none border-b focus:ring-0"
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
        <span className="sr-only">Buscar</span>
      </button>
    </div>
  )
}

export default SearchAsset