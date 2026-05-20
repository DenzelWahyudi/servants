import { Heading } from "./Heading"

type AssignRoleCardProps = {
    roleId: string
    serviceName: string
    roleName: string
    onClose: () => void
}

export function AssignRoleCard({ roleId, serviceName, roleName, onClose }: AssignRoleCardProps){
    return (
        <div className="flex flex-col gap-2 bg-slate-900 rounded-lg p-4.5 w-110">
            <div className="pb-2.5">
                <Heading>Assign Role</Heading>
            </div>
            <hr className="-mx-4.5 border-0 h-0.5 bg-amber-400"/>
            <div className="flex flex-col gap-1">
                <h3 className="text-sm text-zinc-100 font-light">Service</h3>
                <span className="text-base text-left p-1 pl-2 border border-zinc-600 rounded w-full">
                    {serviceName}
                </span>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-sm text-zinc-100 font-light">Role</h3>
                <span className="text-base text-left p-1 pl-2 border border-zinc-600 rounded w-full">
                    {roleName}
                </span>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-sm text-zinc-100 font-light">Assign To</h3>
                <span className="text-base text-left p-1 pl-2 border border-zinc-600 rounded w-full">
                    {roleId}
                </span>
            </div>
        </div>
    )
}