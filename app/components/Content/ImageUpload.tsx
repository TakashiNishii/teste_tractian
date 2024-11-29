import { InboxIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useFiltersContext } from '../../context/FiltersContext'


interface ImageUploadProps {
  onChange?: (file: File | null) => void
  value?: string | null
}

export default function ImageUpload({ onChange, value }: ImageUploadProps) {
  const { selectedAsset } = useFiltersContext()

  const [preview, setPreview] = useState<string | null>(value || null)

  useEffect(() => {
    setPreview(value || null)
  }, [value, selectedAsset])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onChange?.(file)
    } else {
      setPreview(null)
      onChange?.(null)
    }
  }
  return (
    <div className="relative min-w-[30%]">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full  min-h-[250px] opacity-0 cursor-pointer z-10"
        aria-label="Adicionar imagem do Ativo"
      />
      <div className="border-2 border-dashed  min-h-[250px] border-blue-400 rounded-lg p-8 flex flex-col items-center justify-center gap-2 bg-blue-50/50 hover:bg-blue-50 transition-colors">
        {preview ? (
          <div className="relative w-full h-[160px]">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <>
            <InboxIcon className="w-10 h-10 text-blue-400" />
            <span className="text-blue-400 text-sm">
              Adicionar imagem do Ativo
            </span>
          </>
        )}
      </div>
    </div>
  )
}