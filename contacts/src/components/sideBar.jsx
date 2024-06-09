import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineHome } from "react-icons/ai"
import { IoBusinessOutline, IoPersonCircle } from "react-icons/io5"
import { BiMale } from "react-icons/bi"
import { FaFemale } from "react-icons/fa"
import '../assets/css/sideBar.css'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true)
    const [activeTab, setActiveTab] = useState('home')

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    };

    const navigate = useNavigate()
    
    const handleTabClick = (tab, path) => {
        setActiveTab(tab)
        navigate(path)
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <p className='side-contact' onClick={toggleSidebar}>Contacts</p>
            <div className="menu">
                <div className={`menu-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabClick('home', '/')}>
                    <span className="icon"><AiOutlineHome size={24} /></span>
                    {isOpen && <span className="title">Home</span>}
                </div>
                <div className={`menu-item ${activeTab === 'business' ? 'active' : ''}`} onClick={() => handleTabClick('business', '/business')}>
                    <span className="icon"><IoBusinessOutline size={24} /></span>
                    {isOpen && <span className="title">Business</span>}
                </div>
                <div className={`menu-item ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => handleTabClick('personal', '/personal')}>
                    <span className="icon"><IoPersonCircle size={24} /></span>
                    {isOpen && <span className="title">Personal</span>}
                </div>
                <div className={`menu-item ${activeTab === 'male' ? 'active' : ''}`} onClick={() => handleTabClick('male', '/male')}>
                    <span className="icon"><BiMale size={24} /></span>
                    {isOpen && <span className="title">Male</span>}
                </div>
                <div className={`menu-item ${activeTab === 'female' ? 'active' : ''}`} onClick={() => handleTabClick('female', '/female')}>
                    <span className="icon"><FaFemale size={24} /></span>
                    {isOpen && <span className="title">Female</span>}
                </div>
            </div>
        </div>
    );
}

export default Sidebar
