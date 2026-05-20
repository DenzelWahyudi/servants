import { Header } from "../components/Header";
import { ManageRoles } from "../components/ManageRoles";
import { Sidebar } from "../components/Sidebar";

export function AdminRoles() {
  return (
    <div className="flex flex-col h-screen">
      <div className="px-6.5 py-4">
        <Header variant="admin"/>
      </div>
      <div className="flex flex-1 min-h-0">
        <Sidebar variant="roles" />
        <ManageRoles />
      </div>
    </div>
  )
}
