type Service = {
    name: string
    date: string
    time: string
    roles: string
    status: "Fully Staffed" | "Roles Open"
}

const services: Service[] = [
    { name: "Sunday Morning Worship", date: "Aug 22", time: "9:00 AM", roles: "Ushers, Greeters, Nursery", status: "Fully Staffed" },
    { name: "Sunday Evening Prayer",  date: "Aug 29", time: "6:00 PM", roles: "Tech Crew, Nursery, Ushers", status: "Roles Open" },
    { name: "Midweek Service",        date: "Sep 5",  time: "7:00 PM", roles: "Ushers, Greeters, Nursery", status: "Fully Staffed" },
]

export function UpcomingServices(){
    return (
        <section className="bg-white py-4">
            <h2 className="text-3xl font-semibold text-slate-900 text-center mb-3">Upcoming Services</h2>
            <div className="rounded-lg overflow-hidden shadow-lg border border-zinc-200">
                <table className="text-xs w-full text-sm text-left text-zinc-300">
                    <thead className="text-zinc-950 border-amber-400 border-b-2 border-t-2">
                        <tr>
                            <th className="py-2 pl-3">Upcoming Service</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Roles Needed</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((s) => (
                            <tr key={s.name} className="border-b border-zinc-400 text-zinc-950">
                                <td className="py-3 pl-3 font-medium">{s.name}</td>
                                <td>{s.date}</td>
                                <td>{s.time}</td>
                                <td>{s.roles}</td>
                                <td>
                                    <span className={`px-3 py-0.5 rounded font-semibold ${s.status === "Fully Staffed"
                                    ? "bg-green-200"
                                    : "bg-red-200"
                                    }`}>
                                        {s.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
