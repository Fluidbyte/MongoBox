import React, { useContext } from 'react'
import run from '../lib/run'
import { StoreContext } from '../lib/store'

const Header = () => {
  const store = useContext(StoreContext)
  return (
    <div className='header'>
      <div className='header-column'>
        <h2>
          <div
            className={`validity ${
              store.collectionsValid ? 'valid' : 'invalid'
            }`}
          >
            {store.collectionsValid ? '✓' : 'X'}
          </div>
          Data
        </h2>
      </div>
      <div className='header-column'>
        <h2>
          <div className={`validity ${store.queryValid ? 'valid' : 'invalid'}`}>
            {store.queryValid ? '✓' : 'X'}
          </div>
          Query{' '}
          <button
            disabled={
              !store.collectionsValid || !store.queryValid || store.running
            }
            className='run-query'
            onClick={async () => {
              store.running = true
              store.results = 'Running Query...'
              try {
                const config = {
                  collections: JSON.parse(store.collections),
                  query: JSON.parse(store.query),
                }
                const res = await run(config)
                const newHistory = [
                  Object.assign({}, config, { timestamp: Date.now() }),
                  ...store.history,
                ]
                store.history = newHistory
                // setStoredHistory(newHistory)
                store.results = JSON.stringify(res, null, 4)
                store.running = false
              } catch (e) {
                store.running = false
              }
              store.running = false
            }}
          >
            <div>&#9658;</div>
          </button>
        </h2>
      </div>
      <div className='header-column'>
        <h2>Results</h2>
      </div>
    </div>
  )
}

export default Header
