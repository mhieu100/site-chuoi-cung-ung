import React from 'react'

const Features = () => {
    return (
        <>
            <div className="py-12 bg-green-50" alt="Minh bạch
          
          Cách nền tảng hoạt động">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Minh bạch</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Cách nền tảng hoạt động
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white" alt="Background image">
                                    <i className="fas fa-seedling"></i>
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Nguồn gốc trang trại</p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Xác minh chính xác sản phẩm của bạn đến từ trang trại nào, với hình ảnh và hồ sơ người nông dân.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white" alt="Background image">
                                    <i className="fas fa-truck"></i>
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Nhật ký vận chuyển</p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Theo dõi hành trình từ thu hoạch đến bàn ăn của bạn với dữ liệu nhiệt độ và xử lý.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white" alt="Background image">
                                    <i className="fas fa-certificate"></i>
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Chứng nhận</p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Truy cập tất cả chứng nhận hữu cơ và kiểm tra chất lượng cho mọi sản phẩm.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Features