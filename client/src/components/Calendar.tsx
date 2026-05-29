import {
    add,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isEqual,
    isSameMonth,
    isToday,
    parse,
    startOfDay,
    startOfToday,
    startOfWeek,
} from "date-fns"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { capitalizeFirstLetter } from "../utils/functions";
import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth";
import { Heading } from "./Heading";

interface Schedule {
    roleName: string
    serviceName: string
    date: Date
    time: string
}

export function Calendar(){

    const { token } = useAuth()
    const [schedule, setSchedule] = useState<Schedule[] | null>(null)
    const [roleInfo, setRoleInfo] = useState<Schedule | null>(null)

    useEffect(() => {
        async function fetchSchedule() {
            const response = await fetch(`/api/assignments/schedule`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            const data: Schedule[] = await response.json()
            setSchedule(Array.isArray(data) ? data : [])
        }
        if (token) {
            fetchSchedule()
        }
    }, [token])

    const today = startOfToday()
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    const colStartClasses = [
        "",
        "col-start-2",
        "col-start-3",
        "col-start-4",
        "col-start-5",
        "col-start-6",
        "col-start-7",
    ]

    const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyy"))
    const firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date())

    const daysInMonth = eachDayOfInterval({
        start: startOfWeek(firstDayOfMonth),
        end: endOfWeek(endOfMonth(firstDayOfMonth))
    })

    const getPrevMonth = (e: React.MouseEvent<SVGSVGElement>) => {
        e.preventDefault()
        const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 })
        setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"))
    }

    const getNextMonth = (e: React.MouseEvent<SVGSVGElement>) => {
        e.preventDefault()
        const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 })
        setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"))
    }

    return (
        <div className="flex justify-center">
            <div className="w-full h-[600px]">
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-2xl pl-2.5">
                        {format(firstDayOfMonth, "MMMM yyyy")}
                    </p>
                    <div className="flex items-center justify-evenly gap-5">
                        <ChevronLeftIcon
                        className="w-6 h-6 cursor-pointer hover:text-slate-600 transition-colors"
                        onClick={getPrevMonth}
                        />
                        <button 
                        className={`cursor-pointer hover:text-zinc-400 select-none ${currMonth === format(today, "MMM-yyyy") ? "text-indigo-300" : ""}`}
                        onClick={() => setCurrMonth(format(today, "MMM-yyyy"))}
                        >
                            Today
                        </button>
                        <ChevronRightIcon
                        className="w-6 h-6 cursor-pointer hover:text-slate-600 transition-colors"
                        onClick={getNextMonth}
                        />
                    </div>
                </div>
                <hr className="mt-5.5 mb-4"/>
                <div className="grid grid-cols-7 place-items-center">
                    {days.map((day, idx) => {
                        return (
                            <div key={idx}>
                                {capitalizeFirstLetter(day)}
                            </div>
                        )
                    })}
                </div>
                <div className="grid grid-cols-7 mt-3 items-center border-1 border-slate-600">
                    {daysInMonth.map((day, idx) => {
                        return (
                            <div key={idx} className={`${colStartClasses[getDay(day)]} border-r border-b border-slate-600 h-[130px]`}>
                                <p
                                className={`cursor-default flex items-center justify-center font-normal h-6 w-6 text-sm mt-1.5 ml-2 rounded-full ${
                                    isSameMonth(day, firstDayOfMonth) ? "text-zinc-100" : "text-zinc-500"
                                } ${ isToday(day) && "bg-indigo-500 text-white" }`}
                                >
                                    {format(day, "d")}
                                </p>
                                <p
                                className="mx-3 mt-1 text-sm"
                                >
                                    {schedule
                                    ?.filter((s) => isEqual(
                                        startOfDay(s.date),
                                        startOfDay(new Date(day))
                                    ))
                                    ?.map((s) => 
                                        <div key = {s.roleName} className="flex justify-between">
                                            <button
                                            onClick={() => setRoleInfo({
                                                roleName: s.roleName,
                                                serviceName: s.serviceName,
                                                date: s.date,
                                                time: s.time
                                            })}
                                            className="cursor-pointer hover:text-indigo-300"
                                            >
                                                {s.roleName.length > 14 ? s.roleName.slice(0, 12) + "..." : s.roleName}
                                            </button>
                                            <span className="text-zinc-400">
                                                {s.time.length > 5 ? s.time.slice(0, 5) : s.time}
                                            </span>
                                        </div>
                                        )
                                    }
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
            {roleInfo && (
                <div 
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setRoleInfo(null)}
                >
                    <div
                    onClick={(e) => e.stopPropagation()}
                    className="max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex flex-col bg-slate-800 rounded-lg w-110 p-4.5">
                            <div className="pb-2.5">
                                <Heading>Date: {format(roleInfo.date.toString(), 'dd MMMM yyyy')}</Heading>
                            </div>
                            <hr className="-mx-4.5 border-0 h-0.5 bg-amber-400"/>
                            <div className="flex flex-col gap-1 mt-2.5 text-lg">
                                <span>Service: {roleInfo.serviceName}</span>
                                <span>Role: {roleInfo.roleName}</span>
                                <span>Time: {roleInfo.time}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}