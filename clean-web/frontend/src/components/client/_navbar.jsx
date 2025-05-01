import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();
    
    const isActive = (path) => {
        return location.pathname === path ? "text-green-700" : "text-gray-500";
    }

    return (
        <>
            <nav class="bg-white shadow-md" alt="AgriTraceH">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 flex items-center">
                                <i class="fas fa-leaf text-green-600 text-2xl mr-2"></i>
                                <span class="text-xl font-bold text-green-800">AgriTrace</span>
                            </div>
                        </div>
                        <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
                            <Link to={'/'} className={`${isActive('/')} hover:text-green-900 px-3 py-2 text-sm font-medium`}>Home</Link>
                            <Link to={'/profile'} className={`${isActive('/profile')} hover:text-green-700 px-3 py-2 text-sm font-medium`}>Profile</Link>
                            <Link to={'/product'} className={`${isActive('/product')} hover:text-green-700 px-3 py-2 text-sm font-medium`}>Product</Link>
                            <Link to={'/blog'} className={`${isActive('/blog')} hover:text-green-700 px-3 py-2 text-sm font-medium`}>Blog</Link>
                            <Link to={'/store'} className={`${isActive('/store')} hover:text-green-700 px-3 py-2 text-sm font-medium`}>Store</Link>
                            <Link to={'/about'} className={`${isActive('/about')} hover:text-green-700 px-3 py-2 text-sm font-medium`}>About</Link>
                            <Link to={'/contact'} className={`${isActive('/contact')} hover:text-green-700 px-3 py-2 text-sm font-medium`}>Contact</Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium" alt="Sign In">
                                Sign In
                            </button>
                            <div class="relative">
                                <button class="bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium flex items-center" alt="User menu">
                                    <i class="fas fa-user-circle mr-2"></i>
                                    <span>My Account</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar