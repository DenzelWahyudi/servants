import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { API_URL } from "../api"

type RelieveRoleFormProps = {
    userId?: string
    roleId: string
    serviceName: string
    roleName: string
    onClose: () => void
}

interface User {
    userId: string
    name: string
}

export function RelieveRoleForm({ roleId, serviceName, roleName, onClose }: RelieveRoleFormProps){

    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)
    const [users, setUsers] = useState<User[] | null>(null)
    const [user, setUser] = useState<string | null>("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchUsers(){
            const usersRes = await fetch(`${API_URL}/api/assignments/relieve/${roleId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const usersData: User[] = await usersRes.json()
            setUsers(usersData)
        }
        fetchUsers()
    }, [roleId])

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>){
            setUser(e.target.value)
    }

    async function handleRemove(userId, roleId){
        setLoading(true)
        setError(null)
        {console.log(userId)}
        const response = await fetch(`${API_URL}/api/assignments/relieve`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, roleId })
        })
        const data = await response.json()
        if (!response.ok){
            setError( data.message || "Failed to relieve user")
            setLoading(false)
            return
        }

        setLoading(false)
        if (onClose) onClose()
    }

    return (
        <div className="flex flex-col gap-3 bg-slate-900 rounded-lg p-4.5 w-110">
            <div className="pb-2.5">
                <h1 className="text-4xl font-bold text-red-400">Relieve Role</h1>
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
                <span className="text-base text-left p-1 pl-2 border border-zinc-600 rounded w-full overflow-x-auto">
                    {roleName}
                </span>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-sm text-zinc-100 font-light">Remove Assignment</h3>
                <select
                    value={user}
                    onChange={handleChange}
                    className={`border border-zinc-600 focus:border-amber-400 outline-none text-base 
                    text-left p-1 pl-2 rounded w-full transition-colors ${user ? '' : 'text-zinc-500 font-medium'}`}>
                        <option value="" disabled>Select a user</option>
                        {users?.map((user) => (
                            <option key={user.userId} value={user.userId}>{user.name}</option>
                        ))}
                </select>
            </div>
            {error && <p className="text-red-600 text-sm -mb-6.5 pl-1">{error}</p>}
            <div className="flex gap-2 mt-10 justify-end">
                <button 
                onClick={() => onClose ? onClose() : navigate('/admin/roles')}
                className="bg-zinc-600 rounded-lg px-3 py-1.5 text-zinc-200 text-base hover:bg-zinc-700">
                    Cancel
                </button>
                <button
                onClick={() => handleRemove(user!, roleId)}
                disabled={!user}
                className="bg-amber-400 rounded-lg px-3 py-1.5 text-slate-900 text-base hover:bg-amber-500 disabled:bg-zinc-500">
                    {loading ? "Removing..." : "Remove"}
                </button>
            </div>
        </div>
    )
}