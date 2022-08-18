import { createRoot } from 'react-dom/client';
import AppRoutes from './routes/AppRoutes';
import './assets/styles/index.scss';
import AuthProvider from './contexts/auth/provider';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './i18n';
// React setup
const container = document.getElementById('root')!;
const root = createRoot(container);

// Root render
root.render(
  <BrowserRouter>
    <ConfigProvider direction="rtl">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ConfigProvider>
  </BrowserRouter>
);
