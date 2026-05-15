import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Heading } from "../components/Heading";
import { OpeningsCard } from "../components/OpeningsCard";

interface Service {
    id: number,
    name: string,
    date: string,
    time: string,
    status: string
}

export function Openings() {

    const [services, setServices] = useState<Service[] | null>(null)
    
    useEffect(() => {
        async function fetchServices() {
            const response = await fetch('/api/services', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            setServices(data)
        }
        fetchServices()
    }, [])

    return(
        <div className="mx-auto px-12 py-5 flex flex-col gap-13">
            <Header variant="openings" />
            <Heading>Openings</Heading>
                <div className="-mt-7 flex flex-wrap gap-4">
                    {services?.map((service) => (
                        <OpeningsCard key={service.id} serviceName={service.name} 
                        date={new Date(service.date).toLocaleDateString("en-GB", { year:"numeric", month: "long", day: "numeric",})} 
                        time={service.time} role={service.status} />
                    ))}
                </div>
            <Footer churchName="Gereja Sidang Kristus" location="Kelapa Gading" phone="+6289682115180" email="gskkelapagading@gmail.com" />
        </div>
    )
}
