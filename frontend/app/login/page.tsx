"use client";

import LoginForm from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {isLogin ? (
          <LoginForm onClose={handleClose} onToggle={handleToggle} />
        ) : (
          <RegisterForm onClose={handleClose} onToggle={handleToggle} />
        )}
      </div>
    </div>
  )
}
