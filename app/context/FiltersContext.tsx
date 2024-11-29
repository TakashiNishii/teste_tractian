"use client"
import React, { createContext, useContext, useEffect } from "react";
import { Company, Assets, AssetsOrganized } from '../enum/Types'

export interface FiltersContextProps {
  companySelected?: Company;
  setCompanySelected: (company: Company) => void;
  filterName: string;
  setFilterName: (filterName: string) => void;
  filterComponentType: string;
  setFilterComponentType: (filterComponentType: string) => void;
  filterStatus: string;
  setFilterStatus: (filterStatus: string) => void;
  assets: Assets[];
  setAssets: (assets: Assets[]) => void;
  organizedAssets: AssetsOrganized[];
}


export const FiltersContext = createContext<FiltersContextProps>({
  companySelected: undefined,
  setCompanySelected: () => { },
  filterName: "",
  setFilterName: () => { },
  filterComponentType: "",
  setFilterComponentType: () => { },
  filterStatus: "",
  setFilterStatus: () => { },
  assets: [],
  setAssets: () => { },
  organizedAssets: [],
});

export const useFiltersContext = () => useContext(FiltersContext);

export interface FiltersContextProviderProps {
  children: React.ReactNode;
}

export const FiltersProvider: React.FC<FiltersContextProviderProps> = ({ children }: FiltersContextProviderProps) => {
  const [companySelected, setCompanySelected] = React.useState<
    Company | undefined
  >(undefined);
  const [assets, setAssets] = React.useState<Assets[]>([])
  const [organizedAssets, setOrganizedAssets] = React.useState<AssetsOrganized[]>([])
  const [filterName, setFilterName] = React.useState<string>('')
  const [filterComponentType, setFilterComponentType] = React.useState<string>('')
  const [filterStatus, setFilterStatus] = React.useState<string>('')

  useEffect(() => {
    organizeAssets()
  }, [assets, filterName, filterComponentType, filterStatus])

  const organizeAssets = () => {
    const organized: AssetsOrganized[] = []
    assets.forEach((asset) => {
      if (!asset.parentId && !asset.locationId) {
        organized.push({
          ...asset,
          children: getChildren(asset.id)
        })
      }
    })

    setOrganizedAssets(filterAssets(organized))
  }

  const filterAssets = (assets: AssetsOrganized[]): AssetsOrganized[] => {
    return assets.reduce((acc: AssetsOrganized[], asset) => {
      const filteredChildren = filterAssets(asset.children);

      const matchesFilter =
        (!filterName || asset.name.toLowerCase().includes(filterName.toLowerCase())) &&
        (!filterComponentType || asset.sensorType === filterComponentType) &&
        (!filterStatus || asset.status === filterStatus);

      if (matchesFilter || filteredChildren.length > 0) {
        acc.push({
          ...asset,
          children: filteredChildren
        });
      }

      return acc;
    }, []);
  };

  const getChildren = (parentId: string): AssetsOrganized[] => {
    return assets
      .filter((location) => (location.parentId === parentId || location.locationId === parentId))
      .map((location) => ({
        ...location,
        children: getChildren(location.id)
      }))
  }

  const values = {
    companySelected,
    setCompanySelected,
    assets,
    setAssets,
    organizedAssets,
    filterName,
    setFilterName,
    filterComponentType,
    setFilterComponentType,
    filterStatus,
    setFilterStatus,
  }
  return (
    <FiltersContext.Provider value={values}>
      {children}
    </FiltersContext.Provider>
  );
};
