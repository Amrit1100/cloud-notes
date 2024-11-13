import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [name, Setname] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [cpassword, Setcpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!name || !email || !password || !cpassword) {
      toast.error("All fields are required!", { autoClose: 1500 });
      return false;
    }
    if (password !== cpassword) {
      toast.error("Passwords do not match!", { autoClose: 1500 });
      return false;
    }
    return true;
  };

  const makeSignup = async () => {
    if (!validateForm()) return;

    setIsLoading(true);  // Disable submit button

    const userData = {
      "name": name,
      "email": email,
      "password": password,
      "cpassword": cpassword,
    };

    let response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    let data = await response.json();
    

    if (data.success) {
      toast.success("Verification email sent!", { autoClose: 1500 });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }else if (data.signup == "alreadyhaveaccount") {
      toast.error("This email already have account!", {autoClose : 1000})
    }
    else {
      toast.error(data.message || "Something went wrong", { autoClose: 1500 });
    }

    setIsLoading(false);  // Re-enable submit button
  };

  return (
    <div>
      <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
          <div className="text-center mb-4">
            <Link href="/">Cloud Notes</Link>
          </div>

          <form>
            <div className="space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Name</label>
                <input 
                  onChange={(e) => Setname(e.target.value)} 
                  name="name" 
                  type="text" 
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500" 
                  placeholder="Enter Name" 
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                <input 
                  onChange={(e) => Setemail(e.target.value)} 
                  name="email" 
                  type="email" 
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500" 
                  placeholder="Enter email" 
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <input 
                  onChange={(e) => Setpassword(e.target.value)} 
                  name="password" 
                  type="password" 
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500" 
                  placeholder="Enter password" 
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                <input 
                  onChange={(e) => Setcpassword(e.target.value)} 
                  name="cpassword" 
                  type="password" 
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500" 
                  placeholder="Enter confirm password" 
                />
              </div>

              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                  className="h-4 w-4 shrink-0 text-pink-600 focus:ring-pink-500 border-gray-300 rounded" 
                />
                <label htmlFor="remember-me" className="text-gray-800 ml-3 block text-sm">
                  I accept the <Link href="javascript:void(0);" className="text-pink-600 font-semibold hover:underline ml-1">Terms and Conditions</Link>
                </label>
              </div>
            </div>
            <div className="!mt-12">
              <button 
                onClick={makeSignup} 
                type="button" 
                disabled={isLoading}
                className={`w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white ${isLoading ? 'bg-pink-400' : 'bg-pink-600 hover:bg-pink-700'} focus:outline-none`}
              >
                {isLoading ? "Creating Account..." : "Create an account"}
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <Link href="/login" className="text-pink-600 font-semibold hover:underline ml-1">Login here</Link></p>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
