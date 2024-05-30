import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom";
import {AppRoutes} from "./AppRoutes.tsx";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            refetchOnWindowFocus:false
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <Router>
              <AppRoutes />
          </Router>
      </QueryClientProvider>
  </React.StrictMode>,
)
