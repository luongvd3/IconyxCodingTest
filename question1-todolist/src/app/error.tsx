'use client'
 
import { useRouter } from 'next/navigation'
import { startTransition, useEffect } from 'react'
import cn from 'classnames'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  const router = useRouter();
 
  return (
  <section className={cn('xl:grid xl:grid-cols-sidebar-content-miniCharts 2xl:grid-cols-sidebar-content-charts text-gray-400 ')}>
    <div className="hidden bg-white lg:block "></div>
    <div className="flex h-screen items-center justify-center">
        
      <div className='w-full bg-white px-3'>
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
          <h2 className="mb-4 text-3xl font-bold">Something went wrong!</h2>
          <p className="mb-8 text-lg text-gray-600">We apologize for the inconvenience. Please try again later.</p>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => {
              router.refresh(); 
              startTransition(reset);
            }}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
    <div className='hidden bg-white xl:block'></div>
  </section>
  )
}