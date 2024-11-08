"use client";

import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SignOutBtn = () => {
  const router = useRouter();
  const [isSignedOut, setIsSignedOut] = useState(false);
  useEffect(() => {
    if (isSignedOut) {
      router.refresh();
      router.push("/auth/signout");
    }
  }, [isSignedOut, router]);
  const signOut = () => {
    setIsSignedOut(true);
  };

  return (
    <div>
      <Button variant="ghost" size="icon" onClick={signOut}>
        <LogOut className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      </Button>
    </div>
  );
};

export default SignOutBtn;
