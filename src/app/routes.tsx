import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { GalleryPage } from './pages/GalleryPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'shop', Component: ShopPage },
      { path: 'services', Component: ServicesPage },
      { path: 'about', Component: AboutPage },
      { path: 'policies', Component: PoliciesPage },
      { path: 'faq', Component: FAQPage },
      { path: 'contact', Component: ContactPage },
      { path: 'gallery', Component: GalleryPage },
    ],
  },
]);
