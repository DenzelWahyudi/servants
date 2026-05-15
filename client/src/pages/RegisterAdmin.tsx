import { Header } from "../components/Header";
import { RegisterCardAdmin } from "../components/RegisterCardAdmin";

export function RegisterAdmin() {
    return(
        <div className="mx-auto px-12 py-5 flex flex-col gap-15 items-center">
            <Header variant="registeradmin" />
            <RegisterCardAdmin />
        </div>
    )
}
