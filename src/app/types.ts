export type ResponseData = {
  url: string
  totalCount: number
  totalVisitorCount: number
  bounceCount: number
  startsWithCount: number
  endsWithCount: number
  avgScrollPercentage: number
  totalPageviewCount: number
}

export type FormattedData = {
  urlData: { url: string; link: JSX.Element }
  totalCount: number
  totalVisitorCount: number
  bounceCount: string
  startsWithCount: number
  endsWithCount: number
  avgScrollPercentage: string
  totalPageviewCount: string
}
