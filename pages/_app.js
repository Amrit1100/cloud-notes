import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import {useState } from "react";
import Head from "next/head";




export default function App({ Component, pageProps }) {
  let [useremail, Setuseremail] =  useState(null)
  let [login, Setlogin] =  useState(false)
  let [name, Setname] = useState(null)
  return <>
  <Head>
        <title>Cloud Notes</title>
        <meta name="description" content="Cloud Notes a utitily where you can take notes on cloud and can access them anywhere anytime." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Head>
   <Navbar useremail = {useremail} Setuseremail = {Setuseremail} login = {login} Setlogin = {Setlogin} name = {name} Setname = {Setname}/> 
  <Component {...pageProps} useremail = {useremail} Setuseremail = {Setuseremail} login = {login} Setlogin = {Setlogin} name = {name} Setname = {Setname}/>;
  </>
}
