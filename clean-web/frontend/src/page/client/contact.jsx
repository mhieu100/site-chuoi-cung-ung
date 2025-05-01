import React from 'react'

const ContactPage = () => {
  return (
    <> <div class="bg-green-600 py-16 text-white" alt="Support header">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">We're Here to Help</h1>
      <p class="text-xl max-w-2xl mx-auto">Connect with our support team for any questions about our agricultural supply chain services.</p>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid md:grid-cols-3 gap-8">
      <div class="md:col-span-2 bg-white rounded-xl shadow-sm p-6" alt="Contact form">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
        <form class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input type="text" id="name" name="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"/>
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" id="email" name="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"/>
            </div>
          </div>
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select id="subject" name="subject" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="">Select a topic</option>
              <option value="farmers">Farmer Support</option>
              <option value="buyers">Buyer Inquiries</option>
              <option value="tech">Technical Issues</option>
              <option value="general">General Questions</option>
            </select>
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
            <textarea id="message" name="message" rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
          </div>
          <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium w-full" alt="Submit form">
            Send Message
          </button>
        </form>
      </div>

      <div class="space-y-8">
        <div class="bg-white rounded-xl shadow-sm p-6" alt="FAQs">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <i class="fas fa-question-circle text-green-500 mr-3"></i>
            Frequently Asked Questions
          </h2>
          <div class="space-y-4">
            <div class="faq-item">
              <a href="#" class="text-green-600 hover:text-green-800 font-medium flex items-center justify-between" alt="FAQ question">
                <span>How do I register as a farmer?</span>
                <i class="fas fa-chevron-right"></i>
              </a>
              <div class="border-b border-gray-200 mt-3"></div>
            </div>
            <div class="faq-item">
              <a href="#" class="text-green-600 hover:text-green-800 font-medium flex items-center justify-between" alt="FAQ question">
                <span>What are the certification requirements?</span>
                <i class="fas fa-chevron-right"></i>
              </a>
              <div class="border-b border-gray-200 mt-3"></div>
            </div>
            <div class="faq-item">
              <a href="#" class="text-green-600 hover:text-green-800 font-medium flex items-center justify-between" alt="FAQ question">
                <span>How does the supply chain tracking work?</span>
                <i class="fas fa-chevron-right"></i>
              </a>
              <div class="border-b border-gray-200 mt-3"></div>
            </div>
            <div class="faq-item">
              <a href="#" class="text-green-600 hover:text-green-800 font-medium flex items-center justify-between" alt="FAQ question">
                <span>Payment schedule for farmers</span>
                <i class="fas fa-chevron-right"></i>
              </a>
              <div class="border-b border-gray-200 mt-3"></div>
            </div>
            <div class="faq-item">
              <a href="#" class="text-green-600 hover:text-green-800 font-medium flex items-center justify-between" alt="FAQ question">
                <span>Quality standards and inspections</span>
                <i class="fas fa-chevron-right"></i>
              </a>
            </div>
          </div>
          <a href="#" class="inline-block mt-4 text-green-600 hover:text-green-800 font-medium" alt="View all">
            View all FAQs <i class="fas fa-arrow-right ml-2"></i>
          </a>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6" alt="Contact info">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <i class="fas fa-envelope text-green-500 mr-3"></i>
            Other Ways to Reach Us
          </h2>
          <div class="space-y-4">
            <div class="flex items-start">
              <i class="fas fa-phone-alt text-green-500 mt-1 mr-4"></i>
              <div>
                <h3 class="font-medium text-gray-800">Phone Support</h3>
                <p class="text-gray-600">(800) 555-0199</p>
                <p class="text-sm text-gray-500">Mon-Fri, 8am-5pm EST</p>
              </div>
            </div>
            <div class="flex items-start">
              <i class="fas fa-envelope text-green-500 mt-1 mr-4"></i>
              <div>
                <h3 class="font-medium text-gray-800">Email Us</h3>
                <p class="text-gray-600"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="6b181e1b1b04191f2b08070e0a050d04040f45080406">[email&#160;protected]</a></p>
                <p class="text-sm text-gray-500">Response within 24 hours</p>
              </div>
            </div>
            <div class="flex items-start">
              <i class="fas fa-map-marker-alt text-green-500 mt-1 mr-4"></i>
              <div>
                <h3 class="font-medium text-gray-800">Visit Us</h3>
                <p class="text-gray-600">123 Farm Lane<br/>Agri Valley, CA 90210</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 bg-white rounded-xl shadow-sm overflow-hidden" alt="Company location">
      <div class="map-container relative" alt="Map image">
        <div class="absolute inset-0 bg-black opacity-20" alt="Background image"></div>
        <div class="absolute bottom-0 left-0 right-0 bg-white p-6" alt="CleanFood Headquarters
          123 Farm Lane, Ag">
          <h3 class="text-xl font-bold text-gray-800 mb-2">CleanFood Headquarters</h3>
          <p class="text-gray-600">123 Farm Lane, Agri Valley, CA 90210</p>
          <a href="#" class="inline-block mt-4 text-green-600 hover:text-green-800 font-medium" alt="Directions">
            Get Directions <i class="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="fixed bottom-6 right-6">
    <button class="chat-button bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center" alt="Live chat">
      <i class="fas fa-comment-dots text-2xl"></i>
    </button>
  </div></>
  )
}

export default ContactPage