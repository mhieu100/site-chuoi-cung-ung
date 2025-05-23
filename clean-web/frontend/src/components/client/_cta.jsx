import React from 'react'

const CTA = () => {
    return (
        <>
            <div className="bg-green-700" alt="Ready to trace your food?
          Join AgriTrace t">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Sẵn sàng truy xuất thực phẩm của bạn?</span>
                        <span className="block">Tham gia AgriTrace ngay hôm nay.</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-green-200">
                        Quét mã QR sản phẩm hoặc đăng ký để kết nối trực tiếp với nông dân.
                    </p>
                    <a href="#" className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 sm:w-auto" alt="Sign Up Now">
                        Đăng ký ngay
                    </a>
                </div>
            </div>
        </>
    )
}

export default CTA