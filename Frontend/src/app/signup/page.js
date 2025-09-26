'use client'
import { useRouter } from 'next/navigation';
import React, { useRef, useContext } from 'react'
import { ChatContext } from "../context/context";
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function Singup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const context = useContext(ChatContext);
    const router = useRouter();
    const emailRegex = /[a-zA-Z0-9+-_.%]+@[^\s@]+\.[a-z]{2,}$/;
    const nameRegex = /[a-zA-Z\s']+$/;

    const capitalize = (str) => {
        const capitalizedName = str.split(' ').map((item => {
            return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
        }))
        return capitalizedName.join(' ')
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const nameVal = capitalize(nameRef.current.value.trim());
        const emailVal = emailRef.current.value.trim();
        const passwordVal = passwordRef.current.value.trim();

        if (!nameVal) return toast.warning("Enter name!!")
        if (!nameRegex.test(nameVal)) return toast.warning("Invalid name!!")
        // if (/d+/.test(nameVal)) return toast.warning("Name should not contain digits!!")
        if (nameVal.length < 5) return toast.warning("Name must be atleast 5 characters long!!")
        if (!emailVal) return toast.warning("Enter email!!")
        if (!emailRegex.test(emailVal)) return toast.warning("Invalid email!!")
        if (emailVal.includes(" ")) return toast.warning("Email should not contain whitespace!!")
        if (!passwordVal) return toast.warning("Enter password!!")
        if (passwordVal.includes(" ")) return toast.warning("Password should not contain whitespace!!")
        if (passwordVal.length < 6) return toast.warning("Password must be atleast 6 characters long!!")

        if (
            nameVal.includes(" ") &&
            emailVal.length > 0 &&
            passwordVal.length > 5
        ) {
            context.setUserData(prev => ({
                ...prev,
                name: nameVal,
                email: emailVal,
                password: passwordVal
            }));

            fetch("https://queryflowai-backend.onrender.com/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: nameVal, email: emailVal, password: passwordVal })
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
                        nameRef.current.value = "";
                        emailRef.current.value = "";
                        passwordRef.current.value = "";
                        toast.success("Sugnup successful!");
                        setTimeout(() => {
                            router.push("/");
                        }, 500);
                    } else {
                        toast.error(data.message || "Signup failed!");
                    }
                })
                .catch(error => {
                    toast.error(data.message || "Signup failed!");
                    console.error("failed to post:", error)
                });
        }
    }

    return (
        <>
            <div className='h-screen w-full bg-zinc-200 text-black fixed'>
                <form className='p-2 w-[400px] mx-auto mt-[10%]' onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-3">
                        <label htmlFor='name'>Full Name*:</label>
                        <input ref={nameRef} className='border-1 p-1 px-2 rounded-md' placeholder=" enter your name ..." id="name" />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor='email'>Email address*:</label>
                        <input ref={emailRef} className='border-1 p-1 px-2 rounded-md' placeholder=" enter email ..." id="email" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor='password'>Password*:</label>
                        <input ref={passwordRef} className='border-1 p-1 px-2 rounded-md' placeholder=" create password" type="password" id="password" />
                    </div>
                    <div className='flex flex-col justify-center mt-5'>
                        <button type='submit' className='px-2 py-1 text-zinc-100 font-bold rounded-lg bg-zinc-600 hover:bg-zinc-500'>Create Account</button>
                        <small className='text-center'>Already have an account?<Link href='/login' className='text-blue-800'>Login</Link></small>
                    </div>
                </form>
            </div>
        </>
    )
}