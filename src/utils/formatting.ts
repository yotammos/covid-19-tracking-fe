export const formatAmount = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const capitalize = (s: string) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}