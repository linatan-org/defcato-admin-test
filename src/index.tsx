import { createRoot } from 'react-dom/client';
import MainLayout from './components/layout/MainLayout';
import AppRoutes from './routes/AppRoutes';
import { Provider } from 'react-redux';
import './assets/styles/index.scss';
import AppProvider from './contexts/auth/provider';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './i18n';
import { store, persistor } from './reudux';
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider direction="rtl">
        <AppProvider>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </AppProvider>
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);
