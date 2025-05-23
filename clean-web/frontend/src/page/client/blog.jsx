import React from 'react'

const BlogPage = () => {
    return (
        <>
            <div className="bg-green-600 py-16 text-white" alt="Blog header">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Thông tin nông nghiệp sạch</h1>
                    <p className="text-xl max-w-2xl mx-auto">Khám phá câu chuyện, mẹo và đổi mới trong canh tác bền vững và chuỗi cung ứng đạo đức</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="featured-article rounded-xl shadow-sm overflow-hidden mb-16 h-96 flex items-end text-white" alt="Featured article">
                    <div className="p-8 w-full">
                        <div className="inline-block bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4" alt="FEATURED">NỔI BẬT</div>
                        <h2 className="text-3xl font-bold mb-2">Tương lai của nông nghiệp hữu cơ trong không gian đô thị</h2>
                        <p className="mb-4">Canh tác theo chiều dọc đang cách mạng hóa sản xuất thực phẩm địa phương đồng thời giảm dấu chân carbon.</p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-white mr-3" alt="Author photo"></div>
                            <div>
                                <p className="text-sm font-medium">Maria Rodriguez</p>
                                <p className="text-xs opacity-80">15/05/2025 · 8 phút đọc</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Danh mục bài viết</h2>
                    <div className="flex flex-wrap gap-3">
                        <a href="#" className="category-chip bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium" alt="Organic tips">Mẹo hữu cơ</a>
                        <a href="#" className="category-chip bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium" alt="Farmer stories">Câu chuyện nông dân</a>
                        <a href="#" className="category-chip bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium" alt="Supply chain">Chuỗi cung ứng</a>
                        <a href="#" className="category-chip bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium" alt="Sustainable tech">Công nghệ bền vững</a>
                        <a href="#" className="category-chip bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium" alt="Market trends">Xu hướng thị trường</a>
                        <a href="#" className="category-chip bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium" alt="Certifications">Chứng nhận</a>
                    </div>
                </div>

                <div className="mb-12">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="article-card bg-white rounded-xl shadow-sm overflow-hidden transition duration-300" alt="Article card">
                            <div className="h-48 bg-gray-100 overflow-hidden" alt="Article image">
                                <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" className="w-full h-full object-cover" alt="Organic farm" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-medium text-green-600">MẸO HỮU CƠ</span>
                                    <span className="text-xs text-gray-500">02/06/2025</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">5 Bước đơn giản để chuyển đổi sang canh tác hữu cơ</h3>
                                <p className="text-gray-600 mb-4">Lời khuyên thực tế cho nông dân truyền thống muốn chuyển sang phương pháp hữu cơ mà không tốn kém.</p>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-2" alt="Author photo"></div>
                                    <span className="text-sm font-medium">James Wilson</span>
                                </div>
                            </div>
                        </div>

                        <div className="article-card bg-white rounded-xl shadow-sm overflow-hidden transition duration-300" alt="Article card">
                            <div className="h-48 bg-gray-100 overflow-hidden" alt="Article image">
                                <img src="https://images.unsplash.com/photo-1510583085145-1b347ee019ff?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" className="w-full h-full object-cover" alt="Farmer portrait" loading="lazy" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-medium text-green-600">CÂU CHUYỆN NÔNG DÂN</span>
                                    <span className="text-xs text-gray-500">28/05/2025</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Gặp gỡ gia đình bảo tồn các giống cây trồng quý hiếm</h3>
                                <p className="text-gray-600 mb-4">Cách gia đình Hernandez ở New Mexico đang giữ gìn phương pháp canh tác truyền thống trong thời đại hiện đại.</p>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-2" alt="Author photo"></div>
                                    <span className="text-sm font-medium">Sarah Johnson</span>
                                </div>
                            </div>
                        </div>

                        <div className="article-card bg-white rounded-xl shadow-sm overflow-hidden transition duration-300" alt="Article card">
                            <div className="h-48 bg-gray-100 overflow-hidden" alt="Article image">
                                <img src="https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" className="w-full h-full object-cover" alt="Blockchain tech" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-medium text-green-600">CHUỖI CUNG ỨNG</span>
                                    <span className="text-xs text-gray-500">20/05/2025</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Blockchain cho minh bạch thực phẩm: Những điều cần biết</h3>
                                <p className="text-gray-600 mb-4">Khám phá cách công nghệ sổ cái phân tán đang tạo ra sự minh bạch chưa từng có trong chuỗi cung ứng nông nghiệp.</p>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-2" alt="Author photo"></div>
                                    <span className="text-sm font-medium">David Chen</span>
                                </div>
                            </div>
                        </div>

                        <div className="article-card bg-white rounded-xl shadow-sm overflow-hidden transition duration-300" alt="Article card">
                            <div className="h-48 bg-gray-100 overflow-hidden" alt="Article image">
                                <img src="https://images.unsplash.com/photo-1536657464919-892534f60d6e?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" className="w-full h-full object-cover" alt="Compost pile" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-medium text-green-600">MẸO HỮU CƠ</span>
                                    <span className="text-xs text-gray-500">12/05/2025</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Nghệ thuật và khoa học của phân trộn hoàn hảo</h3>
                                <p className="text-gray-600 mb-4">Làm chủ cân bằng xanh, nâu, độ ẩm và thoáng khí cho phân trộn giàu dinh dưỡng nâng cao chất lượng đất của bạn.</p>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-2" alt="Author photo"></div>
                                    <span className="text-sm font-medium">Emily Parker</span>
                                </div>
                            </div>
                        </div>

                        <div className="article-card bg-white rounded-xl shadow-sm overflow-hidden transition duration-300" alt="Article card">
                            <div className="h-48 bg-gray-100 overflow-hidden" alt="Article image">
                                <img src="https://images.unsplash.com/photo-1626906722163-bd4c03cb3b9b?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" className="w-full h-full object-cover" alt="Farm workers" loading="lazy" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-medium text-green-600">CÂU CHUYỆN NÔNG DÂN</span>
                                    <span className="text-xs text-gray-500">05/05/2025</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Chứng nhận thương mại công bằng: Tác động đến nông dân nhỏ</h3>
                                <p className="text-gray-600 mb-4">Câu chuyện trực tiếp từ người trồng cà phê ở Colombia về cách thực hành thương mại công bằng đã thay đổi cộng đồng của họ.</p>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-2" alt="Author photo"></div>
                                    <span className="text-sm font-medium">Carlos Mendez</span>
                                </div>
                            </div>
                        </div>

                        <div className="article-card bg-white rounded-xl shadow-sm overflow-hidden transition duration-300" alt="Article card">
                            <div className="h-48 bg-gray-100 overflow-hidden" alt="Article image">
                                <img src="https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" className="w-full h-full object-cover" alt="Solar panels" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-medium text-green-600">CÔNG NGHỆ BỀN VỮNG</span>
                                    <span className="text-xs text-gray-500">28/04/2025</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Giải pháp năng lượng tái tạo cho trang trại xa</h3>
                                <p className="text-gray-600 mb-4">Khám phá các lựa chọn năng lượng mặt trời, gió và thủy điện nhỏ đang làm cho canh tác ngoài lưới khả thi hơn bao giờ hết.</p>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-2" alt="Author photo"></div>
                                    <span className="text-sm font-medium">Rachel Kim</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" alt="Previous page">
                            <i className="fas fa-chevron-left"></i>
                        </a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-green-600 hover:bg-gray-50" alt="Page 1">1</a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50" alt="Page 2">2</a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50" alt="Page 3">3</a>
                        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700" alt="Ellipsis">...</span>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50" alt="Page 8">8</a>
                        <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" alt="Next page">
                            <i className="fas fa-chevron-right"></i>
                        </a>
                    </nav>
                </div>
            </div>

            <div className="bg-green-50 py-16" alt="Newsletter section">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Cập nhật về nông nghiệp bền vững</h2>
                    <p className="text-gray-600 mb-6">Tham gia bản tin của chúng tôi để nhận các bài viết, nghiên cứu và câu chuyện nông trại mới nhất trực tiếp đến hộp thư của bạn.</p>
                    <form className="flex flex-col sm:flex-row gap-3">
                        <input type="email" placeholder="Địa chỉ email của bạn" className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" alt="Email input" />
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium" alt="Subscribe button">
                            Đăng ký
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default BlogPage