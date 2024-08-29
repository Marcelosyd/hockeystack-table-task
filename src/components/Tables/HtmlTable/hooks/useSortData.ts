const percentageFields = ['avgScrollPercentage', 'bounceCount']

export const useSortData = <T extends object>(
  data: T[],
  sort: { key: keyof T; order: 'asc' | 'desc' } | null
): T[] => {
  if (!sort) return data

  return [...data].sort((a, b) => {
    let valueA = a[sort.key] as number | string
    let valueB = b[sort.key] as number | string

    if (
      percentageFields.includes(sort.key as string) &&
      typeof valueA === 'string' &&
      typeof valueB === 'string'
    ) {
      valueA = parseFloat(valueA.replace('%', ''))
      valueB = parseFloat(valueB.replace('%', ''))
    }

    if (valueA === valueB) return 0

    if (sort.order === 'asc') {
      return valueA < valueB ? -1 : 1
    } else {
      return valueA > valueB ? -1 : 1
    }
  })
}
