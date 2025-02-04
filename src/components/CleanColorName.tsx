'use client'

import { useState } from "react"
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

export default function CleanColorName() {
    const [result, setResult] = useState<string>("");

    const capitalizeColorName = (name: string): string => {
        let arr = name.split('/')

        let resultArr: string[] = []

        for (let word of arr)
        {
            resultArr.push(word.split(' ').map(w=> w.charAt(0).toUpperCase()+ w.slice(1).toLowerCase()).join(' '))
        }

        return resultArr.join('/')
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setResult(capitalizeColorName(event.target.value))
    }

    const handleCopyResult = () => {
        try {

            navigator.clipboard.writeText(result)
            toast.success('Copied to clipboard', { autoClose: 3000 })
        } catch (error) {
            toast.error('Error copying to clipboard', { autoClose: 3000 })
        }
    }

    return (
        <>
            <div className="bg-white w-1/3 shadow-md h-44 px-4 py-2">
                <h3 className="font-semibold">Clean Color Name</h3>
                <input type="text" className=" mt-4 py-2 px-4 bg-neutral-300 rounded-sm placeholder:text-slate-600" placeholder="e.g. WHITE/BLACK" onChange={handleChange} />
                {result && <div className="flex mt-2 gap-2 items-center w-fit">
                    <button onClick={handleCopyResult}><FaCopy className="text-black" size={30} /></button>
                    <p className=" text-md py-2 px-2 rounded bg-stone-400">{result}</p>
                </div>}
            </div>
        </>
    )
}