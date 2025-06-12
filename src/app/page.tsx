'use client'

import ImageUploader from '@/components/ImageUploader'
import { generateListingInfo } from '@/lib/ai'
import { estimatePrice } from '@/lib/scraper'
import { useState } from 'react'

export default function Home() {
  const [result, setResult] = useState<null | {
    title: string
    description: string
    category: string
    price: number
  }>(null)

  const handleImageUpload = async (file: File) => {
    const info = await generateListingInfo(file)
    const price = await estimatePrice(info.category, info.title)
    setResult({ ...info, price })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Snap2Sell</h1>
      <ImageUploader onImageUpload={handleImageUpload} />
      {result && (
        <div className="mt-8 bg-white p-6 rounded shadow max-w-md w-full">
          <h2 className="text-xl font-semibold">{result.title}</h2>
          <p className="mt-2">{result.description}</p>
          <p className="text-sm text-gray-500 mt-1">Categoria: {result.category}</p>
          <p className="text-green-600 font-bold mt-4">Preço sugerido: {result.price}€</p>
        </div>
      )}
    </main>
  )
}
