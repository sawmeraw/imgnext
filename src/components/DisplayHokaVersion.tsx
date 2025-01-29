"use client"

import { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function DisplayHokaVersion() {
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

    return (
        <div className="mt-4">
            Current Version: {version}
        </div>
    )
}