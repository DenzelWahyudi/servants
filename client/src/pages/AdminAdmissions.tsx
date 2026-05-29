import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Heading } from "../components/Heading";
import { Sidebar } from "../components/Sidebar";
import { AdmitCard } from "../components/AdmitCard";

interface Assignment {
    _id: string
    userName: string
    roleName: string
    serviceName: string
    date: string
    time: string
}

export function AdminAdmissions(){

    const [assignments, setAssignments] = useState<Assignment[] | null>(null)

    useEffect(() => {
        async function fetchPendingAssignments() {
            const response = await fetch(`/api/assignments/pendingstatus`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data: Assignment[] = await response.json()
            setAssignments(Array.isArray(data) ? data : [])
        }
        fetchPendingAssignments()
    }, [])

    async function fetchPendingAssignments() {
        const response = await fetch(`/api/assignments/pendingstatus`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data: Assignment[] = await response.json()
        setAssignments(Array.isArray(data) ? data : [])
    }

    return (
        <div className="flex flex-col overflow-y-auto h-screen">
        <div className="px-6.5 py-4">
            <Header variant="admin"/>
        </div>
        <div className="flex flex-1">
            <Sidebar variant="admissions" />
            <div className="flex flex-col bg-zinc-100/2 px-10 w-full h-full">
                <div className="flex justify-between py-7 items-center">
                    <Heading>Manage Admissions</Heading>
                </div>
                <div className="flex flex-wrap gap-4">
                    {assignments?.map((a) => <AdmitCard _id={a._id} userName={a.userName} roleName={a.roleName} 
                    serviceName={a.serviceName} date={a.date} time={a.time} onSave={() => {fetchPendingAssignments()}}/>)}
                </div>
            </div>
        </div>
        </div>
    )
}