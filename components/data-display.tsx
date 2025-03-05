"use client"

import { useEffect, useState } from "react"
import { fetchData } from "@/lib/api"
import LoadingState from "./loading-state"
import ErrorState from "./error-state"

export default function DataDisplay() {
  const [data, setData] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const result = await fetchData()
        setData(result)
        setError(null)
      } catch (err) {
        setError("Failed to fetch data from API. Backend might not be ready yet.")
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    getData()
  }, [])

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState message={error} />
  if (!data || data.length === 0) return <EmptyState />

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div key={item.id || index} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg">{item.title || "Item " + (index + 1)}</h3>
            <p className="text-gray-600 mt-2">{item.description || "No description available"}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center p-8 border border-dashed rounded-lg">
      <h3 className="text-xl font-medium">No data available</h3>
      <p className="text-gray-500 mt-2">Data will appear here once the API returns results</p>
    </div>
  )
}

