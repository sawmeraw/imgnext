"use client"
import { LoginResponse } from "@/apiTypes/AuthTypes";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage(){
    const [respMessage, setRespMessage] = useState<string>("");
    const router = useRouter();

    const handleLogin = async (event: FormEvent)=>{
        event.preventDefault()
        try{
          const form = event.target as HTMLFormElement
          const password = form.password.value as string
          const response = await fetch('/auth', {method: "POST", body: JSON.stringify({password})})
          const message: LoginResponse = await response.json()
          setRespMessage(message.message || "")
          if(!response.ok){
            return
          }
          router.push('/')
        } catch(error){

        } finally{
          setTimeout(()=>{
            if(respMessage){
              setRespMessage("")
            }
          }, 3000)
        }
    }

    return (
        
            <div className="min-h-screen w-full grid grid-cols-4">
      <div className="col-span-2 flex items-center justify-center">
        <h1 className="text-6xl font-bold text-center">Img Next</h1>
      </div>

      <div className="col-start-4 bg-white flex items-center justify-center p-8">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
          {(respMessage != "") && <p className="font-semibold mt-4">{respMessage}</p>}
        </form>
      </div>
    </div>
        
    )


}