import { Link, useNavigate } from 'react-router-dom'
import { useSignInUser } from '../lib/react-query/query&mutations'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

const SignIn = () => {
    const [data, setData] = useState<{email: string, password: string}>({
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    const {
        mutateAsync: signInUser,
        isPending,
        isError,
        error
    } = useSignInUser()

    useEffect(() => {
        if(isError){
            toast({
                title: "Error",
                description: error.message
            })
        }
    },[isError])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const isUser = await signInUser(data)

        if(!isUser) return alert("An error occurred please try again later")

        if(isUser && !isError) return navigate("/feed")
    }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-20 w-auto mix-blend-darken bg-slate-200" src="/images/lead-logo.svg" alt="Your Company" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                    <input 
                        id="email" 
                        name="email" 
                        type="email" 
                        autoComplete="email" 
                        required 
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                        onChange={(e) => setData({...data, email: e.target.value})}
                    />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            autoComplete="current-password" 
                            required 
                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            onChange={(e) => setData({...data, password: e.target.value})}
                        />
                    </div>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isPending ? <Loader2 className='animate-spin' /> : "Sign in"}</button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?
            <Link to='signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</Link>
            </p>
        </div>
    </div>
  )
}

export default SignIn