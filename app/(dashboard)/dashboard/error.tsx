'use client';
 
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Opps... Something went wrong 😪!</h2>
      <button
        className="mt-4 rounded-md bg-[#333] px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}