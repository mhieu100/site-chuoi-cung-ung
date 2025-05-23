import React from 'react'

const Spotlight = () => {
  return (
    <>
    <div className="bg-white py-12" alt="Gặp gỡ nông dân của chúng tôi
          
          Trang trại hữu cơ đối tác">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:text-center">
        <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Gặp gỡ nông dân của chúng tôi</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Trang trại hữu cơ đối tác
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-green-50 rounded-lg overflow-hidden shadow" alt="Green Valley Organic
            Trang trại gia đình từ năm">
          <img className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="farmer working" />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900">Green Valley Organic</h3>
            <p className="mt-2 text-gray-600">Trang trại gia đình từ năm 1985 chuyên về rau quả gia truyền</p>
            <div className="mt-4 flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center" alt="Background image">
                  <i className="fas fa-map-marker-alt text-green-600"></i>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Sonoma County, CA</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg overflow-hidden shadow" alt="Sunrise Orchard
            Trái cây hữu cơ được chứng nhận">
          <img className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="farm fields" />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900">Sunrise Orchard</h3>
            <p className="mt-2 text-gray-600">Trái cây hữu cơ được chứng nhận với phương pháp canh tác sinh động</p>
            <div className="mt-4 flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center" alt="Background image">
                  <i className="fas fa-map-marker-alt text-green-600"></i>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Hood River, OR</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg overflow-hidden shadow" alt="Heritage Acres
            Nông nghiệp tái tạo">
          <img className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1533241242276-46a506b40d66?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="farmer harvesting" loading="lazy" />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900">Heritage Acres</h3>
            <p className="mt-2 text-gray-600">Nông nghiệp tái tạo cho chăn nuôi gia súc thả đồng</p>
            <div className="mt-4 flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center" alt="Background image">
                  <i className="fas fa-map-marker-alt text-green-600"></i>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Boulder, CO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default Spotlight