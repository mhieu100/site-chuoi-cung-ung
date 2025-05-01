import React from 'react'

const ProfilePage = () => {
  return (
    <>

      <div className="profile-header py-12" alt="Profile header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg mb-4 md:mb-0 md:mr-8" alt="Profile photo">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" alt="User photo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Maria Rodriguez</h1>
              <div className="flex items-center mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium mr-3" alt="Farmer">Farmer</span>
                <span className="text-gray-600"><i className="fas fa-map-marker-alt text-green-500 mr-1"></i> Portland, OR</span>
              </div>
              <p className="text-gray-600 max-w-lg">Organic vegetable farmer since 2018. Specializing in heirloom tomatoes and leafy greens. Committed to sustainable practices and transparent supply chains.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="stat-card bg-white rounded-lg p-6 shadow-sm transition duration-300" alt="Products stat">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-50 text-green-600 mr-4" alt="Background image">
                    <i className="fas fa-carrot text-xl"></i>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Products</p>
                    <h3 className="text-2xl font-bold">142</h3>
                    <p className="text-green-600 text-xs flex items-center">
                      <i className="fas fa-arrow-up mr-1"></i> 12% from last month
                    </p>
                  </div>
                </div>
              </div>
              <div className="stat-card bg-white rounded-lg p-6 shadow-sm transition duration-300" alt="Batches stat">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-amber-50 text-amber-600 mr-4" alt="Background image">
                    <i className="fas fa-boxes text-xl"></i>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Batches</p>
                    <h3 className="text-2xl font-bold">28</h3>
                    <p className="text-green-600 text-xs flex items-center">
                      <i className="fas fa-arrow-up mr-1"></i> 5% from last month
                    </p>
                  </div>
                </div>
              </div>
              <div className="stat-card bg-white rounded-lg p-6 shadow-sm transition duration-300" alt="Certifications stat">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4" alt="Background image">
                    <i className="fas fa-certificate text-xl"></i>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Certifications</p>
                    <h3 className="text-2xl font-bold">3</h3>
                    <p className="text-green-600 text-xs">
                      USDA Organic, Non-GMO, Fair Trade
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6" alt="Activity chart">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">Monthly Activity</h2>
                <select className="bg-gray-50 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm" alt="Last 30 days
                Last 90 days
            ">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>This year</option>
                </select>
              </div>
              <div className="chart-container" alt="Activity chart">
                <div className="flex items-end h-40 border-b border-l border-gray-200">
                  <div className="flex-1 flex flex-col items-center px-1">
                    <div className="bg-green-400 w-8 rounded-t" style={{ height: '60%' }} alt="Background image"></div>
                    <span className="text-xs text-gray-500 mt-1">Mon</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-1">
                    <div className="bg-green-400 w-8 rounded-t" style={{ height: '40%' }} alt="Background image"></div>
                    <span className="text-xs text-gray-500 mt-1">Tue</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-1">
                    <div className="bg-green-400 w-8 rounded-t" style={{ height: '80%' }} alt="Background image"></div>
                    <span className="text-xs text-gray-500 mt-1">Wed</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-1">
                    <div className="bg-green-400 w-8 rounded-t" style={{ height: '30%' }} alt="Background image"></div>
                    <span className="text-xs text-gray-500 mt-1">Thu</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-1">
                    <div className="bg-green-400 w-8 rounded-t" style={{ height: '70%' }} alt="Background image"></div>
                    <span className="text-xs text-gray-500 mt-1">Fri</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-1">
                    <div className="bg-green-400 w-8 rounded-t" style={{ height: '90%' }} alt="Background image"></div>
                    <span className="text-xs text-gray-500 mt-1">Sat</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-1">
                    <div className="bg-green-400 w-8 rounded-t" style={{ height: '50%' }} alt="Background image"></div>
                    <span className="text-xs text-gray-500 mt-1">Sun</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden" alt="Recent activity">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="activity-item p-6 hover:transition-colors duration-200" alt="Activity item">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="p-2 bg-green-100 rounded-full text-green-600" alt="Background image">
                        <i className="fas fa-seedling"></i>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Created new product batch</p>
                      <p className="text-sm text-gray-500 mb-1">Tomatoes - Heirloom Variety (Batch #TF-2025-0628)</p>
                      <p className="text-xs text-gray-400">Today, 10:24 AM</p>
                    </div>
                  </div>
                </div>
                <div className="activity-item p-6 hover:transition-colors duration-200" alt="Activity item">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="p-2 bg-blue-100 rounded-full text-blue-600" alt="Background image">
                        <i className="fas fa-truck"></i>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Completed delivery</p>
                      <p className="text-sm text-gray-500 mb-1">To Portland Farmers Market (12 items)</p>
                      <p className="text-xs text-gray-400">Yesterday, 3:45 PM</p>
                    </div>
                  </div>
                </div>
                <div className="activity-item p-6 hover:transition-colors duration-200" alt="Activity item">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="p-2 bg-amber-100 rounded-full text-amber-600" alt="Background image">
                        <i className="fas fa-qrcode"></i>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">QR code scan</p>
                      <p className="text-sm text-gray-500 mb-1">By Whole Foods Market - Seattle</p>
                      <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                  </div>
                </div>
                <div className="activity-item p-6 hover:transition-colors duration-200" alt="Activity item">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="p-2 bg-purple-100 rounded-full text-purple-600" alt="Background image">
                        <i className="fas fa-certificate"></i>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Certification updated</p>
                      <p className="text-sm text-gray-500 mb-1">USDA Organic renewal approved</p>
                      <p className="text-xs text-gray-400">June 25, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 text-center">
                <a href="#" className="text-sm font-medium text-green-600 hover:text-green-800" alt="View all">View all activity →</a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6" alt="Account info">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                  <p className="text-gray-800">Maria Rodriguez</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  <p className="text-gray-800"><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="bdd0dccfd4dcfddacfd8d8d3cbdcd1d1d8c4dbdccfd0ce93ded2d0">[email&#160;protected]</a></p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                  <p className="text-gray-800">(503) 555-0198</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Account Type</label>
                  <p className="text-gray-800">Farmer (Verified)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                  <p className="text-gray-800">March 12, 2020</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center" alt="Edit profile">
                  <i className="fas fa-user-edit mr-2"></i>
                  Edit Profile
                </button>
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center" alt="Change password">
                  <i className="fas fa-key mr-2"></i>
                  Change Password
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6" alt="Connected farms">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Connected Farms</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden" alt="Farm logo">
                    <img src="https://images.unsplash.com/photo-1654624747708-13705c045a4b?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=100&amp;q=80" alt="Farm photo" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Green Valley Organic Farm</p>
                    <p className="text-xs text-gray-500">Owner</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden" alt="Farm logo">
                    <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=100&amp;q=80" alt="Farm photo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Willamette Growers Cooperative</p>
                    <p className="text-xs text-gray-500">Member</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center" alt="Manage farms">
                <i className="fas fa-plus-circle mr-2"></i>
                Connect New Farm
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6" alt="Export data">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Export Data</h2>
              <p className="text-sm text-gray-600 mb-4">Download your farming activity and supply chain data for records or analysis.</p>
              <div className="space-y-3">
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center" alt="Export CSV">
                  <i className="fas fa-file-csv mr-2"></i>
                  Export as CSV
                </button>
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center" alt="Export PDF">
                  <i className="fas fa-file-pdf mr-2"></i>
                  Export as PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage