import { FaGithub } from "react-icons/fa";

export default function Footer() {

    return (
        <>
            <section className="flex bg-black text-white items-center w-full shadow-lg py-4 px-8">
                <div className="font-semibold flex justify-between items-center w-full">
                    <p>Version: 2.1.1</p>
                    <p><a href="https://github.com/sawmeraw/imgnext" target="blank"><FaGithub className="text-white hover:text-blue-500 duration-300" size={30} /></a></p>
                </div>
            </section>
        </>
    )
}