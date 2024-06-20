import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { departmentOptions } from '../constants'
import { INewUser } from '../types'
import { useCreateUserAccount } from '../lib/react-query/query&mutations'

const SignUp = () => {
    const [userData, setUserData] = React.useState<INewUser>({
        name: "",
        email: "",
        password: "",
        department: "",
    })

    const [confirmPassword, setConfirmPassword] = React.useState("")

    const {
        mutateAsync: createUserAccount,
        isPending,
        isError,
        error
    } = useCreateUserAccount()

    const passwordRegx: RegExp = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/

    const onSubmit = async(e: React.FormEvent) => {
        e.preventDefault()

        if(!passwordRegx.test(userData.password ? userData.password : "")){
            alert("Password must contain at least 6 characters, with at least 1 uppercase and lowercase letter")

            return;
        }

        if(userData.password !== confirmPassword){
            alert("Passwords does not match")

            return;
        }

        if(userData.department === "Select" || !userData.department) return alert("Select your department")

        const newUser = await createUserAccount(userData)

        if(newUser) alert("Account created successfully")

    }

    useEffect(() => {
        if(isError){
            alert(error.message)
        }
    }, [isError])

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-20 w-auto mix-blend-darken bg-slate-200" src="/images/lead-logo.svg" alt="Your Company" />
                <h2 className="mt-4 text-center text-2xl md:text-3xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
            </div>
    
            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                        <div className="mt-2">
                        <input 
                            id="name" 
                            name="name" 
                            type="text" 
                            required 
                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            onChange={(e) => setUserData({...userData, name: e.target.value})}
                        />
                        </div>
                    </div>

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
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                        />
                        </div>
                    </div>
    
                    <div className="mt-2">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            autoComplete="current-password" 
                            required 
                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setUserData({...userData,password: e.target.value})}
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                        <input 
                            id="confirm-password" 
                            name="password" 
                            type="password" 
                            autoComplete="current-password" 
                            required 
                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">Select Department</label>
                        <select 
                            name="" 
                            id="department" 
                            required 
                            className='block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-10'
                            onChange={(e) => setUserData({...userData, department: e.target.value})}
                        >
                            {departmentOptions.map((department) => (
                                <option key={department.department} value={department.department}>{department.department}</option>
                            ))}
                        </select>
                    </div>
    
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-10">
                            {isPending ? "Loading..." : "Sign up"}
                        </button>
                    </div>
                </form>
    
                <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?
                <Link to={'/'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp