import React from 'react'

const AboutPage = () => {
    return (
        <><div class="relative hero-pattern h-96 flex items-center" alt="Farm workers">
            <div class="absolute inset-0 bg-black opacity-40" alt="Background image"></div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">Thay đổi nông nghiệp thông qua tính minh bạch</h1>
                <p class="text-xl max-w-2xl">Chúng tôi đang xây dựng một tương lai nơi mỗi giao dịch mua thực phẩm đều hỗ trợ nông nghiệp bền vững và thực hành lao động công bằng.</p>
            </div>
        </div>

            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" alt="Sứ mệnh của chúng tôi">
                <div class="grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-800 mb-6">Sứ mệnh của chúng tôi</h2>
                        <p class="text-gray-600 mb-6">CleanFood tồn tại để tạo ra sự minh bạch triệt để trong hệ thống thực phẩm bằng cách kết nối trực tiếp người tiêu dùng với nguồn gốc của thực phẩm thông qua công nghệ blockchain.</p>
                        <div class="bg-green-50 rounded-xl p-6 mb-6" alt="Tuyên bố sứ mệnh">
                            <i class="fas fa-bullseye text-green-400 text-3xl mb-4"></i>
                            <h3 class="text-xl font-semibold text-gray-800 mb-2">Truy xuất từ nông trại đến bàn ăn</h3>
                            <p class="text-gray-600">Nền tảng của chúng tôi theo dõi từng bước của chuỗi cung ứng, đảm bảo nguồn gốc đạo đức và thực hành bền vững từ hạt giống đến cửa hàng.</p>
                        </div>
                    </div>
                    <div>
                        <h2 class="text-3xl font-bold text-gray-800 mb-6">Tầm nhìn của chúng tôi</h2>
                        <p class="text-gray-600 mb-6">Chúng tôi hình dung một thế giới nơi người tiêu dùng có thể đưa ra lựa chọn có hiểu biết, khen thưởng canh tác có trách nhiệm và thúc đẩy thay đổi hệ thống trong nông nghiệp.</p>
                        <div class="bg-blue-50 rounded-xl p-6" alt="Tuyên bố tầm nhìn">
                            <i class="fas fa-globe-americas text-blue-400 text-3xl mb-4"></i>
                            <h3 class="text-xl font-semibold text-gray-800 mb-2">Tác động toàn cầu</h3>
                            <p class="text-gray-600">Đến năm 2030, chúng tôi hướng đến việc có 50% sản phẩm tạp hóa của Hoa Kỳ trên nền tảng của chúng tôi, tạo ra động lực thị trường cho canh tác bền vững trên toàn thế giới.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-green-600 text-white py-16" alt="Company stats">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold mb-12 text-center">Our Impact in Numbers</h2>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p class="text-4xl font-bold mb-2">250+</p>
                            <p class="text-green-100">Partner Farms</p>
                        </div>
                        <div>
                            <p class="text-4xl font-bold mb-2">1.2M</p>
                            <p class="text-green-100">Products Tracked</p>
                        </div>
                        <div>
                            <p class="text-4xl font-bold mb-2">85%</p>
                            <p class="text-green-100">Reduced Food Waste</p>
                        </div>
                        <div>
                            <p class="text-4xl font-bold mb-2">34</p>
                            <p class="text-green-100">Countries Served</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" alt="Our partners">
                <h2 class="text-3xl font-bold text-gray-800 mb-12 text-center">Trusted By Industry Leaders</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                    <div class="flex justify-center">
                        <div class="bg-white p-6 rounded-xl shadow-sm partner-logo h-24 flex items-center" alt="Partner logo">
                            <i class="fas fa-store text-4xl text-gray-700"></i>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="bg-white p-6 rounded-xl shadow-sm partner-logo h-24 flex items-center" alt="Partner logo">
                            <i class="fas fa-tractor text-4xl text-gray-700"></i>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="bg-white p-6 rounded-xl shadow-sm partner-logo h-24 flex items-center" alt="Partner logo">
                            <i class="fas fa-seedling text-4xl text-gray-700"></i>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="bg-white p-6 rounded-xl shadow-sm partner-logo h-24 flex items-center" alt="Partner logo">
                            <i class="fas fa-warehouse text-4xl text-gray-700"></i>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-gray-50 py-16" alt="Our team">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-gray-800 mb-4 text-center">Meet The Team</h2>
                    <p class="text-gray-600 text-center max-w-2xl mx-auto mb-12">Passionate individuals working together to build transparent food systems.</p>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div class="bg-white rounded-xl shadow-sm overflow-hidden team-card transition-all duration-300" alt="Team member">
                            <div class="bg-green-100 h-48 flex items-center justify-center" alt="Team photo">
                                <i class="fas fa-user-tie text-green-400 text-6xl"></i>
                            </div>
                            <div class="p-6">
                                <h3 class="text-xl font-bold text-gray-800 mb-1">Dr. Sarah Chen</h3>
                                <p class="text-green-600 mb-4">Founder &amp; CEO</p>
                                <p class="text-gray-600">Former agricultural economist with 15 years experience in sustainable supply chains.</p>
                                <div class="flex space-x-3 mt-4">
                                    <a href="#" class="text-gray-400 hover:text-green-600" alt="LinkedIn">
                                        <i class="fab fa-linkedin-in"></i>
                                    </a>
                                    <a href="#" class="text-gray-400 hover:text-green-600" alt="Twitter">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-sm overflow-hidden team-card transition-all duration-300" alt="Team member">
                            <div class="bg-blue-100 h-48 flex items-center justify-center" alt="Team photo">
                                <i class="fas fa-laptop-code text-blue-400 text-6xl"></i>
                            </div>
                            <div class="p-6">
                                <h3 class="text-xl font-bold text-gray-800 mb-1">James Rodriguez</h3>
                                <p class="text-blue-600 mb-4">CTO</p>
                                <p class="text-gray-600">Blockchain expert who previously led engineering teams at two ag-tech startups.</p>
                                <div class="flex space-x-3 mt-4">
                                    <a href="#" class="text-gray-400 hover:text-blue-600" alt="LinkedIn">
                                        <i class="fab fa-linkedin-in"></i>
                                    </a>
                                    <a href="#" class="text-gray-400 hover:text-blue-600" alt="GitHub">
                                        <i class="fab fa-github"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-sm overflow-hidden team-card transition-all duration-300" alt="Team member">
                            <div class="bg-yellow-100 h-48 flex items-center justify-center" alt="Team photo">
                                <i class="fas fa-user-graduate text-yellow-400 text-6xl"></i>
                            </div>
                            <div class="p-6">
                                <h3 class="text-xl font-bold text-gray-800 mb-1">Priya Patel</h3>
                                <p class="text-yellow-600 mb-4">Head of Farmer Relations</p>
                                <p class="text-gray-600">Grew up on a family farm and now advocates for smallholder farmers worldwide.</p>
                                <div class="flex space-x-3 mt-4">
                                    <a href="#" class="text-gray-400 hover:text-yellow-600" alt="LinkedIn">
                                        <i class="fab fa-linkedin-in"></i>
                                    </a>
                                    <a href="#" class="text-gray-400 hover:text-yellow-600" alt="Instagram">
                                        <i class="fab fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" alt="Media coverage">
                <h2 class="text-3xl font-bold text-gray-800 mb-12 text-center">Featured In</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div class="bg-white rounded-xl shadow-sm p-6" alt="Press feature">
                        <div class="bg-gray-100 h-16 flex items-center justify-center mb-4 rounded-lg" alt="Media logo">
                            <i class="fas fa-newspaper text-3xl text-gray-500"></i>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">"The Future of Food Transparency"</h3>
                        <p class="text-gray-600 text-sm mb-4">TechCrunch - Jan 2025</p>
                        <a href="#" class="text-green-600 hover:text-green-800 text-sm font-medium flex items-center" alt="Read article">
                            Read Article <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm p-6" alt="Press feature">
                        <div class="bg-gray-100 h-16 flex items-center justify-center mb-4 rounded-lg" alt="Media logo">
                            <i class="fas fa-tv text-3xl text-gray-500"></i>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">"Blockchain's Role in Sustainable Agriculture"</h3>
                        <p class="text-gray-600 text-sm mb-4">CNN Business - Nov 2024</p>
                        <a href="#" class="text-green-600 hover:text-green-800 text-sm font-medium flex items-center" alt="Read article">
                            Read Article <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                    </div>

                    <div class="bg-white rounded-xl shadow-sm p-6" alt="Press feature">
                        <div class="bg-gray-100 h-16 flex items-center justify-center mb-4 rounded-lg" alt="Media logo">
                            <i class="fas fa-microphone text-3xl text-gray-500"></i>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">"How CleanFood is Changing Consumer Habits"</h3>
                        <p class="text-gray-600 text-sm mb-4">NPR - Mar 2025</p>
                        <a href="#" class="text-green-600 hover:text-green-800 text-sm font-medium flex items-center" alt="Read article">
                            Read Article <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                    </div>
                </div>
            </section>

            <section class="bg-green-50 py-16" alt="Call to action">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 class="text-3xl font-bold text-gray-800 mb-4">Ready to join the food transparency revolution?</h2>
                    <p class="text-gray-600 max-w-2xl mx-auto mb-8">Whether you're a farmer, retailer, or conscious consumer, we'd love to hear from you.</p>
                    <div class="flex flex-col sm:flex-row justify-center gap-4">
                        <button class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium" alt="Contact us">
                            Contact Our Team
                        </button>
                        <button class="bg-white hover:bg-gray-100 text-green-600 px-6 py-3 rounded-lg font-medium border border-green-600" alt="Learn more">
                            Learn More
                        </button>
                    </div>
                </div>
            </section></>
    )
}

export default AboutPage