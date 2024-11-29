
import { Fragment } from 'react'
import { useFiltersContext } from '../../context/FiltersContext'
import ImageUpload from './ImageUpload'
import { BoltIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import classNames from 'classnames'

const AssetInfo = () => {
  const { selectedAsset } = useFiltersContext()
  return (
    <div className='flex flex-col flex-1 border rounded-sm'>
      {selectedAsset ? (
        <Fragment>
          <h2 className='flex items-center gap-2 text-lg font-semibold p-4 border-b'>
            {selectedAsset.name}
            {selectedAsset.sensorType && selectedAsset.sensorType === "energy" && (
              <BoltIcon className={classNames("w-5 h-5",
                selectedAsset.status === "operating" ? "text-[#52C41A]" : "text-[#ED3833]"
              )} />
            )}

            {selectedAsset.sensorType && selectedAsset.sensorType === "vibration" && (
              <>
                {selectedAsset.status === "operating" ? (
                  <Image src="/icons/operating.png" alt="Vibration" width={8} height={8} className="w-2 h-2" />
                ) : (
                  <Image src="/icons/alert.png" alt="Alert" width={8} height={8} className="w-2 h-2" />
                )}
              </>
            )}
          </h2>
          <div className='flex flex-col gap-6 p-6'>
            <div className='flex flex-col md:flex-row gap-6'>
              <ImageUpload />
              <div className='flex-1 flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                  <h3 className='text-base font-semibold mt-4'>Tipo de Equipamento</h3>
                  <span className='text-base font-normal text-gray-500'>
                    Motor Elétrico (Trifásico)
                  </span>
                </div>

                <div className='border w-full' />

                <div className='flex flex-col gap-2'>
                  <h3 className='text-base font-semibold mt-4'>Responsáveis</h3>
                  <span className='flex items-center text-base font-normal text-gray-500'>
                    <Image src="/icons/electric.png" alt="User" width={20} height={20} className="w-5 h-5" />
                    <span className='ml-2'>Elétrica</span>
                  </span>
                </div>

              </div>
            </div>


            <div className='border w-full' />

            <div className='flex flex-row'>
              <div className='flex flex-col gap-2 w-1/2'>
                <h3 className='text-base font-semibold mt-4'>Sensor</h3>
                <span className='flex items-center gap-2 text-base font-normal text-gray-500'>
                  <Image src="/icons/sensor.png" alt="Sensor" width={20} height={20} className="w-5 h-4" />
                  {selectedAsset.sensorId}
                </span>
              </div>

              <div className='flex flex-col gap-2 w-1/2'>
                <h3 className='text-base font-semibold mt-4'>Receptor</h3>
                <span className='flex items-center gap-2 text-base font-normal text-gray-500'>
                  <Image src="/icons/receptor.png" alt="Sensor" width={20} height={20} className="w-5 h-5" />
                  {selectedAsset.gatewayId}
                </span>
              </div>
            </div>

          </div>
        </Fragment>
      ) : (
        <h2 className='flex gap-2 text-lg font-semibold p-4'>Selecione um ativo</h2>
      )}
    </div>
  )
}

export default AssetInfo