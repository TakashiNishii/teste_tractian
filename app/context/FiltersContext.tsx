"use client"
import React, { createContext, useContext, useEffect } from "react";
import { Company, Locations, LocationsOrganized } from '../enum/Types'

export interface FiltersContextProps {
  companySelected?: Company;
  setCompanySelected: (company: Company) => void;
  locations: Locations[];
  setLocations: (locations: Locations[]) => void;
  organizedLocations: LocationsOrganized[];
}


export const FiltersContext = createContext<FiltersContextProps>({
  companySelected: undefined,
  setCompanySelected: () => { },
  locations: [],
  setLocations: () => { },
  organizedLocations: [],
});

export const useFiltersContext = () => useContext(FiltersContext);

export interface FiltersContextProviderProps {
  children: React.ReactNode;
}

export const FiltersProvider: React.FC<FiltersContextProviderProps> = ({ children }: FiltersContextProviderProps) => {
  const [companySelected, setCompanySelected] = React.useState<
    Company | undefined
  >(undefined);
  const [locations, setLocations] = React.useState<Locations[]>([])
  const [organizedLocations, setOrganizedLocations] = React.useState<LocationsOrganized[]>([])

  useEffect(() => {
    organizeLocations()
  }, [locations])

  const organizeLocations = () => {
    const organized: LocationsOrganized[] = []
    locations.forEach((location) => {
      if (!location.parentId) {
        organized.push({
          ...location,
          children: getChildren(location.id)
        })
      }
    })
    setOrganizedLocations(organized)
  }

  const getChildren = (parentId: string): LocationsOrganized[] => {
    return locations
      .filter((location) => location.parentId === parentId)
      .map((location) => ({
        ...location,
        children: getChildren(location.id)
      }))
  }

  const values = {
    companySelected,
    setCompanySelected,
    locations,
    setLocations,
    organizedLocations
  }
  return (
    <FiltersContext.Provider value={values}>
      {children}
    </FiltersContext.Provider>
  );
};
