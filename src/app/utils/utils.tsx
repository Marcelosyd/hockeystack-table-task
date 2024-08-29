import { type FormattedData, type ResponseData } from '../types'

export const getHeaderLabel = (key) => {
  const headers: FormattedData['headers'] = [
    { key: 'urlLink', label: 'URL', sortKey: 'url' },
    { key: 'avgScrollPercentage', label: 'Scroll' },
    { key: 'totalPageviewCount', label: 'Time' },
    { key: 'bounceCount', label: 'Bounce' },
    { key: 'startsWithCount', label: 'Enters' },
    { key: 'endsWithCount', label: 'Exits' },
    { key: 'totalCount', label: 'Pageviews' },
    { key: 'totalVisitorCount', label: 'Visitors' },
  ]
}

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
      urlData: { url: element.url, link },
      totalCount: element.totalCount,
      totalVisitorCount: element.totalVisitorCount,
      bounceCount: bounceCountPercentage,
      startsWithCount: element.startsWithCount,
      endsWithCount: element.endsWithCount,
      avgScrollPercentage: `${element.avgScrollPercentage}%`,
      totalPageviewCount: convertNumberToTime(element.totalPageviewCount),
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
