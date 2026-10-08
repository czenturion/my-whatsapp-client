export const resolveApiUrl = (idInstance: string): string => {
  const prefix = idInstance.slice(0, 4)
  return `https://${prefix}.api.green-api.com`
}