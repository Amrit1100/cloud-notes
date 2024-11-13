import Head from "next/head";

export default function Home({useremail, Setuseremail, login, Setlogin, name, Setname}) {
  console.log(name)
  return (
    <>
      
      <div className="container mx-auto">
      {login && <div className="text-4xl text-pink-600 font-bold text-center my-10">Welcome {name}</div>}
      <section className="text-gray-600 body-font">
      
  <div className="container px-5 py-8 mx-auto">
  
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Cloud Notes</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Cloud Notes is a utility where you can take notes on cloud anytime and anywhere.</p>
    </div>
    <div className="flex flex-wrap">
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Scalable</h2>
        <p className="leading-relaxed text-base mb-4">You can take as many notes as you want.</p>
       
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Accessible</h2>
        <p className="leading-relaxed text-base mb-4">You can access your notes anytime and anywhere.</p>
       
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Simple to Use</h2>
        <p className="leading-relaxed text-base mb-4">You just need to click one button to access your notes and to add notes.</p>
        
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">No charges</h2>
        <p className="leading-relaxed text-base mb-4">Notes Cloud is free to use utility and there are no charges involved to use it.</p>
        
      </div>
    </div>
    <button className="flex mx-auto mt-16 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">Sign in</button>
  </div>
</section>
      </div>
    </>
  );
}
