import { Header } from "../components/Header";
import { ServiceCard } from "../components/ServiceCard";

export function CreateService() {
    return(
        <div className="mx-auto px-12 py-5 flex flex-col gap-15 items-center">
            <Header variant="admin" />
            <ServiceCard />
        </div>
    )
}
