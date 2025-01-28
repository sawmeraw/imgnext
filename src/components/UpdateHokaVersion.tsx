"use client"

import { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function UpdateHokaVersion() {
    const [version, updateVersion] = useState<string>();

    useEffect(() => {
        const fetchExisting = async () => {
            const resp = await fetch('/version', { method: "GET" })
            const data = await resp.json()
            console.log(data)
            updateVersion(data.version)

        }
        fetchExisting();
    }, [])

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement
        const version = form.version.value as string

        try{
            const resp = await fetch('/version', {method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({version}),
            })
            if(resp.ok){
                updateVersion(version);
                toast.success("Version Updated Successfully")
            }
        } catch(error){
            toast.error("Error updating version.")
        }


    }


    return (
        <div className="mt-4">
            Current Version: {version}
            {/* <form onSubmit={handleSubmit} method="post">
                <div className="mt-4">
                    <input name="version" required className="py-2 px-4 bg-neutral-300 rounded-sm placeholder:text-slate-600" type="text" placeholder="Set new version" />
                </div>
                <div className="mt-4">
                    <button className="py-2 px-4 bg-black rounded text-white text-md font-semibold cursor-pointer hover:bg-stone-600 duration-200 " type="submit">Set</button>
                </div>
            </form> */}
        </div>
    )
}