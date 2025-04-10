import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner';
import store from './redux/store/store.js';


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
      <Toaster richColors position="top-center"/>
  </Provider>
)
