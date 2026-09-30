import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import '@fontsource-variable/inter-tight'
import './index.css'
import App from './App.jsx'
import { AssessmentProvider } from './lib/AssessmentContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AssessmentProvider>
        <App />
      </AssessmentProvider>
    </HashRouter>
  </StrictMode>,
)
