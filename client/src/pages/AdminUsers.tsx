import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { API_URL } from "../api"
import { Pencil, Trash2 } from "lucide-react";
import { Form } from "../components/Form";

interface User {
    _id: string
    name: string
    email: string
    phoneNumber: string
    createdAt?: Date
}

export function AdminUsers() {

    const [users, setUsers] = useState<User[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [chosenUser, setChosenUser] = useState<User | null>(null)

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
                        <table className="table-fixed w-full max-h-142 overflow-y-auto text-left text-zinc-950">
                            <thead className="border-b border-amber-400">
                                <tr>
                                    <th className="py-2">Full Name</th>
                                    <th className="">Email</th>
                                    <th className="">Phone Number</th>
                                    <th className="w-[8%] text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td>Loading...</td></tr>
                                ) : (
                                    users?.map((u, index) => (
                                        <tr key={u._id} className={`${users.length-1 > index ? "border-b border-zinc-300" : ""} text-sm`}>
                                            <td className="py-2 break-words">{u.name}</td>
                                            <td className="py-2 break-words">{u.email}</td>
                                            <td className="py-2 break-words">{u.phoneNumber}</td>
                                            <td className="flex gap-2 py-2 break-words items-center justify-center">
                                                <button
                                                className="bg-zinc-100 px-1.5 py-1.5 rounded-lg border border-zinc-400 hover:bg-zinc-300 transition-colors"
                                                onClick={() => setChosenUser({
                                                    _id: u._id,
                                                    name: u.name,
                                                    email: u.email,
                                                    phoneNumber: u.phoneNumber
                                                })}
                                                >
                                                    <Pencil size={15} className="text-slate-900" />
                                                </button>
                                                <button
                                                className="bg-zinc-100 px-1.5 py-1.5 rounded-lg border border-zinc-400 hover:bg-zinc-300 transition-colors">
                                                    <Trash2 size={15} className="text-slate-900" />
                                                </button>
                                            </td>
                                        </tr>
                                    )))
                                }
                            </tbody>
                        </table>
                    </div>
				</div>
			</div>
            {chosenUser && (
                <div className="flex items-center justify-center fixed inset-0 z-50 bg-zinc-950/50" onClick={() => setChosenUser(null)}>
                    <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-2 w-100 h-100 p-3 rounded-xl bg-slate-800">
                        <Form label="Full Name" />
                        <Form label="Email" />
                        <Form label="Phone Number" className="h-8" />
                    </div>
                </div>
            )}
		</div>
	)
}
