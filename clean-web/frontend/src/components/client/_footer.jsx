import React from 'react'

const Footer = () => {
    return (
        <> <footer className="bg-gray-800" alt="Giới thiệu Tin tức">
            <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                    <div className="px-5 py-2">
                        <a href="#" className="text-base text-gray-300 hover:text-white">Giới thiệu</a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="#" className="text-base text-gray-300 hover:text-white">Tin tức</a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="#" className="text-base text-gray-300 hover:text-white">Báo chí</a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="#" className="text-base text-gray-300 hover:text-white">Tuyển dụng</a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="#" className="text-base text-gray-300 hover:text-white">Quyền riêng tư</a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="#" className="text-base text-gray-300 hover:text-white">Điều khoản</a>
                    </div>
                </nav>
                <div className="mt-8 flex justify-center space-x-6">
                    <a href="#" className="text-gray-400 hover:text-white">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
                <p className="mt-8 text-center text-base text-gray-400">
                    © 2025 AgriTrace, Inc. Đã đăng ký bản quyền.
                </p>
            </div>
        </footer></>
    )
}

export default Footer