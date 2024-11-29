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
        <div className='flex flex-row gap-2 h-[calc(100dvh-25dvh)] justify-center'>
          <Cog8ToothIcon className='w-8 h-8 animate-spin text-accent mt-2' />
          <span className='text-accent animate-pulse mt-2'>
            Carregando...
          </span>
        </div>
      }
    </div>
  )
}

export default AssetTree