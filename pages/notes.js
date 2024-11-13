import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Notes({ useremail, Setuseremail, login, Setlogin, name, Setname }) {
  const [data, Setdata] = useState([]);
  const [makedelete, Setmakedelete] = useState(false);
  const [isVisible, SetisVisible] = useState(false);
  const [idTodelete, SetidTodelete] = useState(null);

  useEffect(() => {
    if (!login) return;

    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/getnotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ "email": useremail })
        });

        const newdata = await response.json();
        console.log(newdata.usernotes);
        Setdata(newdata.usernotes || []);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, [login, useremail]);

  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/getnotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "email": useremail })
      });

      const newdata = await response.json();
      console.log(newdata.usernotes);
      Setdata(newdata.usernotes || []);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };
  const deleteNote =async (id)=>{
    SetisVisible(false)
    let response = await fetch("/api/deletenote", {
      method : "POST", 
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({"id" : id})
    })

    let msg = await response.json()
    console.log(msg)
    if (msg.success == "note deleted" ){
      toast.success("Note deleted", {autoClose : 1000})
      fetchNotes()
    }
    SetidTodelete(null)
}
  const takeconfirmation = (id)=>{
    SetisVisible(true)
    SetidTodelete(id)
  }


  
  return (
    <div>
      {login ? (
        <div className="container px-4 py-4 mx-auto md:w-3/5">
          <h1 className="text-center text-2xl md:text-3xl font-bold text-pink-500 my-5">
            Welcome {name}, your notes:
          </h1>
          {data.length > 0 ? (
            data.map((e, index) => (
              <div className='flex items-center justify-around space-x-4'>
              <div key={e._id || index} className="my-2 w-full p-2 border-b border-gray-300 bg-gray-200 rounded-md">
                <h2 className="text-lg font-semibold">{e.title}</h2>
                <p className='text-pink-600 text-sm'>{e.hastags}</p>
                <p>{e.description}</p>
              </div>
              <div onClick = {()=> {takeconfirmation(e._id)}} className='text-2xl p-3 rounded-full hover:bg-pink-600 hover:text-white cursor-pointer'><MdOutlineDeleteOutline /></div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No notes found.</p>
          )}
        </div>
      ) : (
        <div className="text-center font-bold text-2xl m-6 text-purple-800">
          You are not logged in. Please log in to view your notes.
        </div>
      )}

      
{isVisible && <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black">
  <div className="box bg-black p-4 rounded-md text-white inline-block">
    <div>Are you sure you want to delete this Note?</div>
    <div className="flex justify-between my-3">
      <button className='bg-gray-800 p-3 rounded-md' onClick={()=>{deleteNote(idTodelete)}}>Ok</button>
      <button className='bg-gray-800 p-3 rounded-md' onClick={()=>{SetisVisible(false)}}>Cancel</button>
    </div>
  </div>
</div>}
      <ToastContainer />
    </div>
);
}

      
        
