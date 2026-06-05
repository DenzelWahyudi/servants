import { Calendar } from "../components/Calendar";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function Schedule() {
    return(
        <div className="mx-auto p-4 sm:px-12 py-5 flex flex-col gap-7">
            <Header variant="schedule" />
            <div className="h-[770px] lg:h-[900px]">
                <Calendar/>
            </div>
            <Footer />
        </div>
    )
}