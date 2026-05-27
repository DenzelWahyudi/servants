import { useState } from "react"
import { SignUpCard } from "./SignUpCard"

type OpeningsCardProp = {
    serviceName: string,
    date: string,
    time: string,
    role: string,
    roleId: string,
    userId: string
    onSave: () => void
}

interface SignUp {
    roleId: string
    serviceName: string
    roleName: string
}


export function OpeningsCard({ serviceName, date, time, role, roleId, userId, onSave }: OpeningsCardProp){

    const [signUpData, setSignUpData] = useState<SignUp | null>(null)

    return (
        <div className="flex flex-col gap-3  bg-zinc-100  text-slate-900 w-55 h-52 rounded-lg p-3.5">
            <h2 className="font-semibold">{ serviceName }</h2>
            <div className="flex flex-col gap-1">
                <h2>{ date }</h2>
                <h2>{ time }</h2>
            </div>
            <h2 className="font-semibold">{ role.length > 17 ? role.slice(0, 17) + "...": role}</h2>
            <div className="flex justify-center mt-auto">
                <button
                onClick={() => setSignUpData({
                    roleId,
                    serviceName,
                    roleName: role
                })}
                className="bg-amber-400 text-blue-950 text-sm font-medium py-1 px-2 rounded w-full 
                mt-auto hover:bg-amber-500 flex justify-center transition-colors rounded-lg px-2 py-1"
                >
                    Sign Up
                </button>
            </div>
            {signUpData && (
                <div 
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setSignUpData(null)}
                >
                    <div
                    onClick={(e) => e.stopPropagation()}
                    className="max-h-[90vh] overflow-y-auto"
                    >
                        <SignUpCard 
                        userId={userId}
                        roleId={signUpData.roleId}
                        serviceName={signUpData.serviceName}
                        roleName={signUpData.roleName}
                        date={date}
                        onClose={() => {
                            setSignUpData(null)
                        }}
                        onSave={() => { 
                            onSave() 
                            setSignUpData(null)
                        }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
