import React from 'react'

const BlogPage = () => {
    return (
        <>
            <div class="bg-green-600 py-16 text-white" alt="Blog header">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl md:text-5xl font-bold mb-4">Clean Agriculture Insights</h1>
                    <p class="text-xl max-w-2xl mx-auto">Discover stories, tips and innovations in sustainable farming and ethical supply chains</p>
                </div>
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="featured-article rounded-xl shadow-sm overflow-hidden mb-16 h-96 flex items-end text-white" alt="Featured article">
                    <div class="p-8 w-full">
                        <div class="inline-block bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4" alt="FEATURED">FEATURED</div>
                        <h2 class="text-3xl font-bold mb-2">The Future of Organic Farming in Urban Spaces</h2>
                        <p class="mb-4">How vertical farming is revolutionizing local food production while reducing carbon footprint.</p>
                        <div class="flex items-center">
                            <div class="w-10 h-10 rounded-full bg-white mr-3" alt="Author photo"></div>
                            <div>
                                <p class="text-sm font-medium">Maria Rodriguez</p>
                                <p class="text-xs opacity-80">May 15, 2025 · 8 min read</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-12">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">Browse Categories</h2>
                    <div class="flex flex-wrap gap-3">
                        <a href="#" class="category-chip bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium" alt="Organic tips">Organic Tips</a>
                        <a href="#" class="category-chip bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium" alt="Farmer stories">Farmer Stories</a>
                        <a href="#" class="category-chip bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium" alt="Supply chain">Supply Chain</a>
                        <a href="#" class="category-chip bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium" alt="Sustainable tech">Sustainable Tech</a>
                        <a href="#" class="category-chip bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium" alt="Market trends">Market Trends</a>
                        <a href="#" class="category-chip bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium" alt="Certifications">Certifications</a>
                    </div>
                </div>

                <div class="mb-12">
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div class="article-card bg-white rounded-xl shadow-sm overflow-hidden transition duration-300" alt="Article card">
                            <div class="h-48 bg-gray-100 overflow-hidden" alt="Article image">
                                <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" class="w-full h-full object-cover" alt="Organic farm" />
                            </div>
                            <div class="p-6">
                                <div class="flex justify-between items-center mb-3">
                                    <span class="text-xs font-medium text-green-600">ORGANIC TIPS</span>
                                    <span class="text-xs text-gray-500">Jun 2, 2025</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-800 mb-2">5 Simple Steps to Transition to Organic Farming</h3>
                                <p class="text-gray-600 mb-4">Practical advice for conventional farmers looking to make the switch to organic methods without breaking the bank.</p>
                                <div class="flex items-center">
                                    <div class="w-8 h-8 rounded-full bg-gray-200 mr-2" alt="Author photo"></div>
                                    <span class="text-sm font-medium">James Wilson</span>
                                </div>
                            </div>
                        </div>

                        <div class="article-card bg-white rounded-xl shadow-sm overflow-hidden transition duration-300" alt="Article card">
                            <div class="h-48 bg-gray-100 overflow-hidden" alt="Article image">
                                <img src="https://images.unsplash.com/photo-1510583085145-1b347ee019ff?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" class="w-full h-full object-cover" alt="Farmer portrait" loading="lazy" />
                            </div>
                            <div class="p-6">
                                <div class="flex justify-between items-center mb-3">
                                    <span class="text-xs font-medium text-green-600">FARMER STORIES</span>
                                    <span class="text-xs text-gray-500">May 28, 2025</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Meet the Family Preserving Heirloom Varieties</h3>
                                <p class="text-gray-600 mb-4">How the Hernandez family in New Mexico is keeping traditional farming practices alive in the modern age.</p>
                                <div class="flex items-center">
                                    <div class="w-8 h-8 rounded-full bg-gray-200 mr-2" alt="Author photo"></div>
                                    <span class="text-sm font-medium">Sarah Johnson</span>
                                </div>
                            </div>
                        </div>

                        <div class="article-card bg-white rounded-xl shadow-sm overflow-hidden transition duration-300" alt="Article card">
                            <div class="h-48 bg-gray-100 overflow-hidden" alt="Article image">
                                <img src="https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" class="w-full h-full object-cover" alt="Blockchain tech" />
                            </div>
                            <div class="p-6">
                                <div class="flex justify-between items-center mb-3">
                                    <span class="text-xs font-medium text-green-600">SUPPLY CHAIN</span>
                                    <span class="text-xs text-gray-500">May 20, 2025</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Blockchain for Food Transparency: What You Need to Know</h3>
                                <p class="text-gray-600 mb-4">Exploring how distributed ledger technology is creating unprecedented visibility in agricultural supply chains.</p>
                                <div class="flex items-center">
                                    <div class="w-8 h-8 rounded-full bg-gray-200 mr-2" alt="Author photo"></div>
                                    <span class="text-sm font-medium">David Chen</span>
                                </div>
                            </div>
                        </div>

                        <div class="article-card bg-white rounded-xl shadow-sm overflow-hidden transition duration-300" alt="Article card">
                            <div class="h-48 bg-gray-100 overflow-hidden" alt="Article image">
                                <img src="https://images.unsplash.com/photo-1536657464919-892534f60d6e?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" class="w-full h-full object-cover" alt="Compost pile" />
                            </div>
                            <div class="p-6">
                                <div class="flex justify-between items-center mb-3">
                                    <span class="text-xs font-medium text-green-600">ORGANIC TIPS</span>
                                    <span class="text-xs text-gray-500">May 12, 2025</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-800 mb-2">The Art and Science of Perfect Compost</h3>
                                <p class="text-gray-600 mb-4">Master the balance of greens, browns, moisture and aeration for nutrient-rich compost that supercharges your soil.</p>
                                <div class="flex items-center">
                                    <div class="w-8 h-8 rounded-full bg-gray-200 mr-2" alt="Author photo"></div>
                                    <span class="text-sm font-medium">Emily Parker</span>
                                </div>
                            </div>
                        </div>

                        <div class="article-card bg-white rounded-xl shadow-sm overflow-hidden transition duration-300" alt="Article card">
                            <div class="h-48 bg-gray-100 overflow-hidden" alt="Article image">
                                <img src="https://images.unsplash.com/photo-1626906722163-bd4c03cb3b9b?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" class="w-full h-full object-cover" alt="Farm workers" loading="lazy" />
                            </div>
                            <div class="p-6">
                                <div class="flex justify-between items-center mb-3">
                                    <span class="text-xs font-medium text-green-600">FARMER STORIES</span>
                                    <span class="text-xs text-gray-500">May 5, 2025</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Fair Trade Certification: Impact on Smallholder Farmers</h3>
                                <p class="text-gray-600 mb-4">First-hand accounts from coffee growers in Colombia on how fair trade practices have transformed their communities.</p>
                                <div class="flex items-center">
                                    <div class="w-8 h-8 rounded-full bg-gray-200 mr-2" alt="Author photo"></div>
                                    <span class="text-sm font-medium">Carlos Mendez</span>
                                </div>
                            </div>
                        </div>

                        <div class="article-card bg-white rounded-xl shadow-sm overflow-hidden transition duration-300" alt="Article card">
                            <div class="h-48 bg-gray-100 overflow-hidden" alt="Article image">
                                <img src="https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" class="w-full h-full object-cover" alt="Solar panels" />
                            </div>
                            <div class="p-6">
                                <div class="flex justify-between items-center mb-3">
                                    <span class="text-xs font-medium text-green-600">SUSTAINABLE TECH</span>
                                    <span class="text-xs text-gray-500">Apr 28, 2025</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Renewable Energy Solutions for Remote Farms</h3>
                                <p class="text-gray-600 mb-4">Exploring solar, wind and micro-hydro options that are making off-grid farming more viable than ever.</p>
                                <div class="flex items-center">
                                    <div class="w-8 h-8 rounded-full bg-gray-200 mr-2" alt="Author photo"></div>
                                    <span class="text-sm font-medium">Rachel Kim</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center">
                    <nav class="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" alt="Previous page">
                            <i class="fas fa-chevron-left"></i>
                        </a>
                        <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-green-600 hover:bg-gray-50" alt="Page 1">1</a>
                        <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50" alt="Page 2">2</a>
                        <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50" alt="Page 3">3</a>
                        <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700" alt="Ellipsis">...</span>
                        <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50" alt="Page 8">8</a>
                        <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" alt="Next page">
                            <i class="fas fa-chevron-right"></i>
                        </a>
                    </nav>
                </div>
            </div>

            <div class="bg-green-50 py-16" alt="Newsletter section">
                <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">Stay Updated on Sustainable Agriculture</h2>
                    <p class="text-gray-600 mb-6">Join our newsletter to receive the latest articles, research and farm stories directly to your inbox.</p>
                    <form class="flex flex-col sm:flex-row gap-3">
                        <input type="email" placeholder="Your email address" class="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" alt="Email input" />
                        <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium" alt="Subscribe button">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default BlogPage