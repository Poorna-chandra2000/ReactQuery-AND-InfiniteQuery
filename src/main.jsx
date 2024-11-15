import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {QueryClientProvider,QueryClient,} from "@tanstack/react-query";
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";


const queryclient=new QueryClient();//create an instance of queryclient
//using broweser router i.e react router and tansatck query wrap it
createRoot(document.getElementById('root')).render(

  <StrictMode>
      <BrowserRouter>
<QueryClientProvider client={queryclient}>
    <App />
</QueryClientProvider>
      </BrowserRouter>
  </StrictMode>

)
