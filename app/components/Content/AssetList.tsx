"use client"

import { useFiltersContext } from "../../context/FiltersContext"
import AssetItem from "./AssetItem"

const AssetList = () => {

  const { organizedAssets } = useFiltersContext()
  return (
    <div className="flex flex-col h-[calc(100dvh-50dvh)] md:h-[calc(100dvh-25dvh)] overflow-y-auto gap-2 px-1 py-2">
      {organizedAssets.map((asset) => (
        <AssetItem
          key={asset.id}
          asset={asset}
          isEmpty={asset.children.length === 0}
          typeAsset={asset.typeAssets}
          level={0}
        />
      ))}
    </div>
  )
}

export default AssetList