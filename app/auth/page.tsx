"use client";
import { withAuthenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

function Auth() {
  const router = useRouter();

  const goToDashboard = () => {
    router.push("/dashboard");
  };
  goToDashboard();

  return null; // return loader?
}

export default withAuthenticator(Auth);
