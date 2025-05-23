import axios from '../config/axios-customize';

// Create a new logistics entry (shipping record)
export const createLogisticsEntry = (logisticsData) => {
  console.log('Creating logistics entry:', logisticsData);
  return axios.post('/logistics/create', logisticsData)
    .then(response => {
      console.log('Logistics entry created:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error creating logistics entry:', error.response || error);
      throw error;
    });
};

// Add logistics data (temperature, humidity, location updates) to an existing entry
export const addLogisticsData = (logisticsId, logisticsData) => {
  console.log('Adding logistics data to entry:', logisticsId, logisticsData);
  return axios.put(`/logistics/${logisticsId}/add-data`, logisticsData)
    .then(response => {
      console.log('Logistics data added:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error adding logistics data:', error.response || error);
      throw error;
    });
};

// Get all logistics entries for a product lot
export const getLogisticsByProductLot = (productLotId) => {
  return axios.get(`/logistics/product/${productLotId}`)
    .then(response => {
      console.log('Logistics entries retrieved:', response);
      return response;
    })
    .catch(error => {
      console.error('Error retrieving logistics entries:', error.response || error);
      throw error;
    });
};

// Lấy tất cả đơn vận chuyển
export const getAllLogistics = (params = {}) => {
  // Lọc các tham số có giá trị để chỉ gửi những tham số có dữ liệu
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
  );
  
  return axios.get('/logistics', { 
    params: filteredParams
  })
    .then(response => {
      console.log('All logistics entries retrieved:', response);
      return response;
    })
    .catch(error => {
      console.error('Error retrieving all logistics entries:', error.response || error);
      throw error;
    });
}; 