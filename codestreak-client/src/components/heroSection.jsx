"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { LoginForm } from "@/components/loginForm"; // Adjust path if needed
import { RegisterForm } from "@/components/RegisterForm";

export default function HeroSectionOne() {
  const [showLogin, setShowLogin] = useState(false);
  const [formType, setFormType] = useState("login");


  const toggleForm = (type) => {
    setFormType(type);
  };

  const closeModal = () => {
    setShowLogin(false);
    setFormType("login"); // reset to login on close if you want
  };


  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-4 py-10 dark:bg-black md:py-20">
      <Navbar onLoginClick={() => setShowLogin(true)} />

      {/* Side borders */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl flex flex-col items-center justify-center text-center">
        <h1 className="relative z-10 mx-auto max-w-4xl text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Track your daily study plan here".split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1, ease: "easeInOut" }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          With this web app you can track your progress easily for daily task here.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {/* <button 
          className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Explore Now
          </button>
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Contact Support
          </button> */}
        </motion.div>
      </div>

      {/* Login/Register Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-4">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-white dark:text-neutral-300"
            >
              ✕
            </button>

            {formType === "login" ? (
              <LoginForm toggleForm={toggleForm} className="bg-white dark:bg-black rounded-lg shadow-lg p-6" />
            ) : (
              <RegisterForm toggleForm={toggleForm} className="bg-white dark:bg-black rounded-lg shadow-lg p-6" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const Navbar = ({ onLoginClick }) => {
  return (
    <nav className="absolute top-0 left-0 z-20 flex w-full items-center justify-between border-b border-t border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-black">
      <div className="flex items-center gap-2">
        <div className="size-4 rounded-full bg-gradient-to-br from-blue-500 to-green-500" />
        <h1 className="text-base font-bold md:text-2xl font-mono">Code Streak</h1>
      </div>
      <button
        onClick={onLoginClick}
        className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        Login
      </button>
    </nav>
  );
};
