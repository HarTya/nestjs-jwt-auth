export const normalizeWhitespace = (value: any) => {
  if (typeof value === 'string') return value.replace(/\s+/g, ' ').trim()
}
