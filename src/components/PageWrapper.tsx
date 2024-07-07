interface PageWrapperProps{
    children: React.ReactNode;
}

const PageWrapper : React.FC<PageWrapperProps> = ({children})=>{
    return (
        <section className="px-8 py-4 mt-4 max-w-[1500px] min-w-[1200px]">
            {children}
        </section>
    )
}

export default PageWrapper;