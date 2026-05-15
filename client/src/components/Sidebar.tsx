import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";

export function Sidebar(){
    return (
        <div className="flex flex-col gap-2 bg-zinc-100 p-3.5 pt-7 items-center h-full">
            <h2 className="flex text-blue-950 text-lg font-normal rounded-lg pl-4 justify-start w-full">
                <div className="flex gap-2">
                    <span>🏠︎</span>
                    <span>Menu</span>
                </div></h2>
            <Button variant="sidebar">
                <div className="flex gap-2">
                    <span>🛠️</span>
                    <span>Services</span>
                </div>
            </Button>
            <ButtonLink to="..." variant="sidebar">
                <div className="flex gap-2">
                    <span>👤</span>
                    <span>Roles</span>
                </div>
            </ButtonLink>
        </div>
    )
}
