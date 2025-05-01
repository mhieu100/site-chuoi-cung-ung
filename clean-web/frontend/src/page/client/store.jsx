import React from 'react'

const StorePage = () => {
  return (
    <>
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">All Products</h1>
        <p className="text-gray-600">Browse our selection of fresh, sustainable agricultural products from verified farms</p>
      </div>
  
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <div className="relative" alt="Search products">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Search for products..." alt="Search input" />
          </div>
        </div>
  
        <div className="w-full md:w-auto">
          <select className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" alt="Sort options">
            <option>Sort by: Featured</option>
            <option>Sort by: Newest</option>
            <option>Sort by: Price: Low to High</option>
            <option>Sort by: Price: High to Low</option>
            <option>Sort by: Name A-Z</option>
          </select>
        </div>
  
        <button className="md:hidden flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm text-gray-700" alt="Filters button">
          <i className="fas fa-filter mr-2"></i>
          Filters
        </button>
      </div>
  
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-72 hidden md:block">
          <div className="bg-white rounded-lg shadow-sm p-6 filter-section overflow-y-auto max-h-[calc(100vh-200px)] sticky top-4" alt="Filters">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Filters</h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Product Type</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input id="fruits" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="fruits" className="ml-3 text-sm text-gray-600">Fruits</label>
                </div>
                <div className="flex items-center">
                  <input id="vegetables" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="vegetables" className="ml-3 text-sm text-gray-600">Vegetables</label>
                </div>
                <div className="flex items-center">
                  <input id="grains" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="grains" className="ml-3 text-sm text-gray-600">Grains</label>
                </div>
                <div className="flex items-center">
                  <input id="dairy" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="dairy" className="ml-3 text-sm text-gray-600">Dairy</label>
                </div>
                <div className="flex items-center">
                  <input id="meat" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="meat" className="ml-3 text-sm text-gray-600">Meat &amp; Poultry</label>
                </div>
              </div>
            </div>
  
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Origin</h3>
              <select className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm" alt="Origin select">
                <option>All Regions</option>
                <option>North America</option>
                <option>South America</option>
                <option>Europe</option>
                <option>Asia</option>
                <option>Africa</option>
                <option>Australia</option>
              </select>
            </div>
  
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Certification</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input id="organic" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="organic" className="ml-3 text-sm text-gray-600">Organic</label>
                </div>
                <div className="flex items-center">
                  <input id="fairtrade" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="fairtrade" className="ml-3 text-sm text-gray-600">Fair Trade</label>
                </div>
                <div className="flex items-center">
                  <input id="non-gmo" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="non-gmo" className="ml-3 text-sm text-gray-600">Non-GMO</label>
                </div>
                <div className="flex items-center">
                  <input id="regenerative" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="regenerative" className="ml-3 text-sm text-gray-600">Regenerative</label>
                </div>
              </div>
            </div>
  
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input id="in-stock" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="in-stock" className="ml-3 text-sm text-gray-600">In Stock</label>
                </div>
                <div className="flex items-center">
                  <input id="pre-order" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="pre-order" className="ml-3 text-sm text-gray-600">Pre-Order</label>
                </div>
                <div className="flex items-center">
                  <input id="seasonal" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="seasonal" className="ml-3 text-sm text-gray-600">Seasonal</label>
                </div>
              </div>
            </div>
  
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">$0</span>
                <span className="text-xs text-gray-500">$100+</span>
              </div>
              <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" min="0" max="100" alt="Price range" />
            </div>
  
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-700 transition-colors" alt="Apply filters">
              Apply Filters
            </button>
          </div>
        </div>
  
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">Showing 1-12 of 48 products</p>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-md bg-white text-gray-500 border border-gray-300" alt="Grid view">
                <i className="fas fa-th"></i>
              </button>
              <button className="p-2 rounded-md bg-gray-100 text-gray-700 border border-gray-300" alt="List view">
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="product-card bg-white rounded-lg shadow-sm overflow-hidden transition duration-300" alt="Product card">
              <div className="relative h-48 bg-gray-100 overflow-hidden" alt="Product image">
                <img src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Organic rice" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full" alt="Organic">Organic</div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-800">Organic Basmati Rice</h3>
                  <span className="text-green-600 font-medium">$8.99/kg</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  <span>Punjab, India</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-gray-600">Available: 120 kg</span>
                  <span className="flex items-center">
                    <i className="fas fa-star text-yellow-400 mr-1"></i>
                    4.8 (24)
                  </span>
                </div>
                <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-md text-sm font-medium transition-colors" alt="View details">
                  View Details
                </button>
              </div>
            </div>
  
            <div className="product-card bg-white rounded-lg shadow-sm overflow-hidden transition duration-300" alt="Product card">
              <div className="relative h-48 bg-gray-100 overflow-hidden" alt="Product image">
                <img src="https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Fresh mangoes" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full" alt="Seasonal">Seasonal</div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-800">Alphonso Mangoes</h3>
                  <span className="text-green-600 font-medium">$3.49/each</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  <span>Ratnagiri, India</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-gray-600">Available: 45 boxes</span>
                  <span className="flex items-center">
                    <i className="fas fa-star text-yellow-400 mr-1"></i>
                    4.9 (36)
                  </span>
                </div>
                <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-md text-sm font-medium transition-colors" alt="View details">
                  View Details
                </button>
              </div>
            </div>
  
            <div className="product-card bg-white rounded-lg shadow-sm overflow-hidden transition duration-300" alt="Product card">
              <div className="relative h-48 bg-gray-100 overflow-hidden" alt="Product image">
                <img src="https://images.unsplash.com/photo-1515442261605-65987783cb6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Coffee beans" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 flex space-x-1">
                  <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full" alt="Organic">Organic</div>
                  <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full" alt="Fair Trade">Fair Trade</div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-800">Arabica Coffee Beans</h3>
                  <span className="text-green-600 font-medium">$12.99/lb</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  <span>Antioquia, Colombia</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-gray-600">Available: 28 lb</span>
                  <span className="flex items-center">
                    <i className="fas fa-star text-yellow-400 mr-1"></i>
                    4.7 (42)
                  </span>
                </div>
                <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-md text-sm font-medium transition-colors" alt="View details">
                  View Details
                </button>
              </div>
            </div>
  
            <div className="product-card bg-white rounded-lg shadow-sm overflow-hidden transition duration-300" alt="Product card">
              <div className="relative h-48 bg-gray-100 overflow-hidden" alt="Product image">
                <img src="https://images.unsplash.com/photo-1722553908840-f933748f385c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Organic apples" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full" alt="Organic">Organic</div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-800">Honeycrisp Apples</h3>
                  <span className="text-green-600 font-medium">$2.99/lb</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  <span>Washington, USA</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-gray-600">Available: 150 lb</span>
                  <span className="flex items-center">
                    <i className="fas fa-star text-yellow-400 mr-1"></i>
                    4.6 (31)
                  </span>
                </div>
                <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-md text-sm font-medium transition-colors" alt="View details">
                  View Details
                </button>
              </div>
            </div>
  
            <div className="product-card bg-white rounded-lg shadow-sm overflow-hidden transition duration-300" alt="Product card">
              <div className="relative h-48 bg-gray-100 overflow-hidden" alt="Product image">
                <img src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Free range" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full" alt="Free Range">Free Range</div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-800">Pasture-Raised Eggs</h3>
                  <span className="text-green-600 font-medium">$5.99/dozen</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  <span>Vermont, USA</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-gray-600">Available: 35 dozen</span>
                  <span className="flex items-center">
                    <i className="fas fa-star text-yellow-400 mr-1"></i>
                    4.8 (29)
                  </span>
                </div>
                <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-md text-sm font-medium transition-colors" alt="View details">
                  View Details
                </button>
              </div>
            </div>
  
            <div className="product-card bg-white rounded-lg shadow-sm overflow-hidden transition duration-300" alt="Product card">
              <div className="relative h-48 bg-gray-100 overflow-hidden" alt="Product image">
                <img src="https://images.unsplash.com/photo-1595303477117-8dddd2894299?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Heirloom tomatoes" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-3 right-3 flex space-x-1">
                  <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full" alt="Organic">Organic</div>
                  <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full" alt="Heirloom">Heirloom</div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-800">Heirloom Tomatoes</h3>
                  <span className="text-green-600 font-medium">$4.99/lb</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  <span>California, USA</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-gray-600">Available: 40 lb</span>
                  <span className="flex items-center">
                    <i className="fas fa-star text-yellow-400 mr-1"></i>
                    4.9 (18)
                  </span>
                </div>
                <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-md text-sm font-medium transition-colors" alt="View details">
                  View Details
                </button>
              </div>
            </div>
          </div>
  
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-1" alt="Pagination navigation">
              <button type="button" className="p-2 rounded-md text-gray-400 bg-white border border-gray-300 disabled:opacity-50" disabled alt="Previous page">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button type="button" className="px-4 py-2 rounded-md text-white bg-green-600 border border-green-600 font-medium" alt="Page 1">1</button>
              <button type="button" className="px-4 py-2 rounded-md text-gray-700 bg-white border border-gray-300 font-medium hover:bg-gray-50" alt="Page 2">2</button>
              <button type="button" className="px-4 py-2 rounded-md text-gray-700 bg-white border border-gray-300 font-medium hover:bg-gray-50" alt="Page 3">3</button>
              <button type="button" className="px-4 py-2 rounded-md text-gray-700 bg-white border border-gray-300 font-medium hover:bg-gray-50" alt="Page 4">4</button>
              <span className="px-2 py-2 text-gray-700">...</span>
              <button type="button" className="px-4 py-2 rounded-md text-gray-700 bg-white border border-gray-300 font-medium hover:bg-gray-50" alt="Page 8">8</button>
              <button type="button" className="p-2 rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50" alt="Next page">
                <i className="fas fa-chevron-right"></i>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default StorePage