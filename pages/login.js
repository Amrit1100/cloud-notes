import React from 'react'
import Link from "next/link"
import { useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login ({useremail, Setuseremail, login, Setlogin, name, Setname}) {
  let [email, Setemail] = useState()
  let [password, Setpassword] = useState()
  let [showNoAccount, SetshowNoAccount] = useState(false)
  let [showincpass, Setshowincpass] = useState(false)
  let [type, Settype] = useState("password")
  let router = useRouter()
  
 
  const makeSignIn = async()=>{
    let userData = {"email" : email, "password" : password}
    let response = await fetch("/api/login", {
      method : "POST", 
      headers : {"Content-type" : "application/json"},
      body : JSON.stringify(userData)
    })
    let data = await response.json()
    console.log(data)
    let msg = data.login
    if (msg == "success"){
      toast.success("Login Successful!", {autoClose : 1000})
      Setuseremail(data.email)
      Setlogin(true)
      Setname(data.name)
      setTimeout(()=>{
        router.push("/")
      },1000)
    }else if (msg == "noaccount"){
      toast.error("No Account found!", {autoClose : 1000})
      Setshowincpass(false)
      SetshowNoAccount(true)
    }else if (msg == "incorrectpassword"){
      toast.error("Incorrect password!", {autoClose : 1000})
      SetshowNoAccount(false)
      Setshowincpass(true)
    }else if (msg=="accountNotVerified"){
      toast.error("Your account is not verified. Please check your gmail and click on verification link.")
    }
  }
      

  return (
    <div>
      <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4">
        <div className="max-w-md w-full">
          <div className='text-center my-4'><Link href="/">Cloud Notes
          </Link></div>

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
            <form className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">User name</label>
                <div className="relative flex items-center">
                  <input onChange = {(e)=>{Setemail(e.target.value)}} name="username" type="email" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-pink-600" placeholder="Enter user name" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input onChange = {(e)=>{Setpassword(e.target.value)}} name="password" type={type} required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-pink-600" placeholder="Enter password" />
                  <svg onClick={()=>{type == "password"?Settype("text"): Settype("password")}} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>

              {showNoAccount && <div className="text-red-500">This email does not have account.</div>}
              
              {showincpass && <div className="text-red-500">Incorrect password</div>}

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-pink-600 focus:ring-pink-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link href="jajvascript:void(0);" className="text-pink-600 hover:underline font-semibold">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div className="!mt-8">
                <button onClick = {makeSignIn} type="button" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none">
                  Sign in
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">Don't have an account? <Link href="/signup" className="text-pink-600 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
    </div>
  )
}

