import Link from "next/link"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AddNotes({useremail, Setuseremail, login, Setlogin, name, Setname}){

  let [title ,Settitle] = useState(null)
  let [hastags ,Sethastags] = useState(null)
  let [description ,Setdescription] = useState(null)
  
  const addNote = async()=>{
    let note = {"title" :title,"hastags" :hastags,"description" : description, "email" :useremail, "name" : name}
    let response = await fetch("/api/addnote", {
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(note)
    })
    let data = await response.json()
    let msg = data.res
    console.log(msg)
    if (msg == "success"){
      toast.success("Note successfully added!", {autoClose : 1000})
    }
  }

  return (
    <div>
      {!login && 
        <div className="container w-2/3 mx-auto my-10">
        <div className="text-md text-red-500 text-center my-6 font-bold text-2xl">Please login to add Notes</div>
        <div className="text-center "><Link href = "/login" className=" inline-block bg-pink-700 text-white py-2 px-3 rounded-md">Login Here</Link></div>
        </div>
       }

    {login && 
      <section className="text-gray-600 body-font relative">
<div className="container px-5 py-12 mx-auto my-auto">
 
  <div className="flex flex-col text-center w-full mb-6">
    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Add Note</h1>
  </div>
    
  <div className="lg:w-1/2 md:w-2/3 mx-auto">
    <div className="flex flex-wrap -m-2">
      <div className="p-2 w-1/2">
        <div className="relative">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Title</label>
          <input onChange = {(e)=>{Settitle(e.target.value)}} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div>
      </div>
      <div className="p-2 w-1/2">
        <div className="relative">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Hastags</label>
          <input onChange = {(e)=>{Sethastags(e.target.value)}} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative">
          <label htmlFor="message" className="leading-7 text-sm text-gray-600">Description</label>
          <textarea onChange = {(e)=>{Setdescription(e.target.value)}} id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
        </div>
      </div>
      <div className="p-2 w-full">
        <button onClick = {addNote} className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">Add Note</button>
      </div>
      <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
      </div>
    </div>
  </div>
</div>
<ToastContainer />
</section>
}
     </div>
  )
}
    


