'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { toast } from 'react-toastify';
import { ChatContext } from "../context/context";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const router = useRouter();
    const emailRegex = /[a-zA-Z0-9+-_.%]+@[^\s@]+\.[a-z]{2,}$/;

    const context = useContext(ChatContext);

    const handleSubmit = (e) => {
        e.preventDefault()
        const emailVal = emailRef.current.value.trim();
        const passwordVal = passwordRef.current.value.trim();

        if (!emailVal) return toast.warning("Enter email!!")
        if (!emailRegex.test(emailVal)) return toast.warning("Invalid email!!")
        if (emailVal.includes(" ")) return toast.warning("Email should not contain whitespaces!!")
        if (!passwordVal) return toast.warning("Enter password!!")
        if (passwordVal.includes(" ")) return toast.warning("Password should not contain whitespaces!!")
        if (passwordVal.length < 6) return toast.warning("Password length must be atleast 6 characters long!!")

        if (
            emailVal.length > 0 &&
            passwordVal.length > 5
        ) {
            fetch("https://queryflowai-backend.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailVal, password: passwordVal })
            })
                .then(response => response.json())
                .then(data => {
                    if (data && data.success && data.jwtToken) {
                        localStorage.setItem("token", data.jwtToken);
                        context.setUserData({
                            name: data.name,
                            email: data.email,
                            loggedAt: Date.now()
                        });
                        context.setIsLoggedIn(true);
                        emailRef.current.value = "";
                        passwordRef.current.value = "";
                        toast.success("Login successful!");
                        setTimeout(() => {
                            router.push("/");
                        }, 500);
                    }
                })
                .catch(error => {
                    toast.error(data.message || "login failed!");
                    console.error("failed to post:", error)
                });
        }
    }

    return (
        <>
            <div className='h-screen w-full bg-zinc-200 fixed text-black'>
                <form className='p-2 w-[400px] mx-auto mt-[10%]' onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-3">
                        <label htmlFor='email'>Email address*:</label>
                        <input ref={emailRef} className='border-1 p-1 px-2 rounded-md' placeholder=" enter email ..." id="email" />
                    </div>
                    <div className="flex flex-col">
                        <label className='form-label'>Password*:</label>
                        <input ref={passwordRef} className='border-1 p-1 px-2 rounded-md' placeholder=" enter password ..." type="password" name="password" />
                    </div>
                    <div className='flex flex-col justify-center mt-5'>
                        <button type='submit' className='px-2 py-1 text-zinc-100 font-bold rounded-lg bg-zinc-600 hover:bg-zinc-500'>Login</button>
                        <small className='text-center'>Don't have an account?<Link href="/signup" className='text-blue-800'>Create Account</Link></small>
                    </div>
                </form>
            </div>
        </>
    )
}