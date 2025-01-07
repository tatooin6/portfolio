'use client'

import React, { useState } from 'react'
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

const ThemeSwitcher = () => {
    const [dark, setDark] = useState(false);

    function darkModeHandler(): void {
        setDark((current) => !current);
        document.body.classList.toggle("dark");
    }

    return (
        <div className='dark:text-gray-200'>
            <button onClick={() => darkModeHandler()}>
                {
                    dark && <IoSunny />
                }
                {
                    !dark && <IoMoon />
                }
            </button>
        </div>
    )
}

export default ThemeSwitcher
