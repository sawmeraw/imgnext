"use client"
import { useConfigStore } from "@/store/store";
import { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function DisplayHokaVersion() {

    const {hokaVersion, setHokaVersion} = useConfigStore();
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

    return (
        <div className="mt-4">
            Current Version: {hokaVersion}
        </div>
    )
}