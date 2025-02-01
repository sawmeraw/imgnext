import PageWrapper from "@/components/PageWrapper"

interface LayoutProps{
    children: React.ReactNode
}

export default function Layout({children}: LayoutProps){
    return (
        <PageWrapper>{children}</PageWrapper>
    )
}