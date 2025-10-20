import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'tagaddod-design-react'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider
      defaultTheme="tagaddod"
      defaultLocale="en"
      defaultDirection="ltr"
      storageKey="tagaddod-theme-settings"
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
