import React from 'react'
import Navigation from './Navigation'
import UserNavigation from './UserNavigation'

function Header() {
  return (
    <>
        <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Welcome to My React App</h1>
            <UserNavigation />             
        </header>
        <Navigation />
    </>
  )
}

export default Header