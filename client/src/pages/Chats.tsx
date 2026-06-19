import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { API_URL } from "../api";
import { useAuth } from "../hooks/useAuth";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { SendHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { useLayoutEffect, useRef } from 'react';
import { useChatSocket } from "../hooks/useChatSocket";
import React from "react";

interface Service {
    serviceId: string
    serviceName: string
    date: Date
    time: string
}

interface Group {
    userId: string
    userName: string
    phoneNumber: string
    roleName: string[]
}

export function Chats() {

    const { token } = useAuth()
    const [assignedServices, setAssignedServices] = useState<Service[] | null>([])
    const [chosenService, setChosenService] = useState<Service | null>(null)
    const { chats } = useChatSocket(chosenService?.serviceId)
    const [message, setMessage] = useState({
        serviceId: "",
        message: "",
        status: "success"
    })
    const [error, setError] = useState<string | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const stickToBottomRef = useRef(true)
    const [userId, setUserId] = useState({
        _id: ""
    })
    const [groupDetails, setGroupDetails] = useState<Group[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [loadingDetails, setLoadingDetails] = useState(false)

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

        async function fetchUserName() {
			const response = await fetch(`${API_URL}/api/users/id`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			})
			const data = await response.json()
			setUserId({ _id: data })
		}

        fetchAssignedServices()
        fetchUserName()
    }, [token])

    const handleScroll = () => {
        const el = containerRef.current;
        if (!el) return;
        stickToBottomRef.current =
            el.scrollHeight - el.scrollTop - el.clientHeight < 32;
    }

    useLayoutEffect(() => {
        if (containerRef.current && stickToBottomRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
        
        const textarea = textareaRef.current;
        if (textarea){
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }, [chats, message.message]);

    function handleChange(field: keyof typeof message){
        return (e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage((prev) => ({ ...prev, [field]: e.target.value }))
    }

    async function handleSend(){
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_URL}/api/chats/send`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(message)
            })

            const data = await response.json()

            if (!response.ok){
                setError(data.message || "Failed to send message.")
                return
            }

            setMessage((prev) => ({...prev, message:""}))

            setLoading(false)
        } catch {
            setError("Could not connect to the server. Please try again.")
        }
    }

    async function fetchGroupDetails(serviceId){
        setLoadingDetails(true)
        setError(null)

        const response = await fetch(`${API_URL}/api/assignments/group/${serviceId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        })

        const data: Group[] = await response.json()

        if(!response.ok){
            setError("Failed to get group details")
        }

        setGroupDetails(data)
        setLoadingDetails(false)
    }

    return(
        <div className="flex flex-col gap-5 mx-auto p-4 sm:px-12 py-5">
            <Header variant="chats" />

            <div className="flex justify-center relative h-147 w-full overflow-hidden mx-auto">
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
                            onClick={() => {
                                setChosenService(s);
                                setMessage(prev => ({...prev, serviceId: s.serviceId}))
                            }}
                            >
                                <div className="flex flex-col text-left">
                                    <span>{s.serviceName}</span>
                                    <span className="text-zinc-300 font-normal">{format(new Date(s.date), 'd MMMM yyyy')}</span>
                                </div>
                                <span>{s.time}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* chat view */}
                <div className={`absolute flex flex-col bg-slate-800 w-full h-full 
                transition-transform duration-300 ease-in-out
                ${chosenService ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center py-3.5 px-2.5 bg-slate-700">
                        <div className="flex gap-1 items-center">
                            <ChevronLeftIcon
                            className="-ml-2 h-6.5 cursor-pointer hover:text-slate-600 transition-colors"
                            onClick={() => setChosenService(null)}
                            />
                            <div className="flex flex-col gap-0.5">
                                <button 
                                disabled={loadingDetails}
                                className="text-[13.5px] font-medium leading-none hover:text-zinc-300 disabled:text-zinc-300"
                                onClick={() => fetchGroupDetails(chosenService.serviceId)}
                                >
                                    {chosenService?.serviceName}
                                </button>
                                <h2 className="text-zinc-300 text-[10px] leading-none">
                                    {chosenService ? format(new Date(chosenService.date), 'd MMMM yyyy') : null}
                                    </h2>
                            </div>
                        </div>
                        <h3 className="text-[12px]">{chosenService?.time}</h3>
                    </div>

                    <div 
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="flex flex-col gap-2.5 w-full h-full overflow-y-auto py-2 px-2.5">
                        {chats?.map((c, index) => {
                            const currentDate = new Date(c.createdAt)
                            const prevDate = index > 0 ? new Date(chats[index-1].createdAt) : null
                            const showDateSeperator = 
                                !prevDate ||
                                currentDate.toDateString() !== prevDate.toDateString()
                            
                            return (
                                <React.Fragment key={c._id}>
                                    {showDateSeperator && (
                                        <div className="flex justify-center my-1">
                                            <span className="bg-zinc-900 rounded rounded-md text-[10.5px] px-2 font-medium">{format(currentDate, 'EEE, d MMMM')}</span>
                                        </div>
                                    )}
                                    <div className={`relative ${c.userId === userId._id ? "self-end bg-sky-700" : "self-start bg-zinc-800"} max-w-3/4 px-1.5 py-1 
                                    gap-2.5 items-end rounded rounded-lg`}>
                                        <span className={`${c.userId === userId._id ? "hidden" : ""}
                                        text-[12px] text-rose-300 font-semibold`}>{c.userName}</span>
                                        <div className="text-sm break-words whitespace-pre-wrap">
                                            {c.message}
                                            <span className="invisible inline-block text-[10px] ml-2.5 whitespace-nowrap">
                                                {format(new Date(c.createdAt), 'HH:mm')
                                            }</span>
                                        </div>
                                        <span className="absolute bottom-1 right-1.5 text-[10px] text-zinc-300 whitespace-nowrap select-none">
                                            {format(new Date(c.createdAt), 'HH:mm')}
                                        </span>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>

                    <div className="flex items-center py-2 gap-1.5 px-2.5 mt-auto bg-slate-700">
                        <textarea 
                        ref={textareaRef}
                        className="px-3 w-full bg-slate-700 border border-slate-600 focus:border-amber-400 outline-none
                        text-zinc-100 text-sm rounded-xl transition-colors resize-none max-h-25 overflow-y-auto" 
                        rows={1}
                        value={message.message}
                        onChange={handleChange("message")}
                        />
                        <button
                        onClick={() => handleSend()}
                        disabled={message.message === "" || loading}
                        className="flex items-center justify-center w-5.5 h-5.5 bg-green-600 rounded-xl text-zinc-950 hover:bg-green-950 disabled:bg-green-800"
                        >
                            <SendHorizontal size={15}/>
                        </button>
                    </div>
                    {error && (<span className="text-center text-sm text-red-500 py-0.5">{error}</span>)}
                </div>


                {/* group description view */}
                <div className={`absolute bg-slate-800 w-full h-full py-3.5 px-2.5
                transition-transform duration-300 ease-in-out overflow-y-auto
                ${groupDetails && chosenService ? 'translate-x-0' : 'translate-x-full'}`}>
                    <ChevronLeftIcon
                    className="-ml-2 h-6.5 cursor-pointer hover:text-slate-600 transition-colors"
                    onClick={() => setGroupDetails(null)}
                    />
                    <div className="flex flex-col gap-1 items-center">
                        <h1 className="font-semibold text-xl">{chosenService?.serviceName}</h1>
                        <h3 className="text-sm text-zinc-300">Group ⋅ {groupDetails?.length} members</h3>
                        <div className="flex flex-col w-83 mt-2 px-3 border rounded-lg">
                            {groupDetails?.map((g, index) => (
                                <div key={g.userId} className={`flex justify-between py-3 ${index < groupDetails.length-1 ? "border-b" : ""}`}>
                                    <div className="flex flex-col w-49">
                                        <span className="break-words">{g.userName}</span>
                                        <span className="text-sm text-zinc-300">{g.phoneNumber}</span>
                                    </div>
                                    <div className="flex flex-col w-29">
                                        {g.roleName?.map((e) => (
                                            <span className="break-words">{e}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}
