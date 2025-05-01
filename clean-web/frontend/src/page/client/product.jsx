import React from 'react'

const ProductPage = () => {
    return (
        <>
            <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="flex flex-col md:flex-row gap-8">
                    <div class="w-full md:w-1/3">
                        <div class="bg-green-50 rounded-lg p-6 shadow-sm" alt="Scan Product QR Code">
                            <h2 class="text-xl font-semibold text-gray-900 mb-4">Scan Product QR Code</h2>
                            <div class="bg-white rounded-lg border-2 border-dashed border-green-200 p-8 flex flex-col items-center justify-center mb-4"
                                style={{ minHeight: '250px' }} alt="Point your camera at the product QR code">
                                <i class="fas fa-qrcode text-gray-300 text-6xl mb-4"></i>
                                <p class="text-gray-500 text-center mb-4">Point your camera at the product QR code</p>
                                <button
                                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                                    alt="Scan QR Code">
                                    <i class="fas fa-camera mr-2"></i> Open Scanner
                                </button>
                            </div>
                            <div class="mt-4">
                                <label for="qr-input" class="block text-sm font-medium text-gray-700 mb-1">Or enter QR code
                                    manually</label>
                                <div class="flex">
                                    <input type="text" id="qr-input"
                                        class="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        placeholder="Enter product code" />
                                    <button
                                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md text-sm font-medium"
                                        alt="Search Product">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="bg-green-50 rounded-lg p-6 shadow-sm mt-6" alt="Certifications
            
              
             ">
                            <h2 class="text-xl font-semibold text-gray-900 mb-4">Certifications</h2>
                            <div class="space-y-3">
                                <div class="flex items-start">
                                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center"
                                        alt="Certification icon">
                                        <i class="fas fa-certificate text-green-600"></i>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm font-medium text-gray-900">USDA Organic Certified</p>
                                        <p class="text-sm text-gray-500">Certified since 2022</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center"
                                        alt="Certification icon">
                                        <i class="fas fa-leaf text-green-600"></i>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm font-medium text-gray-900">Non-GMO Verified</p>
                                        <p class="text-sm text-gray-500">Verified since 2021</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center"
                                        alt="Certification icon">
                                        <i class="fas fa-globe-americas text-green-600"></i>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm font-medium text-gray-900">Carbon Neutral Certified</p>
                                        <p class="text-sm text-gray-500">Certified since 2023</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full md:w-2/3">
                        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100" alt="Organic Hass Avocados
                Product ID: AV">
                            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                <div>
                                    <h1 class="text-2xl font-bold text-gray-900">Organic Hass Avocados</h1>
                                    <p class="text-green-600 font-medium">Product ID: AVO-OR-2025-4872</p>
                                </div>
                                <div class="mt-4 md:mt-0">
                                    <span
                                        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                                        alt="Verified">
                                        <i class="fas fa-check-circle mr-1"></i> Verified
                                    </span>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div class="bg-green-50 rounded-lg p-4" alt="Product Details
                
                  
    ">
                                    <h3 class="font-medium text-gray-900 mb-2">Product Details</h3>
                                    <div class="space-y-2">
                                        <div>
                                            <p class="text-xs text-gray-500">Variety</p>
                                            <p class="text-sm font-medium">Hass Avocado</p>
                                        </div>
                                        <div>
                                            <p class="text-xs text-gray-500">Harvest Date</p>
                                            <p class="text-sm font-medium">March 15, 2025</p>
                                        </div>
                                        <div>
                                            <p class="text-xs text-gray-500">Package Date</p>
                                            <p class="text-sm font-medium">March 18, 2025</p>
                                        </div>
                                        <div>
                                            <p class="text-xs text-gray-500">Best Before</p>
                                            <p class="text-sm font-medium">April 30, 2025</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-green-50 rounded-lg p-4" alt="Farm Information
                
                  
   ">
                                    <h3 class="font-medium text-gray-900 mb-2">Farm Information</h3>
                                    <div class="space-y-2">
                                        <div>
                                            <p class="text-xs text-gray-500">Farm Name</p>
                                            <p class="text-sm font-medium">Sunset Organic Farms</p>
                                        </div>
                                        <div>
                                            <p class="text-xs text-gray-500">Location</p>
                                            <p class="text-sm font-medium">San Diego County, California</p>
                                        </div>
                                        <div>
                                            <p class="text-xs text-gray-500">Farmer</p>
                                            <p class="text-sm font-medium">Maria Rodriguez</p>
                                        </div>
                                        <div>
                                            <p class="text-xs text-gray-500">Acres</p>
                                            <p class="text-sm font-medium">120 acres</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 class="text-xl font-semibold text-gray-900 mb-6">Supply Chain Journey</h2>
                                <div class="relative pl-6 space-y-8">
                                    <div class="relative timeline-item">
                                        <div class="absolute left-0 h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white"
                                            alt="Background image">
                                            <i class="fas fa-seedling"></i>
                                        </div>
                                        <div class="ml-10">
                                            <h3 class="text-lg font-medium text-gray-900">Planting &amp; Growth</h3>
                                            <p class="text-sm text-gray-500 mb-2">March 2024 - February 2025</p>
                                            <div class="bg-green-50 rounded-lg p-4"
                                                alt="Trees planted in organic soil with natural compost">
                                                <p class="text-sm text-gray-700">Trees planted in organic soil with natural
                                                    compost. Regular monitoring for pests and growth.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="relative timeline-item">
                                        <div class="absolute left-0 h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white"
                                            alt="Background image">
                                            <i class="fas fa-hand-paper"></i>
                                        </div>
                                        <div class="ml-10">
                                            <h3 class="text-lg font-medium text-gray-900">Harvest</h3>
                                            <p class="text-sm text-gray-500 mb-2">March 15, 2025</p>
                                            <div class="bg-green-50 rounded-lg p-4"
                                                alt="Hand-picked at optimal ripeness by trained workers">
                                                <p class="text-sm text-gray-700">Hand-picked at optimal ripeness by trained
                                                    workers. Immediately placed in temperature-controlled bins.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="relative timeline-item">
                                        <div class="absolute left-0 h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white"
                                            alt="Background image">
                                            <i class="fas fa-warehouse"></i>
                                        </div>
                                        <div class="ml-10">
                                            <h3 class="text-lg font-medium text-gray-900">Processing</h3>
                                            <p class="text-sm text-gray-500 mb-2">March 16-17, 2025</p>
                                            <div class="bg-green-50 rounded-lg p-4"
                                                alt="Graded, washed, and packed in eco-friendly packagi">
                                                <p class="text-sm text-gray-700">Graded, washed, and packed in eco-friendly
                                                    packaging. Temperature maintained at 8°C throughout.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="relative timeline-item">
                                        <div class="absolute left-0 h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white"
                                            alt="Background image">
                                            <i class="fas fa-truck"></i>
                                        </div>
                                        <div class="ml-10">
                                            <h3 class="text-lg font-medium text-gray-900">Transport</h3>
                                            <p class="text-sm text-gray-500 mb-2">March 18-20, 2025</p>
                                            <div class="bg-green-50 rounded-lg p-4"
                                                alt="Shipped in refrigerated truck with IoT temperature">
                                                <p class="text-sm text-gray-700">Shipped in refrigerated truck with IoT
                                                    temperature monitoring. Average temp: 7.5°C.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="relative">
                                        <div class="absolute left-0 h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white"
                                            alt="Background image">
                                            <i class="fas fa-store"></i>
                                        </div>
                                        <div class="ml-10">
                                            <h3 class="text-lg font-medium text-gray-900">Retail</h3>
                                            <p class="text-sm text-gray-500 mb-2">March 21, 2025 - Present</p>
                                            <div class="bg-green-50 rounded-lg p-4"
                                                alt="Displayed in organic produce section at 10°C. Prod">
                                                <p class="text-sm text-gray-700">Displayed in organic produce section at 10°C.
                                                    Product sold at GreenGrocers Market in Portland, OR.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mt-6" alt="Blockchain Verification
                This product">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center"
                                    alt="Blockchain icon">
                                    <i class="fas fa-link text-green-600"></i>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-900">Blockchain Verification</h3>
                                    <p class="text-sm text-gray-500">This product's journey is recorded on the Ethereum
                                        blockchain</p>
                                </div>
                            </div>
                            <div class="mt-4 grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">5</p>
                                    <p class="text-xs text-gray-500">Data Points</p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-900">0x48...3f2a</p>
                                    <p class="text-xs text-gray-500">Transaction Hash</p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-900">12</p>
                                    <p class="text-xs text-gray-500">Verifications</p>
                                </div>
                            </div>
                            <button
                                class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
                                alt="View on Blockchain">
                                <i class="fas fa-external-link-alt mr-2"></i> View on Blockchain Explorer
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProductPage