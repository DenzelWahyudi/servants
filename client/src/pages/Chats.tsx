import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Heading } from "../components/Heading";

export function Chats() {

    return(
        <div className="mx-auto p-4 sm:px-12 py-5 flex flex-col gap-13">
            <Header variant="chats" />
            <div className="-mt-8">
                <Heading>Chats</Heading>
            </div>
            
            <Footer />
        </div>
    )
}
