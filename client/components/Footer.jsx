import React, { useContext } from 'react'
import moment from '../lib/momentConfig'
import downloadConfig from '../lib/downloadConfig'
import { StoreContext } from '../lib/store'

const Footer = () => {
  const store = useContext(StoreContext)
  return (
    <div className='footer'>
      <div className='history'>
        <select
          disabled={history.length === 0}
          value={history.length && 'default'}
          onChange={(e) => {
            try {
              const res = JSON.parse(e.target.value)
              store.collections = JSON.stringify(res.collections, null, 4)
              store.query = JSON.stringify(res.query, null, 4)
            } catch (e) {
              /* no-op */
            }
          }}
        >
          {!store.history || store.history.length === 0 ? (
            <option>No query history</option>
          ) : (
            <>
              <option value='default'>Load From Query History...</option>
              {store.history.map((h) => (
                <option value={JSON.stringify(h)} key={h && h.timestamp}>
                  {moment(h && h.timestamp).fromNow()}:{' '}
                  {Object.keys(h && h.collections).join(', ')} (
                  {h && h.query && h.query.collection}.
                  {h && h.query && h.query.command})
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      <button
        className='download-config'
        onClick={() => downloadConfig(store.query, store.collections)}
      >
        Download Current Config
      </button>
    </div>
  )
}

export default Footer
