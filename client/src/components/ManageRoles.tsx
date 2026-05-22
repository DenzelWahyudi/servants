import { useEffect, useState } from "react";
import { Heading } from "./Heading";
import { RolesCard } from "./RolesCard";

interface Service{
    _id: string
}

export function ManageRoles(){

    const [services, setServices] = useState<Service[] | null>(null)

    useEffect(() => {
        async function fetchServices(){
            const response = await fetch('/api/services', {
                method: "GET",
                headers: { "Content-Type": 'application/json'}
            })
            const data: Service[] = await response.json()
            setServices(data)
        }
        fetchServices()
    }, [])
    
    return (
        <div className="flex flex-col bg-zinc-100/2 px-10 w-full h-full">
            <div className="flex justify-between py-7 items-center">
                <Heading>Manage Roles</Heading>
            </div>
            {services?.map((service) => 
            <div className="rounded-lg overflow-hidden pb-4.5">
                <RolesCard serviceId={service._id} />
            </div>
            )}
        </div>
    )
}