import type { ComponentProps } from 'react'
import logo from '../assets/logo.png'
import { Button } from './Button'
import { ButtonLink } from './ButtonLink'

type Variant = "home" | "schedule" | "openings" | "register"

type HeaderProps = {
    variant?: Variant
} & ComponentProps<"header">

export function Header({
    variant = "home",
    ...props
}: HeaderProps) {
    return (
        <header {...props} className="flex items-center justify-between w-full">
            <div className="flex gap-3 items-center">
                <img src={logo} alt="Servants Logo" className="w-7.5 h-10" />
                <h1 className="text-2xl font-bold">Servants</h1>
            </div>
            {getVariantStyles(variant)}
        </header>
    )
}

function getVariantStyles(variant: Variant) {
    switch (variant) {
        case "home":
            return (
                <div className="flex gap-6 items-center">
                    <Button variant='secondary'>Home</Button>
                    <ButtonLink to="/schedule" variant='secondary'>Schedule</ButtonLink>
                    <ButtonLink to="/openings" variant='secondary'>Openings</ButtonLink>
                    <ButtonLink to="/register" variant='primary'>Logout</ButtonLink>
                </div>
            )
        case "schedule":
            return (
                <div className="flex gap-6 items-center">
                    <ButtonLink to="/" variant='secondary'>Home</ButtonLink>
                    <Button variant='secondary'>Schedule</Button>
                    <ButtonLink to="/openings" variant='secondary'>Openings</ButtonLink>
                    <ButtonLink to="/register" variant='primary'>Logout</ButtonLink>
                </div>
            )
        case "openings":
            return (
                <div className="flex gap-6 items-center">
                    <ButtonLink to="/" variant='secondary'>Home</ButtonLink>
                    <ButtonLink to="/schedule" variant='secondary'>Schedule</ButtonLink>
                    <Button variant='secondary'>Openings</Button>
                    <ButtonLink to="/register" variant='primary'>Logout</ButtonLink>
                </div>
            )
        case "register":
            return (
                <div className="flex gap-6 items-center">
                    <ButtonLink to="/login" variant='primary'>Login</ButtonLink>
                </div>
            )
        default:
            throw new Error(`Invalid variant: ${variant satisfies never}`)
    }
}
