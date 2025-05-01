import React from 'react'

const Footer = () => {
    return (
        <> <footer class="bg-gray-800" alt="About Blog">
            <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                <nav class="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                    <div class="px-5 py-2">
                        <a href="#" class="text-base text-gray-300 hover:text-white">About</a>
                    </div>
                    <div class="px-5 py-2">
                        <a href="#" class="text-base text-gray-300 hover:text-white">Blog</a>
                    </div>
                    <div class="px-5 py-2">
                        <a href="#" class="text-base text-gray-300 hover:text-white">Press</a>
                    </div>
                    <div class="px-5 py-2">
                        <a href="#" class="text-base text-gray-300 hover:text-white">Careers</a>
                    </div>
                    <div class="px-5 py-2">
                        <a href="#" class="text-base text-gray-300 hover:text-white">Privacy</a>
                    </div>
                    <div class="px-5 py-2">
                        <a href="#" class="text-base text-gray-300 hover:text-white">Terms</a>
                    </div>
                </nav>
                <div class="mt-8 flex justify-center space-x-6">
                    <a href="#" class="text-gray-400 hover:text-white">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>
                <p class="mt-8 text-center text-base text-gray-400">
                    © 2025 AgriTrace, Inc. All rights reserved.
                </p>
            </div>
        </footer></>
    )
}

export default Footer