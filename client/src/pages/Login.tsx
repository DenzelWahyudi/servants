import { Header } from "../components/Header";
import { LoginCard } from "../components/LoginCard";

export function Login() {
    return(
        <div className="mx-auto px-4 sm:px-12 py-5 flex flex-col gap-7 sm:gap-15 items-center">
            <Header variant="login" />
            <LoginCard />
        </div>
    )
}
