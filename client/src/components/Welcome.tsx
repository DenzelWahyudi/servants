import { StatsCard } from "./StatsCard";
import bell from '../assets/icons/bell.svg'
import calendar from '../assets/icons/calendar.svg'
import user from '../assets/icons/user.svg'
import { useEffect, useState } from 'react'


export function Welcome(){

    const [userName, setUserName] = useState<string | null>(null)

    useEffect(() => {
        fetch("/api/users/name/6a033aa6a11cd7b67faaccba").then(
            response => response.json()
        ).then(
            (data: string) => {
                setUserName(data)
            }
        )
    }, [])

    return (
        <header className="flex flex-col gap-5 items-center justify-center w-full">
            <div className="flex gap-2 items-center">
                <h1 className="text-4xl font-bold">Home</h1>
                <h1 className="text-4xl font-semibold"> - </h1>
                <h1 className="text-4xl font-bold text-amber-400">Welcome Back, {userName ?? '...'}</h1>
            </div>
            <div className="flex gap-4 items-center">
                <StatsCard icon={<img src={bell} width={40} />} title="... Service Reminders Sent Today" buttonLabel="View Schedule" ></StatsCard>
                <StatsCard icon={<img src={user} width={40} />} title="Pending Sign-ups" buttonLabel="Review Now" ></StatsCard>
                <StatsCard icon={<img src={calendar} width={40} />} title="Sunday Staffing: ..." buttonLabel="Fill Reamining Roles" ></StatsCard>
            </div>
        </header>
    )
}
