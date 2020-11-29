/**
 * Loads and parses history from localStorage or returns empty array
 */
export const getStoredHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('queryHistory')) || []
  } catch (e) {
    return []
  }
}

/**
 * Stores history values after shortening to max 20 items
 * @param {Array} value History values to store
 */
export const setStoredHistory = (value) => {
  try {
    const toStore =
      value && value.length
        ? value.length > 20 // Only store 20 items
          ? value.splice(-1, 1)
          : value
        : []
    localStorage.setItem('queryHistory', JSON.stringify(toStore))
  } catch (e) {
    /* no-op */
  }
}

export const storedHistory = getStoredHistory()
