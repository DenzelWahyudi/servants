import { ButtonLink } from "./ButtonLink"

type StatsCardProps = {
    icon: React.ReactNode
    title: string
    buttonLabel: string
    linkTo?: string
    onClick?: () => void
}

export function StatsCard({ icon, title, buttonLabel, linkTo, onClick }: StatsCardProps) {
    return (
        <div className="bg-zinc-100 rounded-lg p-3 flex flex-col w-50 h-35">
            <div>{icon}</div>
            <h3 className="text-slate-900 font-semibold">{title}</h3>
            {
                linkTo ? 
                    <ButtonLink to={linkTo} variant="card">
                        {buttonLabel}
                    </ButtonLink>
                :
                    <button
                    onClick={() => onClick()}
                    className="bg-amber-400 text-blue-950 text-xs font-medium py-1 px-2 rounded w-full mt-auto hover:bg-amber-500 flex justify-center
                    transition-colors rounded-lg px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        {buttonLabel}
                    </button>
            }
        </div>
    )
}
