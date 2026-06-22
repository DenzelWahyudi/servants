import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { ButtonLink } from "../components/ButtonLink";
import { Form } from "../components/Form";
import { Heading } from "../components/Heading";
import React, { useState } from "react";
import { API_URL } from "../api"

export function RegisterAdmin() {
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirm_password: "",
        role: "admin"
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    function handleChange(field: keyof typeof formData){
        return (e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({ ...prev, [field]: e.target.value}))
    }

    async function handleRegister(){
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Registration failed. Please try again.");
                return;
            }

            navigate("/admin/login");

        } catch {
            setError("Could not connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="mx-auto px-12 py-5 flex flex-col gap-15 items-center">
            <Header variant="registeradmin" />
            <div className="flex flex-col gap-1.5 p-7 bg-slate-800 items-center rounded-xl w-100 h-146">
                <div className="mt-2">
                    <Heading>Create Account</Heading>
                </div>
                <div className="mb-4">
                    <h2 className="text-zinc-400 text-lg">Join the servants team</h2>
                </div>

                <Form label="Full Name"         value={formData.name}               onChange={handleChange("name")} />
                <Form label="Email"             value={formData.email}              onChange={handleChange("email")} />
                <Form label="Phone Number"      value={formData.phoneNumber}        onChange={handleChange("phoneNumber")} />
                <Form label="Password"          value={formData.password}           onChange={handleChange("password")} />
                <Form label="Confirm Password"  value={formData.confirm_password}   onChange={handleChange("confirm_password")} />

                {error && (
                    <p className="text-red-400 text-sm text-center w-full">{error}</p>
                )}

                <button
                onClick={handleRegister}
                disabled={loading}
                className="bg-amber-400 text-blue-950 text-base font-semibold py-1.5 rounded-lg w-full mt-auto hover:bg-amber-500 flex justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <div className="flex items-center mt-1">
                    <span className="text-zinc-300 text-sm">Already have an account?</span>
                    <ButtonLink to='/admin/login' variant="secondary" className="text-amber-400 text-sm">Login</ButtonLink>
                </div>
            </div>
        </div>
    )
}
