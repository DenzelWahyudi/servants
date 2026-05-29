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

export function Home() {

	const [userName, setUserName] = useState<string | null>(null)
	const [schedule, setSchedule] = useState<Schedule[] | null>(null)
	const [roles, setRoles] = useState<Role[] | null>(null)
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
				<StatsCard linkTo="/..." icon={<img src={user} width={40} />} title="Pending Sign-ups" buttonLabel="Review Now" ></StatsCard>
				<StatsCard linkTo="/openings" icon={<img src={calendar} width={40} />} title={`Open Recruitment: ${openRoles}`} buttonLabel="Fill Remaining Roles" ></StatsCard>
			</div>
		</header>

		<div className="-mx-12 -my-8 bg-white px-12 pb-10 min-h-90">
				<UpcomingServices />
		</div>
		<Footer />
		</div>
	)
}
