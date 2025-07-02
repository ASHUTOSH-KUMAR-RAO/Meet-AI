import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";

const Page = () => {
    return (
     <SignUpView/>
    );
}
 
export default Page;



// todo=> Jaab bhi humko route banana hota hai to hum us file ka name page hi rekhte hai because next js ke andar page hi hota hai

// ! Aur uske andar jo bhi content hoga wo page ke andar hi render hoga// Next.js ke andar page ka matlab hota hai ki wo ek route hai,kyuki page ek reserved file name hota hai jiska name hota hai page.tsx,aur haan hum hamesa page.tsx ko export default hi krte hai