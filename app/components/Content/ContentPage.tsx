"use client"
import React, { Fragment, useEffect } from 'react'
import { useFiltersContext } from '../../context/FiltersContext'
import ContentHeader from './ContentHeader'
import AssetTree from './AssetTree'
import AssetInfo from './AssetInfo'
import { Assets, Locations } from '../../enum/Types'

const ContentPage = () => {
  const { companySelected, setAssets, setLoading } = useFiltersContext()

  useEffect(() => {
    setAssets([]);
    setLoading(true);
    if (!companySelected) return;

    const fetchAssets = async () => {
      try {
        // Fazendo a primeira requisição
        const locationsRequest = await fetch(`/api/locations?companyId=${companySelected.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const locationsData = await locationsRequest.json() as Locations[];
        const locations = locationsData.map((location) => ({ ...location, typeAssets: 'location' }));

        // Fazendo a segunda requisição
        const assetsRequest = await fetch(`/api/assets?companyId=${companySelected.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const assetsData = await assetsRequest.json() as Assets[];
        const assets = assetsData.map((asset) => {
          if (asset.sensorType) {
            return { ...asset, typeAssets: 'component' }
          }
          return { ...asset, typeAssets: 'asset' }
        });

        // Combinando todos os dados antes de definir o estado
        setAssets([...locations, ...assets]);
      } catch (error) {
        console.error(error);
        setAssets([]);
      }
    }

    void fetchAssets();

  }, [companySelected, setAssets]);


  return (
    <div className='flex flex-col w-full p-4 gap-2 h-[calc(100dvh-8dvh)] max-h-[calc(100dvh-8dvh)] rounded border bg-secondary'>
      {companySelected ?
        <Fragment>
          <ContentHeader companySelected={companySelected} />
          <div className='flex flex-row gap-2'>
            <AssetTree />
            <AssetInfo />
          </div>
        </Fragment>
        :
        <h1 className='font-semibold text-xl'>
          Por favor, selecione uma empresa
        </h1>
      }
    </div>
  )
}

export default ContentPage