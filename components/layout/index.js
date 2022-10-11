import { AppBar } from "../appBar/index.js"
import { Footer } from "./footer/index.js"

export function Layout({children}) {
 
    return (
        <div className="min-h-screen flex flex-col">
            <AppBar />
            <main className="pt-[5rem] my-6 grow">
                {children}
            </main>
            <Footer />
        </div>
    )
    
}