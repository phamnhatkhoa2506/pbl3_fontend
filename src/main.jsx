import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { NotificationProvider } from './contexts/NotificationContext.jsx'
import { OrderProvider } from './contexts/OrderContext.jsx'

import './index.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </NotificationProvider>
  </StrictMode>,
)
