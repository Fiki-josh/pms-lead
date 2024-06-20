import Navbar from '@/components/shared/Navbar'
import { useGlobalContext } from '@/context/GlobalContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth = () => {
    const {user} = useGlobalContext()
    const location = useLocation()

    const check = (
        user
        ?
        <>
          <Navbar />
          <div className=' pb-24' />
          <Outlet />
        </>
        :
        <Navigate to={"/"} state={{from: location}} replace /> 
    )

  return check
}

export default RequireAuth