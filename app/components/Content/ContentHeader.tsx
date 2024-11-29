import { BoltIcon, InformationCircleIcon } from "@heroicons/react/16/solid"
import { Company } from "../../enum/Types"
import { useFiltersContext } from "../../context/FiltersContext"
import classNames from "classnames"

interface ContentHeaderProps {
  companySelected: Company
}

const ContentHeader = (
  { companySelected }: ContentHeaderProps
) => {
  const { filterComponentType, setFilterComponentType, filterStatus, setFilterStatus } = useFiltersContext()
  return (
    <div className='flex flex-row justify-between'>
      <h1 className='flex items-center gap-2 font-semibold text-xl'>
        Ativos
        <span className='text-gray-600 font-normal text-sm'>
          / {companySelected.name}
        </span>
      </h1>
      <div className='flex flex-row gap-2'>
        <button
          className={
            classNames('btn border py-2 px-4 rounded group hover:bg-neutral hover:!text-white',
              filterComponentType === 'energy' && 'bg-accent text-white'
            )
          }
          onClick={() => {
            if (filterComponentType === 'energy') {
              setFilterComponentType('')
            } else {
              setFilterComponentType('energy')
            }
          }}
        >
          <BoltIcon className={classNames('w-4 h-4 text-accent group-hover:text-white',
            filterComponentType === 'energy' && 'text-white'
          )} />
          Sensor de Energia
        </button>
        <button
          className={
            classNames('btn border py-2 px-4 rounded group hover:bg-neutral hover:!text-white',
              filterStatus === 'alert' && 'bg-accent text-white'
            )
          }
          onClick={() => {
            if (filterStatus === 'alert') {
              setFilterStatus('')
            } else {
              setFilterStatus('alert')
            }
          }}
        >
          <InformationCircleIcon className={classNames('w-5 h-5 text-accent group-hover:text-white',
            filterStatus === 'alert' && ' text-white'
          )} />
          Crítico
        </button>
      </div>
    </div>
  )
}

export default ContentHeader