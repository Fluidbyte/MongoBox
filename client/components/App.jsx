import React from 'react'

import StoreProvider from '../lib/store'

import Header from './Header'
import Workspace from './Workspace'
import Footer from './Footer'

const App = () => {
  return (
    <div className='app'>
      <StoreProvider>
        <Header />
        <Workspace />
        <Footer />
      </StoreProvider>
    </div>
  )
}

export default App
