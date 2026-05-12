type FooterProps = {
    churchName: string
    location: string
    phone: string
    email: string
}

export function Footer({ churchName, location, phone, email }: FooterProps){
    return (
        <div className="flex gap-30">
            <div className="flex flex-col gap-1">
                <h3 className="text-zinc-300 font-medium">{churchName}</h3>
                <h4 className="text-sm text-zinc-400">{location}</h4>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-zinc-300 font-medium">Contact us</h3>
                <h4 className="text-sm text-zinc-400">{phone}</h4>
                <h4 className="text-sm text-zinc-400">{email}</h4>
            </div>
        </div>
    )
}