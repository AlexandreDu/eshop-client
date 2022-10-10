import { AppBar } from "../appBar/index.js"
import { Footer } from "./footer/index.js"
import { PageWrapper } from "../wrapper/index.js"
export function Layout({children}) {
    console.log('render layout')
    return (
        <div className="min-h-screen flex flex-col">
            <AppBar />
            <main className="pt-[5rem] my-6 grow">
                <PageWrapper>
                    {children}
                </PageWrapper>
            </main>
            <Footer />
        </div>
    )
    
}