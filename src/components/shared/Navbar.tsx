import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSignOut } from '@/lib/react-query/query&mutations'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { toast } from '../ui/use-toast'
  
const Navbar = () => {
    const [isMenuActive, setIsMenuActive] = useState(false)

    const navigate = useNavigate()

    const {
        mutateAsync: signOut,
        isPending,
        isError,
        error,
        isSuccess
    } = useSignOut()

    useEffect(() => {
        if(isError){
            toast({
                title: "Error",
                description: error.message
            })
        }
        if(isSuccess){
            toast({
                title: "Success",
                description: "You have successfully signed out"
            })
            console.log("Testing")
            navigate("/")
        }
    },[isError, isSuccess])

    const logout = (
        <AlertDialog>
            <AlertDialogTrigger><LogOut size={19} className=' cursor-pointer' /></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will sign you out.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={async() => {
                            await signOut()
                        }}
                    >
                        {isPending ? <Loader2 className='animate-spin'/> : "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )


  return (
    <header className=' bg-slate-200 h-[80px] w-full fixed z-10'>

        <nav className='px-3 mb-2 max-w-6xl mx-auto'>
            <div className='flex justify-between w-full h-[80px] py-4 items-center'>
                <img className=" h-10 md:h-14 w-auto mix-blend-darken bg-slate-200" src="/images/lead-logo.svg" alt="Your Company" />

                <section className='md:flex gap-6 hidden md:items-center'>
                    <Link to="/feed" className=' hover:text-blue-500'>
                        Home
                    </Link>
                    <Link to="/feed" className=' hover:text-blue-500'>
                        Profile
                    </Link>
                    <Link to="/create" className=' hover:text-blue-500'>
                        Create-Project
                    </Link>
                    {logout}
                </section>
                <div className='md:hidden flex gap-2 items-center'>
                    {logout}
                    {
                        !isMenuActive
                        ?
                        <Menu className='md:hidden' onClick={() => setIsMenuActive(!isMenuActive)}/>
                        :
                        <X className='md:hidden' onClick={() => setIsMenuActive(!isMenuActive)}/>
                    }
                </div>
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