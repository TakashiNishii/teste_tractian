"use client"

import { useFiltersContext } from "../../context/FiltersContext"
import AssetItem from "./AssetItem"

const AssetList = () => {

  const { organizedLocations } = useFiltersContext()

  return (
    <div className="flex flex-col gap-2 px-1 py-2">
      {organizedLocations.map((location) => (
        <AssetItem
          key={location.id}
          location={location}
          isEmpty={location.children.length === 0}
          typeAsset="location"
          level={0}
        />
      ))}
    </div>
  )
}

export default AssetList