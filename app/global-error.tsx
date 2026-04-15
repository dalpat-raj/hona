'use client' 
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="w-full h-[100vh] flex flex-col items-center justify-center">
        <h2 className="text-center">Something went wrong! 😪</h2>
        <button className="mt-4 rounded-md bg-[#333] px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800" onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}