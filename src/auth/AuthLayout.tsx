import { useGlobalContext } from '@/context/GlobalContext'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthLayout = () => {
  const {user} = useGlobalContext()

  const navigate = useNavigate()

  if(user) navigate("/feed")
  
  return (
    <div className='lg:flex min-h-screen justify-between'>
        <section className='lg:w-[50%] max-h-screen overflow-y-scroll hide-scrollbar'>
            <Outlet />
        </section>
        <section className='hidden relative lg:w-[50%] max-h-screen lg:flex justify-center items-center'>
            {/* Background Image */}
            <img className="absolute inset-0 h-full w-full object-cover" src="/images/background.jpeg" alt="Lead building" />

            {/* Overlay for Background Image */}
            <div className='absolute inset-0 bg-black bg-opacity-60'></div>

            {/* Additional Content Overlaid */}
            <div className='absolute z-10 text-white text-center'>
                {/* <img className="mx-auto h-48 w-auto mix-blend-darken bg-slate-200" src="/images/lead-logo.svg" alt="Your Company" /> */}
                {/* <img className="mx-auto h-48 w-auto mix-blend-darken" src="/images/lead-logo.svg" alt="Overlay Icon" /> */}
                <h1 className="text-4xl font-bold mb-4">Welcome to Lead City PMS</h1>
            </div>
        </section>
    </div>
  )
}

export default AuthLayout