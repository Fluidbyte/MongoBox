import React, { createContext, useState } from 'react'
import obsrv from 'obsrv'

import { defaultCollection, defaultQuery } from '../lib/editorDefaults'
import { storedHistory } from '../lib/history'

export const StoreContext = createContext(null)

export default ({ children }) => {
  const store = obsrv({
    data: {
      collections:
        storedHistory.length > 0 &&
        storedHistory[0] &&
        storedHistory[0].collections
          ? JSON.stringify(storedHistory[0].collections, null, 4)
          : defaultCollection,
      collectionsValid: true,
      query:
        storedHistory.length > 0 && storedHistory[0] && storedHistory[0].query
          ? JSON.stringify(storedHistory[0].query, null, 4)
          : defaultQuery,
      queryValid: true,
      running: false,
      results: '',
      history: storedHistory,
    },
  })
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
