import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Heading } from "../components/Heading";
import { OpeningsCard } from "../components/OpeningsCard";
import { useAuth } from "../hooks/useAuth";

interface Service {
    _id: string
    name: string
    date: string
    time: string
    status: string
}

interface Role {
    _id: string
    serviceId: string
    name: string
    spotsTotal: number
    spotsFilled: number
}

export function Openings() {

    const [services, setServices] = useState<Service[] | null>(null)
    const [roles, setRoles] = useState<Role[] | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const { token } = useAuth();

    useEffect(() => {
        async function fetchRoles() {
            const roles = await fetch('/api/roles', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const rolesData = await roles.json()
            setRoles(rolesData)

            const services = await fetch('/api/services', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const servicesData = await services.json()
            setServices(servicesData)
        }
        async function fetchUser() {
            const response = await fetch('/api/users/id', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            setUserId(data)
        }
        if (token) {
            fetchUser()
        }
        fetchRoles()
    }, [token])

    async function fetchRoles() {
        const roles = await fetch('/api/roles', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const rolesData = await roles.json()
        setRoles(rolesData)

        const services = await fetch('/api/services', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const servicesData = await services.json()
        setServices(servicesData)
    }
    
    return(
        <div className="mx-auto px-12 py-5 flex flex-col gap-13">
            <Header variant="openings" />
            <Heading>Openings</Heading>
            <div className="min-h-130">
                <div className="-mt-7 flex flex-wrap gap-4 ">
                    {roles?.map((role) => {
                        if (role.spotsFilled < role.spotsTotal){
                            const service = services?.find(s => s._id === role.serviceId)
                            if (!service) return null

                            return (
                                <OpeningsCard key={role._id} serviceName={service.name} 
                                date={new Date(service.date).toLocaleDateString("en-GB", { year:"numeric", month: "long", day: "numeric",})} 
                                time={service.time} 
                                role={role.name} 
                                roleId={role._id}
                                userId={userId}
                                onSave={() => {fetchRoles()}}
                                />
                            )
                        }
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}
