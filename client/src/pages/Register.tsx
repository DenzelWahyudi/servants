import { Header } from "../components/Header";
import { RegisterCard } from "../components/RegisterCard";

export function Register() {
    return(
        <div className="mx-auto px-12 py-5 flex flex-col gap-15 items-center">
            <Header variant="register" />
            <RegisterCard />
        </div>
    )
}
