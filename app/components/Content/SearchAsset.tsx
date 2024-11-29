import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import React, { useEffect } from 'react'
import { useFiltersContext } from '../../context/FiltersContext'

const SearchAsset = () => {
  const { filterName, setFilterName } = useFiltersContext()
  const [search, setSearch] = React.useState<string>('')
  useEffect(() => {
    // debounce
    const timer = setTimeout(() => {
      setFilterName(search)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  return (
    <div className="relative max-w-xl w-full border animate-none">
      <input
        type="text"
        placeholder="Buscar Ativo ou Local"
        className="w-full pl-4 pr-12 h-12 outline-none border-b focus:ring-0"
        defaultValue={filterName}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        onClick={() => setFilterName(search)}
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
        <span className="sr-only">Buscar</span>
      </button>
    </div>
  )
}

export default SearchAsset