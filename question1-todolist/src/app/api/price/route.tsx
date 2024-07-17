const key = process.env.API_KEY
const base_url = process.env.API_URL

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol')

    const url = `${base_url}/price?symbol=${symbol}&apikey=${key}`
    
    const res = await fetch(url, {
        next: { revalidate: 0},
        headers: {
            'Content-Type': 'application/json'
        }, 
    })
       
    const data = await res.json()

    return Response.json(data)

  }