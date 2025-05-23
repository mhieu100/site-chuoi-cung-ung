import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MetaMask, WagmiWeb3ConfigProvider } from '@ant-design/web3-wagmi'
import { ConfigProvider } from 'antd'
import vi_VI from 'antd/locale/vi_VN';
import { config } from './config/wagmi.js'
import { store } from './redux/store.js';
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
    <WagmiWeb3ConfigProvider
      config={config}
      eip6963={{
        autoAddInjectedWallets: true,
      }}
      ens
      wallets={[
        MetaMask(),
      ]}
    >
      <ConfigProvider locale={vi_VI}>
        <Provider store={store}>
          <App />
        </Provider>
      </ConfigProvider>
    </WagmiWeb3ConfigProvider>
)
