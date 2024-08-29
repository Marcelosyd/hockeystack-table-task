'use client'
import { useCallback, useMemo, useState, type ChangeEvent } from 'react'
import { useSortData } from './hooks/useSortData'

const ITEMS_PER_PAGE = 10

interface TableProps<T> {
  data: T[]
}

const HtmlTable = <T extends object>({ data }: TableProps<T>) => {
  const [sort, setSort] = useState<{
    key: keyof T
    order: 'asc' | 'desc'
  } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [inputPage, setInputPage] = useState('1')

  const sortedData = useSortData(data, sort)

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = useMemo(() => Math.ceil(data.length / ITEMS_PER_PAGE), [data])

  const handleSort = useCallback((key: keyof T) => {
    setSort((prevSortConfig) => {
      if (!prevSortConfig || prevSortConfig.key !== key)
        return {
          key: key,
          order: 'asc',
        }
      switch (prevSortConfig.order) {
        case 'asc':
          return {
            key: key,
            order: 'desc',
          }
        case 'desc':
          return null
        default:
          return {
            key: key,
            order: 'asc',
          }
      }
    })
  }, [])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    setInputPage(String(pageNumber))
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value)
  }

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const pageNumber = parseInt(inputPage)
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  return (
    <div className="text-gray-200 w-full">
      <div className="bg-[#282b32] rounded-xl">
        <div className="flex items-center justify-between p-4 border-b border-[#34373e]">
          <h1 className="text-xl font-bold">Pages</h1>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto ">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-white">
                  {Object.keys(data[0] ?? {}).map((key) => (
                    <th
                      key={key}
                      className="py-3 px-4 max-w-xs text-left font-semibold bg-[#22222a] text-gray-300 uppercase cursor-pointer"
                      onClick={() => handleSort(key as keyof T)}
                    >
                      {String(key)}
                      {sort?.key === key &&
                        sort.order &&
                        (sort.order === 'asc' ? (
                          <span className="text-sm"> &#708;</span>
                        ) : (
                          <span className="text-sm"> &#709;</span>
                        ))}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-[#34373e] hover:bg-[#34373e]">
                    {Object.entries(item).map(([key, value]) => (
                      <td key={key} className="py-4 px-4 max-w-xs break-words ">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 mb-1 mx-1 flex justify-between items-center text-gray-300">
            <div className="px-3">
              {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, data.length)} of {data.length}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-800"
              >
                {`<`}
              </button>
              <form
                onSubmit={handleInputSubmit}
                onBlur={handleInputSubmit}
                className="flex items-center"
              >
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={inputPage}
                  onChange={handleInputChange}
                  className="w-8 px-1 py-1 rounded-md text-center bg-[#1a1a1a] outline-none [&::-webkit-inner-spin-button]:appearance-none caret-transparent"
                />
                <span className="mx-1">of {totalPages}</span>
              </form>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-800"
              >
                {`>`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HtmlTable
