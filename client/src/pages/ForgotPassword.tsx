import { Header } from "../components/Header.tsx";
import {useState} from "react";
import {API_URL} from "../api.ts";

interface Form {
    phoneNumber: string
    new_password: string
    confirm_new_password: string
    code: string
}

export function ForgotPassword(){
    const [form, setForm] = useState<Form | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleForgotPasswordSubmit(){
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_URL}/api/users/forgot-password`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            const data = response.json()

            if (!response.ok){
                setError(data.message || "Failed to change password.")
                return
            }
        } catch {
            setError("Could not connect to the server. Please try again.")
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="mx-auto px-4 sm:px-12 pt-5 pb-10 flex flex-col gap-8 sm:gap-12 items-center min-h-screen select-none">
            <Header variant="register" />
        </div>
    )
}