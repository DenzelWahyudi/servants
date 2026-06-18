import { useEffect, useState } from "react"
import { Trash2, Pencil } from 'lucide-react';
import { EditServiceForm } from "./EditServiceForm";
import { API_URL } from "../api"
import { format } from "date-fns";

interface Role {
    _id: string
    serviceId: string
    name: string,
}

interface Service {
    _id: string,
    name: string,
    date: string,
    time: string,
    status: string,
    roles?: Role[]
}


export function UpcomingServicesAdmin(){

    const [services, setServices] = useState<Service[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [toBeDelete, setToBeDelete] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        async function fetchServices() {
            const response = await fetch(`${API_URL}/api/services`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            const data: Service[] = await response.json();

            const serviceWithRoles = await Promise.all(
                data.map(async (service) => {
                    const roleRes = await fetch(`${API_URL}/api/roles/${service._id}`, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    })
                    const roles: Role[] = await roleRes.json();
                    return { ...service, roles }
                })
            )
            const sorted = serviceWithRoles.sort(
                (a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
            setServices(sorted);
        }
        fetchServices()
    }, [])

    async function handleDelete(serviceId: string){
        setLoading(true)
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/services/delete/${serviceId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "Deletion failed. Please try again");
                return;
            }

            setServices(prev => prev?.filter(s => s._id !== serviceId) ?? null)
            setLoading(false)
        } catch {
            setError("Could not connect to the server. Please try again.")
        }
    }

    function handleStatusChange(serviceId: string){
        return async (e: React.ChangeEvent<HTMLSelectElement>) => {
            setError(null)
            const newStatus = e.target.value
            const response = await fetch(`${API_URL}/api/services/updatestatus/${serviceId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            })
            if (!response.ok){
                setError("Failed to update service status")
                return
            }
            setServices((prev) => 
            prev?.map((s) => s._id === serviceId ? { ...s, status: newStatus} : s) ?? null)
        }
    }

    return (
        <section className="bg-white py-4 border-b border-zinc-200">
            <h2 className="text-3xl font-semibold text-slate-900 text-center mb-3">Upcoming Services</h2>
            <table className="w-full table-fixed text-sm text-left text-zinc-300">
                <thead className="text-zinc-950 border-amber-400 border-b-2 border-t-2">
                    <tr>
                        <th className="w-[18%] pl-3 py-2">Upcoming Service</th>
                        <th className="w-[14%]">Date</th>
                        <th className="w-[13%]">Time</th>
                        <th className="w-[33%]">Roles Needed</th>
                        <th className="w-[11%] text-center">Status</th>
                        <th className="w-[11%] text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services?.map((s, index) => (
                        <tr key={s._id} className="border-b border-zinc-400 text-zinc-950">
                            <td className="pl-3 font-medium break-words">{s.name}</td>
                            <td>{format(new Date(s.date), 'dd MMMM yyyy')}</td>
                            <td>{s.time}</td>
                            <td className="py-3 pr-4 break-words">{s.roles?.map(r => r.name).join(", ") ?? "..."}</td>
                            <td>
                                <div className="flex items-center justify-center">
                                    <select value={s.status} onChange={handleStatusChange(s._id)}
                                    className={`py-1 rounded font-semibold text-[13.5px] inline-block w-27 text-center ${s.status === "Roles Closed"
                                    ? "bg-red-200"
                                    : "bg-green-200"
                                    }`}
                                    >
                                        <option value="Roles Open">Roles Open</option>
                                        <option value="Roles Closed">Roles Closed</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div className="flex gap-1 items-center justify-center">
                                    <button
                                    onClick={() => setEditingId(s._id)}
                                    className="bg-zinc-100 px-2 py-1.5 rounded-lg border border-zinc-400 hover:bg-zinc-300 transition-colors">
                                        <Pencil size={15} className="text-slate-900" />
                                    </button>
                                    <div className="relative">
                                        <button
                                        onClick={() => setToBeDelete(s._id)}
                                        className="bg-red-100 px-2 py-1.5 rounded-lg border border-zinc-400 hover:bg-red-300 transition-colors">
                                            <Trash2 size={15} className="text-red-900" />
                                        </button>
                                        {toBeDelete === s._id && (
                                            <>
                                                <div 
                                                className="fixed inset-0 z-40"
                                                onClick={() => setToBeDelete(null)}
                                                />
                                                    <div className={`absolute ${index < services.length-1 ? "top-full mt-1" : "bottom-full mb-1" } right-0 w-24 z-50 
                                                    flex flex-col gap-1 items-center bg-slate-800 text-white text-xs rounded-lg p-2 shadow-lg`}>
                                                        <span>Are you sure?</span>
                                                        <div className="flex gap-3">
                                                            <button 
                                                            disabled={loading}
                                                            onClick={() => handleDelete(toBeDelete)}
                                                            className="hover:text-amber-400 disabled:text-amber-400">
                                                                Yes
                                                            </button>
                                                            <button 
                                                            onClick={() => setToBeDelete(null)}
                                                            className="hover:text-amber-400">
                                                                No
                                                            </button>
                                                        </div>
                                                    </div>
                                            </>
                                        )}
                                    </div>
                                    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        {editingId && (
            <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setEditingId(null)}
            >
                <div 
                onClick={(e) => e.stopPropagation()}
                className="max-h-[90vh] overflow-y-auto"
                >
                    <EditServiceForm 
                    id={editingId} 
                    onClose={() =>{setEditingId(null)}}
                    onSave={(updated) => {
                        setServices(prev => prev?.map(s => s._id === updated._id ? { ...s, ...updated, roles: updated.roles } : s)?? null)
                    }}
                    />
                </div>
            </div>
        )}
        </section>
    )
}
