import { verifyAdminToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminContentManager from "./components/AdminContentManager";


const AdminPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;


  if (!token) {
    redirect("/login");
  }

  const payload = await verifyAdminToken(token);

  if (!payload) redirect("/login");

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-theme-text">Admin Panel</h1>
        <p className="mt-2 text-theme-muted">Manage posts, content files, and CV uploads.</p>
      </div>
      <AdminContentManager />
    </main>
  )
}

export default AdminPage 
