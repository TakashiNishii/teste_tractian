"use client"
import React from 'react'
import SearchAsset from './SearchAsset'
import AssetList from './AssetList'


const AssetTree = () => {
  return (
    <div className='flex flex-col min-w-[25%] border rounded-sm'>
      <SearchAsset />
      <AssetList />
    </div>
  )
}

export default AssetTree