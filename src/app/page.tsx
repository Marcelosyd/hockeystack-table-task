import HtmlTable from '@/components/Tables/HtmlTable'
import { type FormattedData, type ResponseData } from './types'
import { formatData } from './utils/utils'

export default async function Home() {
  const response = await fetch('http://localhost:3000/api')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: ResponseData[] = await response.json()

  const formattedData: FormattedData[] = formatData(data)

  return (
    <main className="flex min-h-screen flex-col items-center px-8 pt-8 md:px-12 lg:px-24">
      <div className="z-10 w-full max-w-7xl items-center justify-between font-normal text-sm lg:flex">
        <HtmlTable data={formattedData} />
      </div>
    </main>
  )
}
