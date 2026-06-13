import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Heading } from "../components/Heading";
import { API_URL } from "../api";
import { useAuth } from "../hooks/useAuth";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { SendHorizontal } from 'lucide-react';

interface Service {
    serviceId: string
    serviceName: string
    date: Date
    time: string
}

interface Chat {
    userId: string
    message: string
    status: string
}

export function Chats() {

    const { token } = useAuth()
    const [assignedServices, setAssignedServices] = useState<Service[] | null>([])
    const [chats, setChats] = useState<Chat[] | null>(null)
    const [chosenService, setChosenService] = useState<Service | null>(null)

    useEffect(() => {
        async function fetchAssignedServices(){
            const response = await fetch(`${API_URL}/api/assignments/assignedservices`, {
                method: 'GET',
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const data: Service[] = await response.json();
            setAssignedServices(data)
        }
        fetchAssignedServices()
    }, [token])

    async function fetchChats(serviceId){
        const response = await fetch(`${API_URL}/api/chats/${serviceId}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json'
            }
        })
        const data: Chat[] = await response.json();
        setChats(data)
    }

    return(
        <div className="flex flex-col gap-5 mx-auto p-4 sm:px-12 py-5">
            <Header variant="chats" />
            <Heading>Chats</Heading>

            <div className="flex justify-center relative h-147 w-83 overflow-hidden mx-auto">
                <div className={`absolute flex flex-col gap-4 py-4 overflow-y-auto bg-slate-800 w-full h-full 
                transition-transform duration-300 ease-in-out
                ${chosenService ? '-translate-x-full' : 'translate-x-0'}`}>
                    <input className="mx-2 px-3 py-1 bg-slate-700 border border-slate-600 focus:border-amber-400 outline-none
                    text-zinc-100 text-sm rounded-lg transition-colors" 
                    placeholder="🔍︎  Search Service"/>
                    <div className="pr-0">
                        {assignedServices.length === 0 ? (
                                <p className="text-center text-zinc-100 text-sm">No Assignments</p>
                            ) : (assignedServices?.map((s) => 
                            <button className="flex justify-between w-full border-y border-zinc-700
                            px-2.5 py-2 text-sm font-medium hover:bg-slate-600"
                            key={s.serviceId}
                            onClick={() => fetchChats(s.serviceId) && setChosenService(s)}
                            >
                                <div className="flex flex-col text-left">
                                    <span>{s.serviceName}</span>
                                    <span className="text-zinc-300 font-normal">{new Date(s.date).toLocaleDateString("en-GB", { year:"numeric", month: "long", day: "numeric",})}</span>
                                </div>
                                <span>{s.time}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className={`absolute flex flex-col bg-slate-800 w-full h-full 
                transition-transform duration-300 ease-in-out
                ${chosenService ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center py-4 px-2.5 bg-slate-700">
                        <div className="flex gap-1 items-center">
                            <ChevronLeftIcon
                            className="-ml-2 h-6 cursor-pointer hover:text-slate-600 transition-colors"
                            onClick={() => setChosenService(null)}
                            />
                            <div className="flex flex-col gap-0.5">
                                <h2 className="text-[12px] font-medium leading-none">{chosenService?.serviceName}</h2>
                                <h2 className="text-zinc-300 text-[10px] leading-none">{new Date(chosenService?.date).toLocaleDateString("en-GB", { year:"numeric", month: "long", day: "numeric",})}</h2>
                            </div>
                        </div>
                        <h3 className="text-[12px]">{chosenService?.time}</h3>
                    </div>
                    <div className="flex py-2 gap-1.5 px-2.5 mt-auto bg-slate-700">
                        <textarea className="px-3 w-full bg-slate-700 border border-slate-600 focus:border-amber-400 outline-none
                        text-zinc-100 text-sm rounded-xl transition-colors resize-none" rows={1}/>
                        <button><SendHorizontal size={22} className="bg-green-600 rounded-xl text-zinc-950 p-0.5 hover:bg-green-950"/></button>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}
