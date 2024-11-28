import { BoltIcon, InformationCircleIcon } from "@heroicons/react/16/solid"
import { Company } from "../../enum/Types"

interface ContentHeaderProps {
  companySelected: Company
}

const ContentHeader = (
  { companySelected }: ContentHeaderProps
) => {
  return (
    <div className='flex flex-row justify-between'>
      <h1 className='flex items-center gap-2 font-semibold text-xl'>
        Ativos
        <span className='text-gray-600 font-normal text-sm'>
          / {companySelected.name}
        </span>
      </h1>
      <div className='flex flex-row gap-2'>
        <button className='btn border py-2 px-4 rounded group hover:bg-neutral hover:!text-white'>
          <BoltIcon className='w-4 h-4 text-accent group-hover:text-white' />
          Sensor de Energia
        </button>
        <button className='btn border py-2 px-4 rounded group hover:bg-neutral hover:!text-white'>
          <InformationCircleIcon className='w-5 h-5 text-accent group-hover:text-white' />
          Crítico
        </button>
      </div>
    </div>
  )
}

export default ContentHeader