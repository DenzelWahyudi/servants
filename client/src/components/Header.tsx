import { useState, type ComponentProps } from 'react'
import logo from '../assets/logo.png'
import { Button } from './Button'
import { ButtonLink } from './ButtonLink'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

type Variant = "home" | "schedule" | "openings" | "register" | "login" | "registeradmin" | "loginadmin"

type HeaderProps = {
    variant?: Variant
} & ComponentProps<"header">

export function Header({
    variant = "home",
    ...props
}: HeaderProps) {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);

    async function handleLogout(){
        setLoading(true);

        try {
            logout();
            navigate("/login");
        } finally {
            setLoading(false);
        }
    }
    return (
        <header {...props} className="flex items-center justify-between w-full">
            <div className="flex gap-3 items-center">
                <img src={logo} alt="Servants Logo" className="w-7.5 h-10" />
                <h1 className="text-2xl font-bold">Servants</h1>
            </div>
            {getVariantStyles(variant, handleLogout, loading)}
        </header>
    )
}

function getVariantStyles(variant: Variant, onLogout: () => void, isLoading: boolean) {
    switch (variant) {
        case "home":
            return (
                <div className="flex gap-6 items-center">
                    <Button variant='secondary'>Home</Button>
                    <ButtonLink to="/schedule" variant='secondary'>Schedule</ButtonLink>
                    <ButtonLink to="/openings" variant='secondary'>Openings</ButtonLink>
                    <button
                    onClick={onLogout}
                    disabled={isLoading}
                    className="bg-slate-900 hover:bg-amber-400 border border-amber-400 py-1.5 px-4 transition-colors rounded-lg px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Logging out..." : "Logout"}
                    </button>
                </div>
            )
        case "schedule":
            return (
                <div className="flex gap-6 items-center">
                    <ButtonLink to="/" variant='secondary'>Home</ButtonLink>
                    <Button variant='secondary'>Schedule</Button>
                    <ButtonLink to="/openings" variant='secondary'>Openings</ButtonLink>
                    <button
                    onClick={onLogout}
                    disabled={isLoading}
                    className="bg-slate-900 hover:bg-amber-400 border border-amber-400 py-1.5 px-4 transition-colors rounded-lg px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Logging out..." : "Logout"}
                    </button>
                </div>
            )
        case "openings":
            return (
                <div className="flex gap-6 items-center">
                    <ButtonLink to="/" variant='secondary'>Home</ButtonLink>
                    <ButtonLink to="/schedule" variant='secondary'>Schedule</ButtonLink>
                    <Button variant='secondary'>Openings</Button>
                    <button
                    onClick={onLogout}
                    disabled={isLoading}
                    className="bg-slate-900 hover:bg-amber-400 border border-amber-400 py-1.5 px-4 transition-colors rounded-lg px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Logging out..." : "Logout"}
                    </button>
                </div>
            )
        case "register":
            return (
                <div className="flex gap-6 items-center">
                    <ButtonLink to="/login" variant='primary'>Login</ButtonLink>
                </div>
            )
        case "login":
            return (
                <div className="flex gap-6 items-center">
                    <ButtonLink to="/register" variant='primary'>Register</ButtonLink>
                </div>
            )
        case "registeradmin":
            return (
                <div className="flex gap-6 items-center">
                    <ButtonLink to="/admin/login" variant='primary'>Login</ButtonLink>
                </div>
            )
        case "loginadmin":
            return (
                <div className="flex gap-6 items-center">
                    <ButtonLink to="/admin/register" variant='primary'>Register</ButtonLink>
                </div>
            )
        default:
            throw new Error(`Invalid variant: ${variant satisfies never}`)
    }
}
