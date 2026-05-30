import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { UpcomingServices } from "../components/UpcomingServices"
import { StatsCard } from "../components/StatsCard"
import bell from '../assets/icons/bell.svg'
import calendar from '../assets/icons/calendar.svg'
import user from '../assets/icons/user.svg'
import { useEffect, useState } from 'react'
import { useAuth } from "../hooks/useAuth"
import { startOfToday, isEqual, startOfDay } from "date-fns"

interface Schedule {
    roleName: string
    serviceName: string
    date: Date
    time: string
}

interface Role {
    spotsTotal: number
    spotsFilled: number
}

interface Assignment {
	_id: string
	serviceName: string
	roleName: string
	date: string
	time: string
	status: string
}

export function Home() {

	const [userName, setUserName] = useState<string | null>(null)
	const [schedule, setSchedule] = useState<Schedule[] | null>(null)
	const [roles, setRoles] = useState<Role[] | null>(null)
	const [assignments, setAssignments] = useState<Assignment[] | null>(null)
	const { token } = useAuth();

	const todayServiceCount = schedule?.filter((s) => {
		const serviceDate = startOfDay(new Date(s.date))
		return isEqual(serviceDate, startOfToday())
	}).length ?? 0

	const openRoles = roles?.filter((r) => {
		if (r.spotsFilled < r.spotsTotal) return true
	}).length ?? null

	useEffect(() => {
		async function fetchUser() {
			const response = await fetch('/api/users/name', {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			})
			const data = await response.json()
			setUserName(data)
		}
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
		async function fetchRoles() {
			const roles = await fetch('/api/roles', {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			const rolesData = await roles.json()
			setRoles(rolesData)
		}
		if (token) {
			fetchUser()
			fetchSchedule()
		}
		fetchRoles()
	}, [token])

	async function getAssignments(){
		const response = await fetch(`/api/assignments/all`, {
			method: "GET",
			headers: { 
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			}
		})
		const data: Assignment[] = await response.json()
		setAssignments(data)
	}

	return (
		<div className="mx-auto px-12 py-5 flex flex-col gap-15">
			<Header variant="home"/>

			<header className="flex flex-col gap-5 items-center justify-center w-full">
				<div className="flex gap-2 items-center">
					<h1 className="text-4xl font-bold">Home</h1>
					<h1 className="text-4xl font-semibold"> - </h1>
					<h1 className="text-4xl font-bold text-amber-400">Welcome Back, {userName ?? '...'}</h1>
				</div>
				<div className="flex gap-4 items-center">
					<StatsCard linkTo="/schedule" icon={<img src={bell} width={40} />} title={`${todayServiceCount} Service Reminders Sent Today`} buttonLabel="View Schedule" ></StatsCard>
					<StatsCard onClick={getAssignments} icon={<img src={user} width={40} />} title="Pending Sign-ups" buttonLabel="Review Now" ></StatsCard>
					<StatsCard linkTo="/openings" icon={<img src={calendar} width={40} />} title={`Open Recruitment: ${openRoles}`} buttonLabel="Fill Remaining Roles" ></StatsCard>
				</div>
			</header>

			<div className="-mx-12 -my-8 bg-white px-12 pb-10 min-h-90">
					<UpcomingServices />
			</div>
			<Footer />
			{assignments && (
				<div
				className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setAssignments(null)}
				>
					<div
					onClick={(e) => e.stopPropagation()}
					className="max-h-[90vh] overflow-y-auto"
					>
						<div className="rounded-lg overflow-hidden shadow-lg border border-slate-900">
                <table className="w-160 text-sm text-left text-zinc-200 bg-slate-800">
                    <thead className="text-zinc-100 border-amber-400 border-b-2 border-t-2">
                        <tr>
                            <th className="py-2 px-3">Service</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th className="pl-2">Roles</th>
                            <th className="text-center pr-2.5">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments?.map((a) => (
                            <tr key={a._id} className="border-b border-zinc-500 text-zinc-100">
                                <td className="py-3 px-3 font-medium">{a.serviceName}</td>
                                <td>{new Date(a.date).toLocaleDateString("en-GB", { year:"numeric", month: "long", day: "numeric",})}</td>
                                <td>{a.time}</td>
                                <td className="px-2 w-[100px] break-words">{a.roleName}</td>
                                <td className="text-center">
                                    <span className={`px-3 py-0.5 rounded font-semibold text-zinc-950 inline-block w-23 ${
										a.status === "confirmed"
                                    	? "bg-green-200" :
										a.status === "pending" ?
										"bg-zinc-300"
                                    	: "bg-red-200"
                                    }`}>
                                        {a.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
					</div>
				</div>
			)}
		</div>
	)
}
