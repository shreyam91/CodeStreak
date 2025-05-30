import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthForm() {
  const [formType, setFormType] = useState("login");

  return (
    <div className="max-w-md mx-auto p-4">
      {formType === "login" ? (
        <LoginForm toggleForm={setFormType} />
      ) : (
        <RegisterForm toggleForm={setFormType} />
      )}
    </div>
  );
}
