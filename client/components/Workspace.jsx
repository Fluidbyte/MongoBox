import React, { useContext } from 'react'
import Editor from './Editor'
import { StoreContext } from '../lib/store'

const Workspace = () => {
  const store = useContext(StoreContext)
  return (
    <div className='workspace'>
      <div className='workspace-column'>
        <Editor
          value={store.collections}
          setValue={(value) => {
            store.collections = value
          }}
          setValid={(isValid) => {
            store.collectionsValid = isValid
          }}
        />
      </div>
      <div className='workspace-column'>
        <Editor
          value={store.query}
          setValue={(value) => {
            store.query = value
          }}
          setValid={(isValid) => {
            store.queryValid = isValid
          }}
        />
      </div>
      <div className='workspace-column'>
        <Editor value={store.results} readOnly={true} />
      </div>
    </div>
  )
}

export default Workspace
