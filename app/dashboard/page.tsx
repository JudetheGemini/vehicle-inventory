"use client";
import { withAuthenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";

export default function Dashboard() {
  const router = useRouter(); // for client-side navigation
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard {user?.username} </p>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
}
