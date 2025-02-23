"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Checkbox } from "./ui/checkbox";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export default function SignupFormDemo() {
  const router = useRouter();
  const [role, setRole] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select whether you are a Teacher or Student.");
      return;
    }
    const formdata={
      firstname:e.target.firstname.value,
      lastname:e.target.lastname.value,
      email:e.target.email.value,
      password:e.target.password.value,
      roll:e.target.roll.value,
      role:role
    };
    try{
      const res= await fetch('/api/signup',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formdata)
      })
      const data=await res.json(res);
      router.push("/dashboard");
    }
    catch(e){
      console.log("some error"+e);
    }
    console.log("Form submitted with role:", role);
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Deep Grade
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to Deep Grade to make grading answer sheets easy.
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        {/* Role Selection */}
        <div className="mb-4">
          <Label className="mb-2">Are you a:</Label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="teacher"
                className="hidden"
                onChange={() => setRole("Teacher")}
              />
              <span className={`p-2 rounded-md ${role === "Teacher" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                Teacher
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="student"
                className="hidden"
                onChange={() => setRole("Student")}
              />
              <span className={`p-2 rounded-md ${role === "Student" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                Student
              </span>
            </label>
            {"Student"==role?
            <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Roll number</Label>
            <Input id="roll" placeholder="projectmayhem@fc.com" type="text" />
          </LabelInputContainer>
            :<></>}
          </div>
        </div>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
);
