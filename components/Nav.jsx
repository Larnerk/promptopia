"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    console.log(useSession());
    const { data: session, status  } = useSession();
    const isLoading = status==="loading";

    const [providers, setProviders] = useState(null);

    {/* Variable to handle opening and closing of mobile navigation menu (toggle state) */ }
    const [toggleDropdown, setToggleDropdown] = useState(false);


    {/* This function is setting providers from an authentication service, in this case Google Auth */ }
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        setUpProviders();
    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3">

            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/assets/images/logo.svg"
                    alt="Promptopia Logo"
                    width={30} height={30}
                    className="object-contain" />
                <p className="logo_text">{process.env.NEXT_PUBLIC_APP_NAME}</p>
            </Link>


            {/*Desktop Navigation*/}

            <div className="sm:flex hidden">
                {/* Display specific navigation depending on login state of user, authenticated via Google Auth and isUserLoggedIn variable(boolean) */}

                {!isLoading && (session?.user ? (
                    <div className="flex gap-3 md:gap-5">

                        <Link href="/create-prompt" className="black_btn">Create Post</Link>
                        <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
                        <Link href="/profile">
                            <Image src={session?.user.image}
                                width={37}
                                height={37}
                                alt="profile" />
                        </Link>

                    </div>
                )
                    :
                    (
                        <>
                            {/* This is getting providers from Google Auth and mapping depending on auth providers you have set up, for this project only Google Auth is utilized */}

                            {providers && Object.values(providers).map((provider) => (
                                <button type="button" key={provider.name} onClick={() => signIn(provider.id)}
                                    className="black_btn">
                                    Sign In
                                </button>
                            ))}
                        </>
                    ))}

            </div>

            {/* Mobile Navigation */}

            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image src={session?.user.image}
                            width={37}
                            height={37}
                            alt="profile"
                            /* For toggling state, it is good to use prev and not prev, because in react if it is the opposite of the variable to start, it may run into unintended errors*/
                            onClick={() => setToggleDropdown((prev) => !prev)} />

                        {toggleDropdown && (<div className="dropdown">
                            <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)} >
                                My Profile
                            </Link>
                            <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)} >
                                Create Prompt
                            </Link>
                            <button type="button" onClick={() => {
                                setToggleDropdown(false);
                                signOut();
                            }}
                                className="mt-5 w-full black_btn">
                                Sign Out
                            </button>
                        </div>)}
                    </div>
                ) :
                    (
                        <>
                            {/* This is getting providers from Google Auth and mapping depending on auth providers you have set up, for this project only Google Auth is utilized */}

                            {providers && Object.values(providers).map((provider) => (
                                <button type="button" key={provider.name} onClick={() => signIn(provider.id)}
                                    className="black_btn">
                                    Sign In
                                </button>
                            ))}
                        </>
                    )}
            </div>

        </nav>
    )
}

export default Nav