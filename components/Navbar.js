import React from 'react'
import Link from "next/link"

const Navbar = ({login, Setlogin, useremail, Setuseremail}) => {
  const makeLogout = ()=>{
    Setlogin(false)
  }
  return (
    <nav className='flex space-x-2 text-sm md:space-x-5 bg-white shadow-md p-4 justify-between md:text-lg font-semibold'>
        <div className="flex space-x-6">
        <Link href = "/" ><div className='cursor-pointer hover:text-orange-500'>Home</div></Link>
        <Link href = "/notes" ><div className='cursor-pointer hover:text-orange-500'>My Notes</div></Link>
        <Link href = "/add-notes" ><div className='cursor-pointer hover:text-orange-500'>Add Notes</div></Link>
        </div>
        {!login && <div className='flex space-x-6'>
        <Link href = "/signup" ><div className='cursor-pointer hover:text-orange-500'>Sign up</div></Link>
        <Link href = "/login" ><div className='cursor-pointer hover:text-orange-500'>Login</div></Link>
        </div> }
        {login && <Link href = "/" ><div onClick = {makeLogout} className='cursor-pointer hover:text-orange-500'>Log out</div></Link>}
    </nav>
      )
    }
        
    export default Navbar
        
        

        
