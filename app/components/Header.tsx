"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Company } from '../enum/Types'
import classNames from 'classnames'
import { useFiltersContext } from '../context/FiltersContext'

const Header = () => {
  const { companySelected, setCompanySelected, setSelectedAsset } = useFiltersContext()
  const [companies, setCompanies] = React.useState<Company[]>([])
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const request = await fetch("/api/companies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        const data = await request.json() as Company[]
        setCompanies(data)
      } catch (error) {
        console.error(error)
        setCompanies([])
      }
    }
    void fetchCompanies()
  }, [])

  return (
    <header className="flex flex-col md:flex-row md:h-12 gap-2 justify-between bg-primary w-full px-4 py-3 text-white text-center items-center">
      <Image src="/images/logo.png" alt="Logo Tractian" width={102} height={14} className='max-h-4' />
      <div className='flex flex-row flex-wrap gap-3'>
        {companies
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((company) => (
            <button
              key={company.id}
              onClick={() => {
                setSelectedAsset(undefined)
                setCompanySelected(company)
              }}
              className={classNames('btn items-center py-1 px-2 rounded-sm hover:opacity-75',
                companySelected?.id === company.id ? 'bg-accent' : 'bg-neutral'
              )}
            >
              <Image src="/icons/gold.png" alt="Icon for company" width={14} height={14} className='w-4 h-3' />
              {company.name}
            </button>
          ))}
      </div>

    </header>
  )
}

export default Header