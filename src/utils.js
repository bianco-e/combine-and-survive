export function capitalize(string) {
  return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase()
}

export function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false
  const sortedArr1 = arr1.slice().sort()
  const sortedArr2 = arr2.slice().sort()
  return !sortedArr1.some((n, idx) => n !== sortedArr2[idx])
}

export const LANG = (navigator.language || navigator.userLanguage).split('-')[0] || 'en'
export const IDLE = 'IDLE'
