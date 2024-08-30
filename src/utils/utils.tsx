import { HEADER_LABELS } from '@/app/constants'
import { type FormattedData, type ResponseData } from '@/app/types'
import { type GridColDef } from '@mui/x-data-grid'

export const formatData = (data: ResponseData[]) => {
  const formattedData: FormattedData[] = data.map((element) => {
    const link = (
      <a
        href={`https://${element.url}`}
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {element.url}
      </a>
    )
    const bounceCountPercentage = getBounceCountPercentage(element.bounceCount, element.totalCount)
    return {
      url: element.url,
      avgScrollPercentage: `${element.avgScrollPercentage}%`,
      totalPageviewCount: convertNumberToTime(element.totalPageviewCount),
      bounceCount: bounceCountPercentage,
      startsWithCount: element.startsWithCount,
      endsWithCount: element.endsWithCount,
      totalCount: element.totalCount,
      totalVisitorCount: element.totalVisitorCount,
    }
  })

  return formattedData
}

const getBounceCountPercentage = (bounceCount: number, totalCount: number) => {
  if (totalCount === 0) {
    return 'N/A'
  }
  const bouncePercentage = (bounceCount * 100) / totalCount
  return `${bouncePercentage.toFixed(2)}%`
}

const convertNumberToTime = (value: number) => {
  return (
    Math.floor(value / 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    ':' +
    (value % 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  )
}

export const getHeaders = (data: FormattedData[]): GridColDef[] => {
  return Object.keys(data[0] ?? []).map((key, index) => ({
    field: key,
    headerName: HEADER_LABELS[key as keyof FormattedData],
    flex: 1,
    minWidth: index === 0 ? 240 : 120,
    sortable: true,
  }))
}
