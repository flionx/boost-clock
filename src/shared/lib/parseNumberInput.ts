export function parseNumberInput(value: string, min = 1) {
  const cleaned = value.replace(/^0+/, "")
  const minutes = Number(cleaned) || 0
  return Math.max(min, minutes)
}