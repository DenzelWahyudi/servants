import { useNavigate } from "react-router-dom"
import { Heading } from "./Heading"
import { useState } from "react"
import { API_URL } from "../api"

type SignUpCardProps = {
    userId: string
    roleId: string
    serviceName: string
    roleName: string
    date: string
    onClose: () => void
    onSave: () => void
}

export function SignUpCard({ userId, roleId, serviceName, roleName, date, onClose, onSave }: SignUpCardProps){

    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)

    async function handleAssign(userId: string, roleId: string){
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/assignments`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    userId,
                    roleId,
                    status: "pending"
                })
            });

            const data = await response.json()
            if (!response.ok){
                setError(data.message || "Sign Up failed!")
                return
            }

            if (onSave) onSave()
            else navigate('/openings')
        } catch {
            setError("Could not connect to server")
        }
    }

    return (
        <div className="flex flex-col gap-3 bg-slate-900 rounded-lg p-4.5 w-85 sm:w-110 text-zinc-100">
            <div className="pb-2.5">
                <Heading>Sign Up</Heading>
            </div>
            <hr className="-mx-4.5 border-0 h-0.5 bg-amber-400"/>
            <div className="flex flex-col gap-1">
                <h3 className="text-sm text-zinc-100 font-light mt-3.5">Service</h3>
                <span className="text-base text-left p-1 pl-2 border border-zinc-600 rounded w-full">
                    {serviceName}
                </span>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-sm text-zinc-100 font-light">Role</h3>
                <span className="text-base text-left p-1 pl-2 border border-zinc-600 rounded w-full">
                    { roleName.length > 30 ? roleName.slice(0, 30) + "...": roleName}
                </span>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-sm text-zinc-100 font-light">Date</h3>
                <span className="text-base text-left p-1 pl-2 border border-zinc-600 rounded w-full">
                    {date}
                </span>
            </div>
            {error && <p className="text-red-600 text-sm -mb-6.5 pl-1">{error}</p>}
            <div className="flex gap-2 mt-10 justify-end">
                <button 
                onClick={() => onClose ? onClose() : navigate('/openings')}
                className="bg-zinc-600 rounded-lg px-3 py-1.5 text-zinc-200 text-base hover:bg-zinc-700">
                    Cancel
                </button>
                <button
                onClick={() => handleAssign(userId, roleId)}
                className="bg-amber-400 rounded-lg px-3 py-1.5 text-slate-900 text-base hover:bg-amber-500">
                    Sign Up
                </button>
            </div>
        </div>
    )
}