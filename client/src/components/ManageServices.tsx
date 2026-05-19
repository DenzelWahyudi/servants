
import { ButtonLink } from "./ButtonLink";
import { Heading } from "./Heading";
import { UpcomingServicesAdmin } from "./UpcomingServicesAdmin";

export function ManageServices(){
    return (
        <div className="flex flex-col bg-zinc-100/2 px-10 w-full h-full">
            <div className="flex justify-between py-7 items-center">
                <Heading>Manage Services</Heading>
                <div className="w-47">
                    <ButtonLink to='/admin/service/create'variant="card" className="text-lg text-semibold py-1.5 rounded-lg text-slate-900">+ Add New Service</ButtonLink>
                </div>
            </div>
            <div className="rounded-lg overflow-hidden">
                <UpcomingServicesAdmin />
            </div>
        </div>
    )
}