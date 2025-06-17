import React, { createContext, useContext, useState } from 'react'

const DisplayContext = createContext()

export function useDisplay() {
  const context = useContext(DisplayContext)
  if (!context) {
    throw new Error('useDisplay must be used within a DisplayProvider')
  }
  return context
}

export function DisplayProvider({ children }) {
  const [currentDisplay, setCurrentDisplay] = useState(null)
  const [displays, setDisplays] = useState([])

  const value = {
    currentDisplay,
    setCurrentDisplay,
    displays,
    setDisplays
  }

  return (
    <DisplayContext.Provider value={value}>
      {children}
    </DisplayContext.Provider>
  )
}