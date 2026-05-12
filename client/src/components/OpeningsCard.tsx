import { ButtonLink } from "./ButtonLink"

type OpeningsCardProp = {
    serviceName: string,
    date: string,
    time: string,
    role: string,
}

export function OpeningsCard({ serviceName, date, time, role }: OpeningsCardProp){
    return (
        <div className="flex flex-col gap-3  bg-zinc-100  text-slate-900 w-41 h-52 rounded-lg p-3.5">
            <h2 className="font-semibold">{ serviceName }</h2>
            <div className="flex flex-col gap-1">
                <h2>{ date }</h2>
                <h2>{ time }</h2>
            </div>
            <h2 className="font-semibold">{ role }</h2>
            <div className="flex justify-center mt-auto">
                <ButtonLink to="/schedule" variant="card" className="text-sm">Sign Up</ButtonLink>
            </div>
        </div>
    )
}