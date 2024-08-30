import HtmlTable from '@/components/Tables/HtmlTable'
import LibraryTable from '@/components/Tables/LibraryTable'
import { formatData, getGridHeaders, getHeaders } from '@/utils/utils'
import { type FormattedData, type ResponseData } from './types'

export default async function Home() {
  const response = await fetch('http://localhost:3000/api')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: ResponseData[] = await response.json()

  if (!data) return null

  const formattedData: FormattedData[] = formatData(data)

  const headers = getHeaders(formattedData)
  const gridHeaders = getGridHeaders(formattedData)

  return (
    <main className="flex min-h-screen flex-col items-center mb-24 px-8 pt-8 md:px-12 lg:px-24">
      <div className="z-10 w-full max-w-7xl items-center justify-between font-normal text-sm flex flex-col gap-12">
        <div className="w-screen flex justify-center pb-2 font-semibold text-xl border-b-2 border-[#34373e]">
          Table components examples
        </div>
        <HtmlTable data={formattedData} headers={headers} />
        <LibraryTable data={formattedData} headers={gridHeaders} />
      </div>
    </main>
  )
}
