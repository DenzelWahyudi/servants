import { useEffect, useState } from "react"
import { UserPlus, UserMinus } from 'lucide-react'
import { AssignRoleForm } from "./AssignRoleForm"
import { RelieveRoleForm } from "./RelieveRoleForm"
import { API_URL } from "../api"
import { format } from "date-fns"

type RolesCardProps = {
    serviceId: string
}

interface userName {
    name: string
}

interface Role {
    _id: string
    name: string
    spotsTotal: number
    spotsFilled: number
    usersNames: userName[]
}

interface Service {
    _id : string
    name: string
    date: string
    time: string
}

interface Assign {
    roleId: string
    serviceName: string
    roleName: string
}

export function RolesCard({ serviceId }: RolesCardProps){
    
    const [service, setService] = useState<Service | null>(null)
    const [roles, setRoles] = useState<Role[] | null>(null)
    const [assignData, setAssignData] = useState<Assign | null>(null)
    const [relieveData, setRelieveData] = useState<Assign | null>(null)

    useEffect(() => {
        async function fetchService() {
            const serviceResponse = await fetch(`${API_URL}/api/services/${serviceId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const serviceData: Service = await serviceResponse.json()
            
            const rolesResponse = await fetch(`${API_URL}/api/roles/${serviceId}`, {
                method: "GET",
                headers: { "Content-Type": "applicaton/json" }
            })
            const rolesData: Role[] = await rolesResponse.json()

            const rolesWithNamesResponse = await Promise.all(rolesData?.map(async (r) => {
                    const usersNameRes = await fetch(`${API_URL}/api/assignments/${r._id}`, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    })
                    const usersNames: userName[] = await usersNameRes.json()
                    return { ...r, usersNames }
                }))
            setService(serviceData)
            setRoles(rolesWithNamesResponse)
        }
        fetchService()
    }, [serviceId])

    if(!service) return <div>Loading...</div>

    async function fetchRoles(serviceId: string){
        const rolesResponse = await fetch(`${API_URL}/api/roles/${serviceId}`, {
            method: "GET",
            headers: { "Content-Type": "applicaton/json" }
        })
        const rolesData: Role[] = await rolesResponse.json()

        const rolesWithNamesResponse = await Promise.all(rolesData?.map(async (r) => {
                const usersNameRes = await fetch(`${API_URL}/api/assignments/${r._id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                })
                const usersNames: userName[] = await usersNameRes.json()
                return { ...r, usersNames }
            }))
        setRoles(rolesWithNamesResponse)
    }

    return (
        <div className="bg-white rounded-lg p-2.5">
            <table className="table-fixed w-full text-sm text-left text-zinc-300 rounded-lg overflow-hidden">
                <caption className="bg-slate-900 text-lg font-semibold text-zinc-100 text-left py-1.5 px-2.5">{service.name} - {format(new Date(service.date), 'd MMMM yyyy')}, {service.time}</caption>
                <thead className="text-zinc-950 font-medium bg-zinc-200">
                    <tr>
                        <th className="w-[25%] px-2.5 py-2">Role</th>
                        <th className="w-[48%]">Assigned To</th>
                        <th className="w-[11%] text-center">Slots Filled</th>
                        <th className="w-[7%] text-center">Status</th>
                        <th className="w-[9%] text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles?.map((r) => (
                        <tr key={r._id} className="border-b border-zinc-200 text-zinc-900">
                            <td className="px-2.5 py-2 break-words">{r.name}</td>
                            <td className="py-2 break-words">{r.usersNames?.map(userName => userName.name).join(", ") ?? "..."}</td>
                            <td className="text-center">{r.spotsFilled}/{r.spotsTotal}</td>
                            <td className="text-center">
                                <span className={`py-1 px-2.5 text-xs rounded-xl text-zinc-100 font-light shadow
                                ${r.spotsFilled >= r.spotsTotal ? "bg-red-600" : "bg-green-600"}`}>
                                    {r.spotsFilled >= r.spotsTotal ? "Filled" : "Open"}
                                </span>
                            </td>
                            <td>
                                <div className="flex gap-1 py-2 items-center justify-center">
                                    <button
                                    onClick={() => setRelieveData({
                                        roleId: r._id,
                                        serviceName: service.name,
                                        roleName: r.name
                                    })}
                                    className="bg-zinc-100 px-1.5 py-1 rounded-lg border border-zinc-400 hover:bg-zinc-300 disabled:bg-red-300 trasition-colors"
                                    >
                                        <UserMinus size={16} className="text-slate-900"/>
                                    </button>  
                                    <button
                                    disabled={r.spotsFilled >= r.spotsTotal}
                                    onClick={() => setAssignData({
                                        roleId: r._id,
                                        serviceName: service.name,
                                        roleName: r.name
                                    })}
                                    className="bg-zinc-100 px-1.5 py-1 rounded-lg border border-zinc-400 hover:bg-zinc-300 disabled:bg-red-300 trasition-colors"
                                    >
                                        <UserPlus size={16} className="text-slate-900"/>
                                    </button>    
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {assignData && (
                <div 
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setAssignData(null)}
                >
                    <div
                    onClick={(e) => e.stopPropagation()}
                    className="max-h-[90vh] overflow-y-auto"
                    >
                        <AssignRoleForm
                        roleId={assignData.roleId}
                        serviceName={assignData.serviceName}
                        roleName={assignData.roleName}
                        onClose={() => {
                            setAssignData(null)
                            fetchRoles(serviceId)
                        }}
                        />
                    </div>
                </div>
            )}
            {relieveData && (
                <div 
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setRelieveData(null)}
                >
                    <div
                    onClick={(e) => e.stopPropagation()}
                    className="max-h-[90vh] overflow-y-auto"
                    >
                        <RelieveRoleForm
                        roleId={relieveData.roleId}
                        serviceName={relieveData.serviceName}
                        roleName={relieveData.roleName}
                        onClose={() => {
                            setRelieveData(null)
                            fetchRoles(serviceId)
                        }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}