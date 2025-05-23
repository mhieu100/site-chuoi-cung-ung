import axios from '../config/axios-customize';

// Create a new inspection/certification record for a product lot
export const verifyProduct = (productLotId, result, notes, certificateFile) => {
  console.log('Creating inspection record:', { productLotId, result, notes });
  
  // Create FormData to handle file upload
  const formData = new FormData();
  formData.append('result', result);
  
  if (notes) {
    formData.append('notes', notes);
  }
  
  // If we have a file, append it to the formData
  if (certificateFile) {
    formData.append('file', certificateFile);
  }
  
  return axios.post(`/inspection/verify/${productLotId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      console.log('Inspection record created:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error creating inspection record:', error.response || error);
      throw error;
    });
};

// Get all inspection records for a product lot
export const getInspectionsByProductLot = (productLotId) => {
  return axios.get(`/inspection/product/${productLotId}`)
    .then(response => {
      console.log('Inspection records retrieved:', response);
      return response;
    })
    .catch(error => {
      console.error('Error retrieving inspection records:', error.response || error);
      throw error;
    });
}; 