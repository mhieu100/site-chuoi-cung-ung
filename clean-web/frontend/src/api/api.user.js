import axios from '../config/axios-customize';

// Tạo người dùng mới
export const createUser = (userData) => {
  return axios.post('/api/users', userData);
};

// Lấy thông tin người dùng theo địa chỉ ví
export const getUserByWalletAddress = (walletAddress) => {
  return axios.get(`/api/users/${walletAddress}`);
};

// Cập nhật thông tin người dùng
export const updateUser = (walletAddress, userData) => {
  return axios.put(`/api/users/${walletAddress}`, userData);
};

// Xóa người dùng
export const deleteUser = (walletAddress) => {
  return axios.delete(`/api/users/${walletAddress}`);
};

// Lấy tất cả người dùng
export const getAllUsers = () => {
  return axios.get('/api/users');
};

// Lấy danh sách người dùng theo vai trò
export const getUsersByRole = (role) => {
  return axios.get('/api/users', {
    params: { role }
  });
};
