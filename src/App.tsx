import { Routes, Route } from "react-router-dom"
import SignIn from "./auth/SignIn"
import SignUp from "./auth/SignUp"
import CreateProject from "./pages/CreateProject"
import Feed from "./pages/Feed"
import RequireAuth from "./hooks/RequireAuth"
import AuthLayout from "./auth/AuthLayout"

function App() {

  return (
    <>
      <Routes>
        
        <Route element = {<AuthLayout />}>
          <Route index element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        
        <Route element={<RequireAuth/>}>
          <Route path="/create" element={<CreateProject />} />
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
