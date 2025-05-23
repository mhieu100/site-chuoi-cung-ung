import React from 'react'

const ContactPage = () => {
  return (
    <> <div className="bg-green-600 py-16 text-white" alt="Support header">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Chúng tôi luôn sẵn sàng hỗ trợ</h1>
      <p className="text-xl max-w-2xl mx-auto">Kết nối với đội ngũ hỗ trợ của chúng tôi cho mọi thắc mắc về dịch vụ chuỗi cung ứng nông nghiệp.</p>
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6" alt="Contact form">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Gửi tin nhắn cho chúng tôi</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"/>
            </div>
            <div>
              <label for="email" className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ email</label>
              <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"/>
            </div>
          </div>
          <div>
            <label for="subject" className="block text-sm font-medium text-gray-700 mb-1">Chủ đề</label>
            <select id="subject" name="subject" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="">Chọn chủ đề</option>
              <option value="farmers">Hỗ trợ nông dân</option>
              <option value="buyers">Thắc mắc mua hàng</option>
              <option value="tech">Vấn đề kỹ thuật</option>
              <option value="general">Câu hỏi chung</option>
            </select>
          </div>
          <div>
            <label for="message" className="block text-sm font-medium text-gray-700 mb-1">Tin nhắn của bạn</label>
            <textarea id="message" name="message" rows="5" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
          </div>
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium w-full" alt="Submit form">
            Gửi tin nhắn
          </button>
        </form>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm p-6" alt="FAQs">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <i className="fas fa-question-circle text-green-500 mr-3"></i>
            Câu hỏi thường gặp
          </h2>
          <div className="space-y-4">
            <div className="faq-item">
              <a href="#" className="text-green-600 hover:text-green-800 font-medium flex items-center justify-between" alt="FAQ question">
                <span>Làm thế nào để đăng ký làm nông dân?</span>
                <i className="fas fa-chevron-right"></i>
              </a>
              <div className="border-b border-gray-200 mt-3"></div>
            </div>
            <div className="faq-item">
              <a href="#" className="text-green-600 hover:text-green-800 font-medium flex items-center justify-between" alt="FAQ question">
                <span>Yêu cầu chứng nhận là gì?</span>
                <i className="fas fa-chevron-right"></i>
              </a>
              <div className="border-b border-gray-200 mt-3"></div>
            </div>
            <div className="faq-item">
              <a href="#" className="text-green-600 hover:text-green-800 font-medium flex items-center justify-between" alt="FAQ question">
                <span>Chuỗi cung ứng hoạt động như thế nào?</span>
                <i className="fas fa-chevron-right"></i>
              </a>
              <div className="border-b border-gray-200 mt-3"></div>
            </div>
            <div className="faq-item">
              <a href="#" className="text-green-600 hover:text-green-800 font-medium flex items-center justify-between" alt="FAQ question">
                <span>Lịch thanh toán cho nông dân</span>
                <i className="fas fa-chevron-right"></i>
              </a>
              <div className="border-b border-gray-200 mt-3"></div>
            </div>
            <div className="faq-item">
              <a href="#" className="text-green-600 hover:text-green-800 font-medium flex items-center justify-between" alt="FAQ question">
                <span>Tiêu chuẩn chất lượng và kiểm tra</span>
                <i className="fas fa-chevron-right"></i>
              </a>
            </div>
          </div>
          <a href="#" className="inline-block mt-4 text-green-600 hover:text-green-800 font-medium" alt="View all">
            Xem tất cả FAQ <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6" alt="Contact info">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <i className="fas fa-envelope text-green-500 mr-3"></i>
            Các phương thức liên hệ khác
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <i className="fas fa-phone-alt text-green-500 mt-1 mr-4"></i>
              <div>
                <h3 className="font-medium text-gray-800">Hỗ trợ qua điện thoại</h3>
                <p className="text-gray-600">(800) 555-0199</p>
                <p className="text-sm text-gray-500">Thứ 2 - Thứ 6, 8h-17h</p>
              </div>
            </div>
            <div className="flex items-start">
              <i className="fas fa-envelope text-green-500 mt-1 mr-4"></i>
              <div>
                <h3 className="font-medium text-gray-800">Email</h3>
                <p className="text-gray-600"><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="6b181e1b1b04191f2b08070e0a050d04040f45080406">[email&#160;protected]</a></p>
                <p className="text-sm text-gray-500">Phản hồi trong vòng 24 giờ</p>
              </div>
            </div>
            <div className="flex items-start">
              <i className="fas fa-map-marker-alt text-green-500 mt-1 mr-4"></i>
              <div>
                <h3 className="font-medium text-gray-800">Địa chỉ</h3>
                <p className="text-gray-600">123 Farm Lane<br/>Agri Valley, CA 90210</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-12 bg-white rounded-xl shadow-sm overflow-hidden" alt="Company location">
      <div className="map-container relative" alt="Map image">
        <div className="absolute inset-0 bg-black opacity-20" alt="Background image"></div>
        <div className="absolute bottom-0 left-0 right-0 bg-white p-6" alt="CleanFood Headquarters
          123 Farm Lane, Ag">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Trụ sở chính CleanFood</h3>
          <p className="text-gray-600">123 Farm Lane, Agri Valley, CA 90210</p>
          <a href="#" className="inline-block mt-4 text-green-600 hover:text-green-800 font-medium" alt="Directions">
            Chỉ đường <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div className="fixed bottom-6 right-6">
    <button className="chat-button bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center" alt="Live chat">
      <i className="fas fa-comment-dots text-2xl"></i>
    </button>
  </div></>
  )
}

export default ContactPage