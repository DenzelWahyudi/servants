import { format } from "date-fns"
import { useState } from "react"
import { API_URL } from "../api"

type AdmitCardProps = {
    _id: string
    userName: string
    roleName: string
    serviceName: string
    date: string
    time: string
    onSave: () => void
}

export function AdmitCard({ _id, userName, roleName, serviceName, date, time, onSave }:AdmitCardProps){

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleUpdateStatus(assigmentId, status :string){
        setLoading(true)
        setError(null)

        const response = await fetch(`${API_URL}/api/assignments/updatestatus/${assigmentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status })
            })
        const data = await response.json()

        if (!response.ok){
            setError(data)
            setLoading(false)
            return
        }

        setLoading(false)

        onSave()
    }

    return (
            <div className="flex flex-col gap-2  bg-zinc-100  text-slate-900 w-55 h-57 rounded-lg p-3.5">
                <h2 className="font-semibold">{ serviceName }</h2>
                <div className="flex flex-col gap-1">
                    <h2>{format(date, 'dd MMMM yyyy')}</h2>
                    <h2>{ time }</h2>
                </div>
                <h2 className="font-semibold">{ roleName.length > 17 ? roleName.slice(0, 17) + "...": roleName}</h2>
                <h2 className="font-semibold">{ userName.length > 19 ? userName.slice(0, 17) + "...": userName}</h2>
                <div className="flex justify-between mt-auto">
                    <button
                    onClick={() => {
                        handleUpdateStatus(_id, "declined")
                        onSave()
                    }}
                    disabled={loading}
                    className="bg-red-400 text-blue-950 text-sm font-semibold py-1 px-2 rounded w-22
                    mt-auto hover:bg-red-500 flex justify-center transition-colors rounded-lg px-2 py-1"
                    >
                        {loading ? "Loading" : "Decline"}
                    </button>
                    <button
                    onClick={() => { handleUpdateStatus(_id, "confirmed")}}
                    disabled={loading}
                    className="bg-green-400 text-blue-950 text-sm font-semibold py-1 px-2 rounded w-22
                    mt-auto hover:bg-green-500 flex justify-center transition-colors rounded-lg px-2 py-1"
                    >
                        {loading ? "Loading" : "Confirm"}
                    </button>
                </div>
                { error && ( <p className="text-red-400 text-sm text-center w-full">{error}</p>) }
            </div>
        )
}
