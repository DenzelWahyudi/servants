import { Heading } from "./Heading";
import { RolesCard } from "./RolesCard";

export function ManageRoles(){
    return (
        <div className="flex flex-col bg-zinc-100/2 px-10 w-full h-full">
            <div className="flex justify-between py-7 items-center">
                <Heading>Manage Roles</Heading>
            </div>
            <div className="rounded-lg overflow-hidden">
                <RolesCard serviceId="6a0d0356116829606ed1c6f6" />
            </div>
        </div>
    )
}