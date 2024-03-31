import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { AuthProvider } from './context/FakeAuthContext';
import { CitiesProvider } from './context/CitiesContext';
import ProtectedRoute from './pages/protected-route/ProtectedRoute';

import CityList from './components/city-list/CityList';
import SpinnerFullPage from './components/spinner-fullpage/SpinnerFullPage';
import City from './components/city/City';
import CountryList from './components/country-list/CountryList';
import Form from './components/form/Form';

const HomePage = lazy(() => import('./pages/homepage/HomePage'));
const Pricing = lazy(() => import('./pages/pricing/Pricing'));
const Product = lazy(() => import('./pages/product/Product'));
const Login = lazy(() => import('./pages/login/Login'));
const AppLayout = lazy(() => import('./pages/app-layout/AppLayout'));
const PageNotFound = lazy(() => import('./pages/page-not-found/PageNotFound'));
function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route
                index
                element={<HomePage />}
              />
              <Route
                path="pricing"
                element={<Pricing />}
              />
              <Route
                path="product"
                element={<Product />}
              />
              <Route
                path="login"
                element={<Login />}
              />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={
                    <Navigate
                      replace
                      to="cities"
                    />
                  }
                />
                <Route
                  path="cities"
                  element={<CityList />}
                />
                <Route
                  path="cities/:id"
                  element={<City />}
                />
                <Route
                  path="countries"
                  element={<CountryList />}
                />
                <Route
                  path="form"
                  element={<Form />}
                />
              </Route>
              <Route
                path="*"
                element={<PageNotFound />}
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
