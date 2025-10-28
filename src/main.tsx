import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@ant-design/v5-patch-for-react-19';
import { BrowserRouter } from "react-router";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend'



i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'fr', 'es'],
    fallbackLng: "en",
    detection: {
      order: ['path', 'localStorage', 'htmlTag', 'cookie', 'path', 'subdomain'],
      caches: ['localStorage']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json'
    },
  });


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="bottom-right"  // محل نمایش
        autoClose={3000}      // مدت زمان نمایش (ms)
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  </StrictMode>,
)
