import { Button } from "./Button"

type StatsCardProps = {
    icon: React.ReactNode
    title: string
    buttonLabel: string
    onButtonClick?: () => void
}

export function StatsCard({ icon, title, buttonLabel }: StatsCardProps) {
    return (
        <div className="bg-zinc-100 rounded-lg p-3 flex flex-col w-50 h-35">
            <div>{icon}</div>
            <h3 className="text-slate-900 font-semibold">{title}</h3>
            <Button variant="card">
                {buttonLabel}
            </Button>
        </div>
    )
}
