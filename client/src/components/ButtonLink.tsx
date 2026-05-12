import { twMerge } from "tailwind-merge"
import { Link, type LinkProps } from "react-router-dom"

type Variant = "primary" | "secondary" | "card"

type ButtonLinkProps = {
    variant?: Variant
} & LinkProps

export function ButtonLink({
    variant = "primary",
    className,
    ...props
}: ButtonLinkProps){
    return (
        <Link
            {...props}
            className={twMerge(
                "transition-colors rounded-lg px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed",
                getVariantStyles(variant),
                className,
            )}
        />
    )
}

function getVariantStyles(variant: Variant) {
    switch (variant) {
        case "primary":
            return "bg-slate-900 hover:bg-amber-400 border border-amber-400 py-1.5 px-4"
        case "secondary":
            return "hover:text-amber-400"
        case "card":
            return "bg-amber-400 text-blue-950 text-xs font-medium py-1 px-2 rounded w-full mt-auto hover:bg-amber-500 flex justify-center"
        default:
            throw new Error(`Invalid variant: ${variant satisfies never}`)
    }
}
