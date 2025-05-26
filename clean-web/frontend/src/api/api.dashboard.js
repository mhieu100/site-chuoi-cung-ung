import axios from '../config/axios-customize';

// Get combined dashboard statistics (inspection + logistics)
export const getDashboardStats = () => {
  return axios.get('/api/dashboard/stats')
    .then(response => {
      console.log('Dashboard stats retrieved:', response);
      return response;
    })
    .catch(error => {
      console.error('Error retrieving dashboard stats:', error.response || error);
      throw error;
    });
};

// Get pending inspections for dashboard
export const getPendingInspections = (limit = 5) => {
  return axios.get('/api/dashboard/pending-inspections', {
    params: { limit }
  })
    .then(response => {
      console.log('Pending inspections retrieved:', response);
      return response;
    })
    .catch(error => {
      console.error('Error retrieving pending inspections:', error.response || error);
      throw error;
    });
};

// Get recent certifications for dashboard
export const getRecentCertifications = (limit = 5) => {
  return axios.get('/api/dashboard/recent-certifications', {
    params: { limit }
  })
    .then(response => {
      console.log('Recent certifications retrieved:', response);
      return response;
    })
    .catch(error => {
      console.error('Error retrieving recent certifications:', error.response || error);
      throw error;
    });
};

// Get recent shipments for dashboard
export const getRecentShipments = (limit = 5) => {
  return axios.get('/api/dashboard/recent-shipments', {
    params: { limit }
  })
    .then(response => {
      console.log('Recent shipments retrieved:', response);
      return response;
    })
    .catch(error => {
      console.error('Error retrieving recent shipments:', error.response || error);
      throw error;
    });
};

// Get product statistics by status
export const getProductStatsByStatus = () => {
  return axios.get('/api/dashboard/product-stats')
    .then(response => {
      console.log('Product stats retrieved:', response);
      return response;
    })
    .catch(error => {
      console.error('Error retrieving product stats:', error.response || error);
      throw error;
    });
};

// Temporary function to generate mock data for dashboard
// This will be removed when backend endpoints are implemented
export const getMockDashboardData = () => {
  // Mock data for dashboard
  const mockData = {
    stats: {
      pendingInspections: 15,
      completedInspections: 67,
      certifiedProducts: 54,
      rejectedProducts: 13,
      activeShipments: 12,
      completedShipments: 48,
      totalProducts: 87,
      onTimeDelivery: 93
    },
    pendingInspections: [
      {
        id: 'P10025',
        productName: 'Cà chua hữu cơ',
        farmerName: 'Nguyễn Văn A',
        requestDate: new Date(2023, 10, 25, 8, 30),
        location: 'Hà Nội, Việt Nam',
        priority: 'HIGH'
      },
      {
        id: 'P10024',
        productName: 'Bắp cải organic',
        farmerName: 'Trần Thị B',
        requestDate: new Date(2023, 10, 24, 10, 15),
        location: 'Đà Lạt, Việt Nam',
        priority: 'MEDIUM'
      },
      {
        id: 'P10023',
        productName: 'Ớt chuông xanh',
        farmerName: 'Phạm Văn C',
        requestDate: new Date(2023, 10, 23, 7, 45),
        location: 'Đồng Nai, Việt Nam',
        priority: 'LOW'
      }
    ],
    recentCertifications: [
      {
        id: 'C10025',
        productName: 'Dưa hấu sạch',
        result: 'PASS',
        farmerName: 'Vũ Văn E',
        certDate: new Date(2023, 10, 20, 15, 30),
        certType: 'Organic'
      },
      {
        id: 'C10024',
        productName: 'Bí đỏ hữu cơ',
        result: 'PASS',
        farmerName: 'Hoàng Thị F',
        certDate: new Date(2023, 10, 19, 11, 15),
        certType: 'Non-GMO'
      },
      {
        id: 'C10023',
        productName: 'Chuối tiêu',
        result: 'FAIL',
        farmerName: 'Ngô Văn G',
        certDate: new Date(2023, 10, 18, 9, 45),
        certType: 'Organic'
      }
    ],
    recentShipments: [
      {
        id: 'L10025',
        productName: 'Bắp cải organic',
        status: 'IN_TRANSIT',
        departedAt: new Date(2023, 10, 25, 8, 30),
        destination: 'Hà Nội, Việt Nam',
        completion: 67
      },
      {
        id: 'L10024',
        productName: 'Cà chua hữu cơ',
        status: 'DELIVERED',
        departedAt: new Date(2023, 10, 24, 10, 15),
        destination: 'Hồ Chí Minh, Việt Nam',
        completion: 100
      },
      {
        id: 'L10023',
        productName: 'Rau xà lách xoăn',
        status: 'IN_TRANSIT',
        departedAt: new Date(2023, 10, 23, 7, 45),
        destination: 'Đà Nẵng, Việt Nam',
        completion: 42
      }
    ]
  };

  return Promise.resolve({ data: mockData });
};
