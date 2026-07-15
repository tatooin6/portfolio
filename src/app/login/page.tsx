import { verifyAdminToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./components/LoginForm";

const LoginPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (token) {
    const payload = await verifyAdminToken(token);

    if (payload) {
      redirect("/admin");
    }
  }

  return (
    <main className="flex w-full justify-center px-4 pt-8 md:min-h-[70vh] md:items-center md:pt-0">
      <LoginForm />
    </main>
  );
};

export default LoginPage;
