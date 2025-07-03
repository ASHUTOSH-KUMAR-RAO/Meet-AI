
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const HomeView = () => {
    const router = useRouter()
  const { data: session } = authClient.useSession();
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold">Please sign in to continue</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        Welcome back, {session.user.name}!
      </h1>
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        onClick={() => authClient.signOut({fetchOptions:{onSuccess:() => router.push('/sign-in')}})}
      >
        Sign Out
      </button>
    </div>
  );
};

