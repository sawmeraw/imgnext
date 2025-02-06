"use client"

import { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify";
import Loading from "./Loading";
import { useConfigStore } from "@/store/store";

export default function UpdateHokaVersion() {
    const {hokaVersion, setHokaVersion} = useConfigStore();
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {

        const fetchExisting = async () => {
            const resp = await fetch('/api/version', { method: "GET" })
            const data = await resp.json()
            setHokaVersion(data.version)
        }
        if (hokaVersion == "" || !hokaVersion){
            fetchExisting();
        }

    }, [])

    const handleSubmit = async (event: FormEvent) => {
        setLoading(true);
        event.preventDefault();
        const form = event.target as HTMLFormElement
        const version = form.version.value as string

        try{
            const resp = await fetch('/api/version', {method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({version}),
            })
            if(resp.ok){
                setLoading(false);
                setHokaVersion(version);
                toast.success("Version Updated Successfully");
                setTimeout(()=>{
                    form.reset()
                }, 5000)
            }
        } catch(error){
            toast.error("Error updating version.")
        } finally{
            setLoading(false);
        }
    }


    return (
        <div className="mt-4 px-4">
            <div className="flex flex-row gap-3">
            <p>HOKA Route Version: {hokaVersion}</p>
            <p>{loading ? <Loading/> : ""}</p>
            </div>
            <form onSubmit={handleSubmit} method="post">
                <div className="mt-4">
                    <input name="version" required className="py-2 px-4 bg-neutral-300 rounded-sm placeholder:text-slate-600" type="text" placeholder="Set new version" />
                </div>
                <div className="mt-4">
                    <button className="py-2 px-4 bg-black rounded text-white text-md font-semibold cursor-pointer hover:bg-stone-600 duration-200 " type="submit">Set</button>
                </div>
            </form>
        </div>
    )
}