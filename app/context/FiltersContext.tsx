"use client"
import React, { createContext, useContext, useEffect } from "react";
import { Company, Assets, AssetsOrganized } from '../enum/Types'

export interface FiltersContextProps {
  companySelected?: Company;
  setCompanySelected: (company: Company) => void;
  assets: Assets[];
  setAssets: (assets: Assets[]) => void;
  organizedAssets: AssetsOrganized[];
}


export const FiltersContext = createContext<FiltersContextProps>({
  companySelected: undefined,
  setCompanySelected: () => { },
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

  useEffect(() => {
    organizeAssets()
  }, [assets])

  const organizeAssets = () => {
    const organized: AssetsOrganized[] = []
    assets.forEach((location) => {
      if (!location.parentId) {
        organized.push({
          ...location,
          children: getChildren(location.id)
        })
      }
    })
    setOrganizedAssets(organized)
  }

  const getChildren = (parentId: string): AssetsOrganized[] => {
    return assets
      .filter((location) => location.parentId === parentId)
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
    organizedAssets
  }
  return (
    <FiltersContext.Provider value={values}>
      {children}
    </FiltersContext.Provider>
  );
};
