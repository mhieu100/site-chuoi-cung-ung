import React, { useEffect, useState } from 'react'
import './auth.css'
import { useAccount, useDisconnect } from 'wagmi';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { callRegister } from '../../api/api.auth';

const RegisterPage = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullname || !email) {
      message.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    try {
      await callRegister(address, fullname, email);
      message.success('Đăng ký thành công');
      disconnect();
      navigate('/');
    } catch (error) {
      message.error('Đăng ký thất bại: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" data-id="fr9gepzz" data-line="16-111">
      <div className="w-full max-w-4xl flex rounded-xl overflow-hidden shadow-2xl" data-id="ru7n2l80" data-line="17-110">
        <div className="hidden md:block md:w-1/2 login-bg" alt="Farm background" data-id="8la8zwet" data-line="19-35">
          <div className="h-full flex flex-col justify-between p-8 text-white" data-id="8wo0a7yk" data-line="20-34">
            <div data-id="h1hkg68r" data-line="21-24">
              <i className="fas fa-leaf text-3xl mb-2" data-id="m78tumyg" data-line="22-22"></i>
              <h1 className="text-2xl font-bold" data-id="fzv9vonh" data-line="23-23">AgriTrace</h1>
            </div>
            <div data-id="zisiuyq4" data-line="25-28">
              <h2 className="text-2xl font-bold mb-4" data-id="llpx14vf" data-line="26-26">Ứng dụng Blockchain trong chuỗi cung ứng nông sản sạch</h2>
              <p className="text-sm opacity-90" data-id="ngqxjmpt" data-line="27-27">Giải pháp minh bạch và bảo mật cho toàn bộ chuỗi cung ứng từ trang trại đến bàn ăn</p>
            </div>
            <div className="flex space-x-4" data-id="i56xqlp0" data-line="29-33">
              <a href="#" className="text-white hover:text-green-300" data-id="0yorqahj" data-line="30-30"><i className="fab fa-facebook-f" data-id="gs37sw1d" data-line="30-30"></i></a>
              <a href="#" className="text-white hover:text-green-300" data-id="tr68w3a1" data-line="31-31"><i className="fab fa-twitter" data-id="rkahqi4v" data-line="31-31"></i></a>
              <a href="#" className="text-white hover:text-green-300" data-id="h7iqgffr" data-line="32-32"><i className="fab fa-linkedin-in" data-id="n7li8k70" data-line="32-32"></i></a>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white p-8 md:p-12" data-id="n7v1arel" data-line="38-109">
          <div className="text-center mb-8" data-id="ntsp75rl" data-line="39-42">
            <h2 className="text-2xl font-bold text-gray-800" data-id="zjfdyos2" data-line="40-40">Lần đầu tiên truy cập</h2>
            <p className="text-gray-600 mt-2" data-id="t8agolte" data-line="41-41">Cần cung cấp tên và địa chỉ email để đăng ký tài khoản</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} data-id="lws0iejn" data-line="44-101">
            <div data-id="7brtn0k4" data-line="45-53">
              <label for="wallet" className="block text-sm font-medium text-gray-700 mb-1" data-id="3gxrkgzx" data-line="46-46">Địa chỉ ví Blockchain</label>
              <div className="relative" data-id="pc3nao05" data-line="47-52">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-id="gvas9soq" data-line="48-50">
                  <i className="fas fa-wallet text-gray-400" data-id="ypfhkhjy" data-line="49-49"></i>
                </div>
                <input className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" value={address} disabled alt="Wallet input" data-id="mqhqftf1" data-line="51-51" />
              </div>
            </div>

            <div data-id="euom0evw" data-line="55-66">
              <label for="fullname" className="block text-sm font-medium text-gray-700 mb-1" data-id="8cj6vyre" data-line="56-56">Tên người dùng</label>
              <div className="relative" data-id="ns7w5n6u" data-line="57-65">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-id="jgu2g6mj" data-line="58-60">
                  <i className="fas fa-user text-gray-400" data-id="3tkl4x89" data-line="59-59"></i>
                </div>
                <input 
                  type="text" 
                  id="fullname" 
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  placeholder="Nhập tên người dùng" 
                  alt="Fullname input" 
                  data-id="293hucg0" 
                  data-line="61-61" 
                />
              </div>
            </div>

            <div data-id="euom0evw" data-line="55-66">
              <label for="email" className="block text-sm font-medium text-gray-700 mb-1" data-id="8cj6vyre" data-line="56-56">Email</label>
              <div className="relative" data-id="ns7w5n6u" data-line="57-65">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-id="jgu2g6mj" data-line="58-60">
                  <i className="fas fa-envelope text-gray-400" data-id="3tkl4x89" data-line="59-59"></i>
                </div>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  placeholder="Nhập email" 
                  alt="Email input" 
                  data-id="293hucg0" 
                  data-line="61-61" 
                />
              </div>
            </div>

            <div data-id="tqx30f8h" data-line="78-82">
              <button 
                type="submit" 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" 
                data-id="32vgmr5h" 
                data-line="79-81"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage