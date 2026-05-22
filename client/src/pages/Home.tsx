import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { UpcomingServices } from "../components/UpcomingServices";
import { Welcome } from "../components/Welcome";

export function Home() {
  return (
    <div className="mx-auto px-12 py-5 flex flex-col gap-15">
      <Header variant="home"/>
      <Welcome />
      <div className="-mx-12 -my-8 bg-white px-12 pb-30">
        <UpcomingServices />
      </div>
      <Footer />
    </div>
  )
}
