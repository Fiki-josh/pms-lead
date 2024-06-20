import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Link, Route, BrowserRouter as Router, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { QueryProvider } from './lib/react-query/QueryProvider.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import {GlobalProvider} from './context/GlobalContext.tsx'

function Test(){
  return <Link to={"/test"}>move</Link>
}
function Test2(){
  return <Link to={"/"}>move2</Link>
}

function TestApp(){
  return (
    <Routes>
      <Route index element={<Test />} />
      <Route path='/test' element={<Test2 />} />
    </Routes>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
        <Router>
          <GlobalProvider>
            <div className='bg-slate-200 min-h-[100vh]'>
              <App />
            </div>
            <Toaster />
          </GlobalProvider>
        </Router>
    </QueryProvider>
  </React.StrictMode>,
)
