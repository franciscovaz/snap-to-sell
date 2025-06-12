export async function generateListingInfo(imageFile: File) {
    const token = process.env.NEXT_PUBLIC_HUGGINGFACE_API_TOKEN
    if (!token) throw new Error('Missing Hugging Face API token')
  
    // Image preparation
    const reader = new FileReader()
    const base64: string = await new Promise((res, rej) => {
      reader.onload = () => res(reader.result as string)
      reader.onerror = () => rej(reader.error)
      reader.readAsDataURL(imageFile)
    })
  
    const res = await fetch('https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: base64 })
    })
  
    if (!res.ok) throw new Error('Hugging Face API error')
  
    const output = await res.json()
    const description = Array.isArray(output) ? output[0].generated_text : output.generated_text
  
    return {
      title: description.split(/[.?!]/)[0] || 'Item',
      description,
      category: 'Automatic'
    }
  }
  