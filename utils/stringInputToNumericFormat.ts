export const stringInputToNumericFormat = (value: string) => {
  return value.match(/^-?\d*\.?\d*$/) ? value : value.slice(0, -1)
}
