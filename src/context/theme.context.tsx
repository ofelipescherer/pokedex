import { useEffect, createContext, useState } from 'react'
import { ThemeProvider as ThemeProviderStyle } from 'styled-components'
import { Children } from 'types/Global'

import { appConfig } from 'util/config'
import { theme as themes } from 'theme'
import { Theme } from 'types/theme/Theme'

type ThemeContextType = {
  theme: string
  toggleTheme: (newTheme: string) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => undefined
})

export const ThemeProvider = ({ children }: Children) => {
  const [theme, setTheme] = useState<string>('light')

  const loadTheme = async () => {
    if (typeof window !== 'undefined') {
      const storagedTheme = window.localStorage.getItem(
        `${appConfig.appName}:theme`
      )
      if (storagedTheme) {
        setTheme(storagedTheme)
      } else {
        window.localStorage.setItem(`${appConfig.appName}:theme`, 'light')
      }
    }
  }

  useEffect(() => {
    loadTheme()
  }, [])

  const toggleTheme = (newTheme: string) => {
    if (typeof window !== 'undefined') {
      setTheme(newTheme)
      window.localStorage.setItem(`${appConfig.appName}:theme`, newTheme)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProviderStyle theme={themes[theme as keyof Theme]}>
        {children}
      </ThemeProviderStyle>
    </ThemeContext.Provider>
  )
}
