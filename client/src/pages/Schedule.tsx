import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Heading } from "../components/Heading";

export function Schedule() {
    return(
        <div className="mx-auto px-12 py-5 flex flex-col gap-15">
            <Header variant="schedule" />
            <Heading>Schedule</Heading>

            <Footer churchName="Gereja Sidang Kristus" location="Kelapa Gading" phone="+6289682115180" email="gskkelapagading@gmail.com" />
        </div>
    )
}