import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { API_URL } from "../api"
import { Check, Pencil, Trash2 } from "lucide-react";

interface User {
    _id: string
    name: string
    email: string
    phoneNumber: string
    createdAt?: Date
}

interface Chosen {
    _id: string
    name: string
}

export function AdminUsers() {

    const [users, setUsers] = useState<User[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [chosenName, setChosenName] = useState<Chosen | null>(null)
    const [chosenEmail, setChosenEmail] = useState<Chosen | null>(null)
    const [chosenPhoneNumber, setChosenPhoneNumber] = useState<Chosen | null>(null)
    const [toBeDelete, setToBeDelete] = useState<string | null>(null)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    useEffect(() => {
        async function fetchUsers(){
            setLoading(true)

            const response = await fetch(`${API_URL}/api/users`, {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            })

            const data: User[] = await response.json()

            setUsers(data)
            setLoading(false)
        }
        fetchUsers()
    }, [])

    async function fetchUsers(){
        setLoading(true)

        const response = await fetch(`${API_URL}/api/users`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })

        const data: User[] = await response.json()

        setUsers(data)
        setLoading(false)
    }

    function handleNameChange(field: keyof typeof chosenName){
        return (e: React.ChangeEvent<HTMLInputElement>) =>
            setChosenName((prev) => ({ ...prev, [field]: e.target.value }))
    }

    function handleEmailChange(field: keyof typeof chosenEmail){
        return (e: React.ChangeEvent<HTMLInputElement>) =>
            setChosenEmail((prev) => ({ ...prev, [field]: e.target.value }))
    }

    function handlePhoneNumberChange(field: keyof typeof chosenPhoneNumber){
        return (e: React.ChangeEvent<HTMLInputElement>) =>
            setChosenPhoneNumber((prev) => ({ ...prev, [field]: e.target.value }))
    }

    async function handleNameSubmit(){
        setSubmitLoading(true)
        setError(null)
        
        const response = await fetch(`${API_URL}/api/users/update/name/${chosenName._id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ newName: chosenName.name })
        })

        const data = await response.json()

        if(!response.ok){
            setError(data.message || "Failed to update.")
            setSubmitLoading(false)
            return
        }

        setChosenName(null)
        setSubmitLoading(false)
        fetchUsers()
    }

    async function handleEmailSubmit(){
        setSubmitLoading(true)
        setError(null)
        
        const response = await fetch(`${API_URL}/api/users/update/email/${chosenEmail._id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ newEmail: chosenEmail.name })
        })

        const data = await response.json()

        if(!response.ok){
            setError(data.message || "Failed to update.")
            setSubmitLoading(false)
            return
        }

        setChosenEmail(null)
        setSubmitLoading(false)
        fetchUsers()
    }

    async function handlePhoneNumberSubmit(){
        setSubmitLoading(true)
        setError(null)
        
        const response = await fetch(`${API_URL}/api/users/update/phonenumber/${chosenPhoneNumber._id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ newPhoneNumber: chosenPhoneNumber.name })
        })

        const data = await response.json()

        if(!response.ok){
            setError(data.message || "Failed to update.")
            setSubmitLoading(false)
            return
        }

        setChosenPhoneNumber(null)
        setSubmitLoading(false)
        fetchUsers()
    }

    async function handleDelete(userId){
        setDeleteLoading(true)
        setError(null)

        const response = await fetch(`${API_URL}/api/users/${userId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        })

        const data = await response.json()

        if(!response.ok){
            setError(data.message || "Failed to update.")
            setDeleteLoading(false)
            return
        }

        setDeleteLoading(false)
        fetchUsers()
    }

	return (
		<div className="flex flex-col h-screen">
			<div className="px-6.5 py-4">
				<Header variant="admin"/>
			</div>
			<div className="flex flex-1">
				<Sidebar variant="users" />
				<div className="flex flex-col bg-zinc-100/2 px-10 w-full h-full">
					<div className="flex justify-between py-7 items-center">
						<Heading>Manage Users</Heading>
					</div>
                    <div className="px-3 py-1 rounded rounded-lg bg-zinc-100">
                        <table className="table-fixed w-full max-h-137 overflow-y-auto text-left text-zinc-950">
                            <thead className="border-b border-amber-400">
                                <tr>
                                    <th className="pl-2 py-2">Full Name</th>
                                    <th className="">Email</th>
                                    <th className="">Phone Number</th>
                                    <th className="w-[7%] text-center">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td>Loading...</td></tr>
                                ) : (
                                    users?.map((u, index) => (
                                        <tr key={u._id} className={`${users.length-1 > index ? "border-b border-zinc-300" : ""} 
                                        text-sm hover:bg-amber-400/10 transition-colors`}>
                                            <td className="pl-2 py-2">
                                                <div className="flex justify-between items-center">
                                                    {chosenName?._id === u._id ? (
                                                        <>
                                                            <div className="fixed inset-0 z-50" onClick={() => setChosenName(null)}/>
                                                            <input className="relative z-60 w-full h-full -ml-0.5 bg-zinc-100 border-2 border-zinc-400 rounded" 
                                                            value={chosenName.name} onChange={handleNameChange("name")}/>
                                                        </>
                                                    ) : <span className="break-words">{u.name}</span>}

                                                    <div className="pl-2 pr-3 relative">
                                                        {chosenName?._id === u._id ? (
                                                            <button 
                                                            className="relative z-60 text-right bg-green-300 px-1 py-1 border border-zinc-400 
                                                            rounded rounded-lg hover:bg-green-500 disabled:bg-green-500 transition-colors"
                                                            disabled={submitLoading}
                                                            onClick={() => handleNameSubmit()}
                                                            >
                                                                <Check size={14} />
                                                            </button>
                                                        ) : (
                                                            <button 
                                                            className="text-right bg-zinc-100 px-1 py-1 border border-zinc-400 rounded rounded-lg
                                                            hover:bg-zinc-300 transition-colors"
                                                            onClick={() => setChosenName({_id: u._id, name: u.name})}
                                                            >
                                                                <Pencil size={14} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2">
                                                <div className="flex justify-between items-center">
                                                    {chosenEmail?._id === u._id ? (
                                                        <>
                                                            <div className="fixed inset-0 z-50" onClick={() => setChosenEmail(null)}/>
                                                            <input className="relative z-60 w-full h-full -ml-0.5 bg-zinc-100 border-2 border-zinc-400 rounded" 
                                                            value={chosenEmail.name} onChange={handleEmailChange("name")}/>
                                                        </>
                                                    ) : <span className="break-words">{u.email}</span>}

                                                    <div className="pl-2 pr-3 relative">
                                                        {chosenEmail?._id === u._id ? (
                                                            <button 
                                                            className="relative z-60 text-right bg-green-300 px-1 py-1 border border-zinc-400 
                                                            rounded rounded-lg hover:bg-green-500 disabled:bg-green-500 transition-colors"
                                                            disabled={submitLoading}
                                                            onClick={() => handleEmailSubmit()}
                                                            >
                                                                <Check size={14} />
                                                            </button>
                                                        ) : (
                                                            <button 
                                                            className="text-right bg-zinc-100 px-1 py-1 border border-zinc-400 rounded rounded-lg
                                                            hover:bg-zinc-300 transition-colors"
                                                            onClick={() => setChosenEmail({_id: u._id, name: u.email})}
                                                            >
                                                                <Pencil size={14} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2">
                                                <div className="flex justify-between items-center">
                                                    {chosenPhoneNumber?._id === u._id ? (
                                                        <>
                                                            <div className="fixed inset-0 z-50" onClick={() => setChosenPhoneNumber(null)}/>
                                                            <input className="relative z-60 w-full h-full -ml-0.5 bg-zinc-100 border-2 border-zinc-400 rounded" 
                                                            value={chosenPhoneNumber.name} onChange={handlePhoneNumberChange("name")}/>
                                                        </>
                                                    ) : <span className="break-words">{u.phoneNumber}</span>}

                                                    <div className="pl-2 pr-3 relative">
                                                        {chosenPhoneNumber?._id === u._id ? (
                                                            <button 
                                                            className="relative z-60 text-right bg-green-300 px-1 py-1 border border-zinc-400 
                                                            rounded rounded-lg hover:bg-green-500 disabled:bg-green-500 transition-colors"
                                                            disabled={submitLoading}
                                                            onClick={() => handlePhoneNumberSubmit()}
                                                            >
                                                                <Check size={14} />
                                                            </button>
                                                        ) : (
                                                            <button 
                                                            className="text-right bg-zinc-100 px-1 py-1 border border-zinc-400 rounded rounded-lg
                                                            hover:bg-zinc-300 transition-colors"
                                                            onClick={() => setChosenPhoneNumber({_id: u._id, name: u.phoneNumber})}
                                                            >
                                                                <Pencil size={14} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="flex gap-2 py-2 items-center justify-center">
                                                <div className="relative">
                                                    <button
                                                    className="bg-zinc-100 px-1.5 py-1.5 rounded-lg border border-zinc-400 hover:bg-red-300 transition-colors"
                                                    onClick={() => setToBeDelete(u._id)}
                                                    >
                                                        <Trash2 size={15} className="text-slate-900" />
                                                    </button>
                                                    {toBeDelete === u._id && (
                                                        <>
                                                            <div 
                                                            className="fixed inset-0 z-40"
                                                            onClick={() => setToBeDelete(null)}
                                                            />
                                                                <div className={`absolute ${index < users.length-1 ? "top-full mt-1" : "bottom-full mb-1" } right-0 w-24 z-50 
                                                                flex flex-col gap-1 items-center bg-slate-800 text-white text-xs rounded-lg p-2 shadow-lg`}>
                                                                    <span>Are you sure?</span>
                                                                    <div className="flex gap-3 items-center">
                                                                        <button 
                                                                        disabled={deleteLoading}
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
                                            </td>
                                        </tr>
                                    )))
                                }
                            </tbody>
                        </table>
                    </div>
                    {error && (<span className="text-center text-red-500 mt-3">{error}</span>)}
				</div>
			</div>
		</div>
	)
}
