import { verifyAdminToken } from "@/lib/auth";
import { cookies } from "next/headers";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  const isLoggedIn = token ? Boolean(await verifyAdminToken(token)) : false;

  return (
    <NavbarClient isLoggedIn={isLoggedIn} />
  )
}

export default Navbar
