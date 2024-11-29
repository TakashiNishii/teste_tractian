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
  selectedAsset?: Assets;
  setSelectedAsset: (asset: Assets) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
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
  selectedAsset: undefined,
  setSelectedAsset: () => { },
  loading: false,
  setLoading: () => { },
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
  const [selectedAsset, setSelectedAsset] = React.useState<Assets | undefined>(undefined)
  const [filterName, setFilterName] = React.useState<string>('')
  const [filterComponentType, setFilterComponentType] = React.useState<string>('')
  const [filterStatus, setFilterStatus] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    if (assets.length > 0) {
      console.log('organizeAssets')
      organizeAssets()
      setLoading(false)
    }
  }, [assets, filterName, filterComponentType, filterStatus])

  const organizeAssets = () => {
    // Criação de um mapa para armazenar filhos e reduzir buscas repetidas
    const assetMap = new Map<string, AssetsOrganized>();

    // Primeira passagem: cria um mapa de todos os ativos e inicializa os filhos vazios
    assets.forEach((asset) => {
      assetMap.set(asset.id, { ...asset, children: [] });
    });

    // Segunda passagem: organiza os filhos no mapa
    assets.forEach((asset) => {
      if (asset.parentId || asset.locationId) {
        const parent = assetMap.get(asset.parentId || asset.locationId || "");
        if (parent) {
          parent.children.push(assetMap.get(asset.id)!);
        }
      }
    });

    // Filtra os ativos principais (sem parentId e locationId)
    const rootAssets = Array.from(assetMap.values()).filter(
      (asset) => !asset.parentId && !asset.locationId
    );

    // Filtra os ativos de acordo com os critérios
    const filteredAssets = filterAssets(rootAssets);

    setOrganizedAssets(filteredAssets);
  };

  const filterAssets = (assets: AssetsOrganized[]): AssetsOrganized[] => {
    return assets
      .map((asset) => {
        const filteredChildren = filterAssets(asset.children);

        const matchesFilter =
          (!filterName || asset.name.toLowerCase().includes(filterName.toLowerCase())) &&
          (!filterComponentType || asset.sensorType === filterComponentType) &&
          (!filterStatus || asset.status === filterStatus);

        // Retorna o ativo se ele ou seus filhos atenderem aos critérios
        return matchesFilter || filteredChildren.length > 0
          ? { ...asset, children: filteredChildren }
          : null;
      })
      .filter(Boolean) as AssetsOrganized[];
  };


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
    loading,
    setLoading,
    selectedAsset,
    setSelectedAsset
  }
  return (
    <FiltersContext.Provider value={values}>
      {children}
    </FiltersContext.Provider>
  );
};
