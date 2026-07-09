import { verifyAdminToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const AdminPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;


  if (!token) {
    redirect("/login");
  }

  const payload = await verifyAdminToken(token);

  if (!payload) redirect("/login");

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <p className="mt-2">Welcome back sir.</p>
    </main>
  )
}

export default AdminPage 
