import { Header } from "../components/Header";
import { LoginCardAdmin } from "../components/LoginCardAdmin";

export function LoginAdmin() {
    return(
        <div className="mx-auto px-12 py-5 flex flex-col gap-15 items-center">
            <Header variant="loginadmin" />
            <LoginCardAdmin />
        </div>
    )
}
