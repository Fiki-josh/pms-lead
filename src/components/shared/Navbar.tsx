import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
const Navbar = () => {
    const [isMenuActive, setIsMenuActive] = useState(false)

  return (
    <header className=' bg-slate-200 w-full fixed z-10'>

        <nav className='px-3 mb-2 max-w-6xl mx-auto'>
            <div className='flex justify-between w-full h-[80px] py-4 items-center'>
                <img className=" h-10 md:h-14 w-auto mix-blend-darken bg-slate-200" src="/images/lead-logo.svg" alt="Your Company" />

                <section className='md:flex gap-6 hidden'>
                    <Link to="/feed" className=' hover:text-blue-500'>
                        Home
                    </Link>
                    <Link to="/feed" className=' hover:text-blue-500'>
                        Profile
                    </Link>
                    <Link to="/create" className=' hover:text-blue-500'>
                        Create-Project
                    </Link>
                </section>
                {
                    !isMenuActive
                    ?
                    <Menu className='md:hidden' onClick={() => setIsMenuActive(!isMenuActive)}/>
                    :
                    <X className='md:hidden' onClick={() => setIsMenuActive(!isMenuActive)}/>
                }
            </div>
            <section 
                className={`bg-slate-300 py-2 rounded flex flex-col gap-2 px-2 transition-all duration-500 ease-in-out overflow-hidden ${
                    isMenuActive ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <Link to="/feed" className=' hover:text-blue-500'>
                    Home
                </Link>
                <Link to="/feed" className=' hover:text-blue-500'>
                    Profile
                </Link>
                <Link to="/create" className=' hover:text-blue-500'>
                    Create-Project
                </Link>
            </section>
        </nav>
    </header>
  )
}

export default Navbar