import { useEffect, useState } from "react"
import { Trash2, Pencil } from 'lucide-react';
import { EditServiceCard } from "./EditServiceCard";

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
    
    useEffect(() => {
        async function fetchServices() {
            const response = await fetch('/api/services', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            const data: Service[] = await response.json();

            const serviceWithRoles = await Promise.all(
                data.map(async (service) => {
                    const roleRes = await fetch(`/api/roles/${service._id}`, {
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
        setError(null);
        try {
            const response = await fetch(`/api/services/delete/${serviceId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "Deletion failed. Please try again");
                return;
            }

            setServices(prev => prev?.filter(s => s._id !== serviceId) ?? null)
        } catch {
            setError("Could not connect to the server. Please try again.")
        }
    }

    function handleStatusChange(serviceId: string){
        return async (e: React.ChangeEvent<HTMLSelectElement>) => {
            setError(null)
            const newStatus = e.target.value
            const response = await fetch(`/api/services/updatestatus/${serviceId}`, {
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
        <section className="bg-white py-4">
            <h2 className="text-3xl font-semibold text-slate-900 text-center mb-3">Upcoming Services</h2>
            <div className="rounded-lg overflow-hidden shadow-lg border border-zinc-200">
                <table className="w-full text-sm text-left text-zinc-300">
                    <thead className="text-zinc-950 border-amber-400 border-b-2 border-t-2">
                        <tr>
                            <th className="py-2 pl-3">Upcoming Service</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th className="pl-3">Roles Needed</th>
                            <th className="text-center pr-2.5">Status</th>
                            <th className="text-center pr-1">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services?.map((s) => (
                            <tr key={s._id} className="border-b border-zinc-400 text-zinc-950">
                                <td className="pl-3 font-medium">{s.name}</td>
                                <td>{new Date(s.date).toLocaleDateString("en-GB", { year:"numeric", month: "long", day: "numeric",})}</td>
                                <td>{s.time}</td>
                                <td className="pl-3 pr-7 py-3 max-w-[355px] break-words">{s.roles?.map(r => r.name).join(", ") ?? "..."}</td>
                                <td className="text-center">
                                    <select value={s.status} onChange={handleStatusChange(s._id)}
                                    className={`px-3 py-0.5 rounded font-semibold inline-block w-33 text-center ${s.status === "Roles Closed"
                                    ? "bg-red-200"
                                    : "bg-green-200"
                                    }`}
                                    >
                                        <option value="Roles Open">Roles Open</option>
                                        <option value="Roles Closed">Roles Closed</option>
                                    </select>
                                </td>
                                <td>
                                    <div className="flex gap-1 items-center justify-center">
                                        <button
                                        onClick={() => setEditingId(s._id)}
                                        className="bg-zinc-100 px-2 py-1.5 rounded-lg border border-zinc-400 hover:bg-zinc-300 transition-colors">
                                            <Pencil size={18} className="text-slate-900" />
                                        </button>
                                        <button
                                        onClick={() => handleDelete(s._id)}
                                        className="bg-red-100 px-2 py-1.5 rounded-lg border border-zinc-400 hover:bg-red-300 transition-colors">
                                            <Trash2 size={18} className="text-red-900" />
                                        </button>
                                        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editingId && (
                <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setEditingId(null)}
                >
                    <div 
                    onClick={(e) => e.stopPropagation()}
                    className="max-h-[90vh] overflow-y-auto"
                    >
                        <EditServiceCard 
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
