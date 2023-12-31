import React, { useRef } from 'react'
import { useState, useReducer, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';
import Logins from '../components/Logins';
import { client } from '../client';
import { userQuery } from '../utils/data';
import logo from '../assets/logo.png';
import Pins from './Pins';
import { fetchUser } from '../utils/fetchUser';


const Home = () => {
    const [ToggleSidebar, setToggleSidebar] = useState(false);
    const [user, setuser] = useState(null);
    const scrollRef = useRef(null);
    useEffect(() => {
        scrollRef.current.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        const query = userQuery(userInfo?.aud);
        client.fetch(query).then((data) => {
            setuser(data[0]);
        })

    }, []);
    const userInfo = fetchUser();
    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease out">
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar user={user && user} />
            </div>
            <div className='flex md:hidden flex-row'>
                <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
                    <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
                    <Link to="/">
                        <img src={logo} alt="img" className='w-28' />
                    </Link>
                    <Link to={`user-profile/${user?._id}`}>
                        <img src={user?.image} alt="img" className='w-28' />
                    </Link>
                </div>
                {ToggleSidebar ? (
                    <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md  transform transition-transform duration-1000 ease-in-out'>
                        <div className='absolute w-full flex justify-end items-center p-2'>
                            <AiFillCloseCircle fontSize={30} className='cursor-pointer animate-slide-in ' onClick={() => setToggleSidebar(false)} />
                        </div>
                        <Sidebar user={user && user} closeToggle={setToggleSidebar} />
                    </div>
                ) :
                    <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md -translate-x-full  transform transition-transform duration-1000 ease-in-out'>
                        <div className='absolute w-full flex justify-end items-center p-2'>
                            <AiFillCloseCircle fontSize={30} className='cursor-pointer animate-slide-in ' onClick={() => setToggleSidebar(true)} />
                        </div>
                        <Sidebar user={user && user} closeToggle={setToggleSidebar} />
                    </div>
                }
            </div>

            <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
                <Routes>
                    <Route path="/user-profile/:userId" element={<UserProfile />} />
                    <Route path="/*" element={<Pins user={user && user} />} />
                </Routes>
            </div>

        </div>
    )
}

export default Home
