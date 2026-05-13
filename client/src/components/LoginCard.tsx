import { ButtonLink } from "./ButtonLink";
import { Form } from "./Form";
import { Heading } from "./Heading";

export function LoginCard(){
    return (
        <div className="flex flex-col gap-1.5 p-7 bg-slate-800 items-center rounded-xl w-100 h-112">
            <div className="mt-2">
                <Heading>Login</Heading>
            </div>
            <div className="mt-4 mb-4">
                <h2 className="text-zinc-400 text-lg">No one comes to help, no one comes to contribute, everybody comes to learn and to serve - Stephen Tong
                </h2>
            </div>
            <Form label="Phone number" />
            <Form label="Password" />
            <div className="w-full flex justify-end">
                <ButtonLink to="/" variant="secondary" className="text-amber-400 text-sm">Forgot Password?</ButtonLink>
            </div>
            <ButtonLink to="/" variant="card" className="font-semibold text-base py-1.5 rounded-lg">Login</ButtonLink>
        </div>
    )
}
