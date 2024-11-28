"use client"
import React, { Fragment, useEffect } from 'react'
import { useFiltersContext } from '../../context/FiltersContext'
import ContentHeader from './ContentHeader'
import AssetTree from './AssetTree'
import AssetInfo from './AssetInfo'
import { Locations } from '../../enum/Types'

const ContentPage = () => {
  const { companySelected, setAssets } = useFiltersContext()

  useEffect(() => {
    setAssets([])
    if (!companySelected) return
    const fetchLocations = async () => {
      try {
        const request = await fetch(`/api/locations?companyId=${companySelected.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        const data = await request.json() as Locations[]
        setAssets(data.map((location) => ({ ...location, typeAssets: 'location' })))
      } catch (error) {
        console.error(error)
        setAssets([])
      }
    }
    void fetchLocations()
  }, [companySelected, setAssets])

  return (
    <div className='flex flex-col w-full p-4 gap-2 rounded border bg-secondary'>
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