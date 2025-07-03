import { auth } from "@/lib/auth";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect("/");
  }
  return <SignInView />;
};

export default Page;

// Jaab bhi humko route banana hota hai to hum us file ka name page hi rekhte hai because next js ke andar page hi hota hai
// ! Aur uske andar jo bhi content hoga wo page ke andar hi render hoga// Next.js ke andar page ka matlab hota hai ki wo ek route hai,kyuki page ek reserved file name hota hai jiska name hota hai page.tsx,aur haan hum hamesa page.tsx ko export default hi krte hai
