'use client'

import { useState } from 'react'

type Props = {
  onImageUpload: (file: File) => void
}

export default function ImageUploader({ onImageUpload }: Props) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      onImageUpload(file)
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <input type="file" accept="image/*" onChange={handleChange} />
      {preview && <img src={preview} alt="Preview" className="w-64 rounded shadow" />}
    </div>
  )
}
