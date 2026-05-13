import { ButtonLink } from "./ButtonLink";
import { Form } from "./Form";
import { Heading } from "./Heading";

export function RegisterCard(){
    return (
        <div className="flex flex-col gap-1.5 p-7 bg-slate-800 items-center rounded-xl w-100 h-146">
            <div className="mt-2">
                <Heading>Create Account</Heading>
            </div>
            <div className="mb-4">
                <h2 className="text-zinc-400 text-lg">Join the servants team</h2>
            </div>
            <Form label="Full Name" />
            <Form label="Email" />
            <Form label="Phone Number" />
            <Form label="Password" />
            <Form label="Confirm Password" />
            <ButtonLink to="/login" variant="card" className="font-semibold text-base py-1.5 rounded-lg">Register</ButtonLink>
            <div className="flex items-center mt-1">
                <span className="text-zinc-300 text-sm">Already have an account?</span>
                <ButtonLink to='/login' variant="secondary" className="text-amber-400 text-sm">Login</ButtonLink>
            </div>
        </div>
    )
}
