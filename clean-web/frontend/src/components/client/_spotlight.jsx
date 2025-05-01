import React from 'react'

const Spotlight = () => {
  return (
    <>
    <div class="bg-white py-12" alt="Meet Our Farmers
          
          Partnered Orga">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-base text-green-600 font-semibold tracking-wide uppercase">Meet Our Farmers</h2>
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Partnered Organic Farms
        </p>
      </div>
      <div class="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div class="bg-green-50 rounded-lg overflow-hidden shadow" alt="Green Valley Organic
            Family farm since">
          <img class="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="farmer working" />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900">Green Valley Organic</h3>
            <p class="mt-2 text-gray-600">Family farm since 1985 specializing in heirloom vegetables</p>
            <div class="mt-4 flex items-center">
              <div class="flex-shrink-0">
                <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center" alt="Background image">
                  <i class="fas fa-map-marker-alt text-green-600"></i>
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">Sonoma County, CA</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-green-50 rounded-lg overflow-hidden shadow" alt="Sunrise Orchard
            Certified organic frui">
          <img class="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="farm fields" />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900">Sunrise Orchard</h3>
            <p class="mt-2 text-gray-600">Certified organic fruits with biodynamic practices</p>
            <div class="mt-4 flex items-center">
              <div class="flex-shrink-0">
                <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center" alt="Background image">
                  <i class="fas fa-map-marker-alt text-green-600"></i>
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">Hood River, OR</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-green-50 rounded-lg overflow-hidden shadow" alt="Heritage Acres
            Regenerative agricultur">
          <img class="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1533241242276-46a506b40d66?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="farmer harvesting" loading="lazy" />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900">Heritage Acres</h3>
            <p class="mt-2 text-gray-600">Regenerative agriculture for pasture-raised livestock</p>
            <div class="mt-4 flex items-center">
              <div class="flex-shrink-0">
                <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center" alt="Background image">
                  <i class="fas fa-map-marker-alt text-green-600"></i>
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">Boulder, CO</p>
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