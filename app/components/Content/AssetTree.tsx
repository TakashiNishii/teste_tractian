"use client"
import React from 'react'
import SearchAsset from './SearchAsset'
import AssetList from './AssetList'
import { useFiltersContext } from '../../context/FiltersContext'
import { Cog8ToothIcon } from '@heroicons/react/16/solid'


const AssetTree = () => {
  const { loading } = useFiltersContext()
  console.log(loading)
  return (
    <div className='flex flex-col min-w-[25%] border rounded-sm'>
      <SearchAsset />
      {!loading ?
        <AssetList />
        :
        <div className='flex flex-row gap-2'>
          <Cog8ToothIcon className='w-8 h-8 animate-spin text-accent' />
          <span className='text-accent animate-pulse'>
            Carregando...
          </span>
        </div>
      }
    </div>
  )
}

export default AssetTree