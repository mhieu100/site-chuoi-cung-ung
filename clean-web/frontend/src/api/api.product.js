import axios from '../config/axios-customize';

// Tạo lô nông sản mới
export const createProductLot = (productLotData) => {
  return axios.post('/product-lots', productLotData);
};

// Lấy thông tin lô nông sản theo ID
export const getProductLotById = (id) => {
  return axios.get(`/product-lots/${id}`);
};

// Cập nhật thông tin lô nông sản
export const updateProductLot = (id, productLotData) => {
  return axios.put(`/product-lots/${id}`, productLotData);
};

// Xóa lô nông sản
export const deleteProductLot = (id) => {
  return axios.delete(`/product-lots/${id}`);
};

// Lấy tất cả lô nông sản
export const getAllProductLots = (params = {}) => {
  // Lọc các tham số có giá trị để chỉ gửi những tham số có dữ liệu
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
  );
  
  return axios.get('/product-lots', { 
    params: filteredParams
  });
};

// Lấy danh sách lô nông sản theo wallet địa chỉ của nông dân
export const getProductLotsByFarmerWallet = (walletAddress) => {
  return axios.get('/product-lots', {
    params: { farmerWalletAddress: walletAddress }
  });
};

// Lấy danh sách lô nông sản theo trạng thái
export const getProductLotsByStatus = (status) => {
  return axios.get('/product-lots', {
    params: { status }
  });
};

// Lấy danh sách lô nông sản theo loại cây trồng
export const getProductLotsByCropType = (cropType) => {
  return axios.get('/product-lots', {
    params: { cropType }
  });
};

// Xác minh tính toàn vẹn của lô nông sản (blockchain)
export const verifyProductLotIntegrity = (id) => {
  return axios.get(`/product-lots/${id}/verify`);
};

// Cập nhật quá trình sản xuất
export const updateProductionStep = (productLotId, stepData) => {
  console.log('Gọi API cập nhật quá trình sản xuất:', productLotId, stepData);
  return axios.post(`/production-steps/product-lots/${productLotId}/process-step`, stepData)
    .then(response => {
      console.log('Kết quả API cập nhật quá trình sản xuất:', response.data);
      return response;
    })
    .catch(error => {
      console.error('Lỗi khi cập nhật quá trình sản xuất:', error.response || error);
      throw error;
    });
};

// Lấy danh sách các bước trong quá trình sản xuất theo lô sản phẩm
export const getProductionStepsByProductLot = (productLotId, sortByTimeDesc = true) => {
  return axios.get('/production-steps', {
    params: { productLotId, sortByTimeDesc }
  });
};

// Upload hình ảnh cho bước sản xuất
export const uploadImage = (file, folder) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  return axios.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    console.log('Upload thành công, response:', response);
    return response;
  }).catch(error => {
    console.error('Lỗi khi upload file:', error.response || error);
    throw error;
  });
};

// Đánh dấu hoàn thành sản xuất
export const completeProduction = (id) => {
  return axios.put(`/product-lots/${id}/complete-production`);
};

export const requestTransported = (id) => {
  return axios.put(`/product-lots/${id}/request-transported`);
};