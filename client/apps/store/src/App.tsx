import { Routes, Route } from "react-router-dom";
import { StoreLayout } from "./layouts/StoreLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { RequireAuth } from "./hoc/RequireAuth";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { SucursalesPage } from "./pages/SucursalesPage";
import { OrdersPage } from "./pages/OrdersPage";
import { OrderDetailPage } from "./pages/OrderDetailPage";
import { ProfilePage } from "./pages/ProfilePage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { AddressesPage } from "./pages/AddressesPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";

export const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/recuperar-contrasena" element={<ForgotPasswordPage />} />
        <Route path="/restablecer-contrasena/:token" element={<ResetPasswordPage />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route element={<StoreLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/productos/:productId" element={<ProductDetailPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/sucursales" element={<SucursalesPage />} />
          <Route path="/pedidos" element={<OrdersPage />} />
          <Route path="/pedidos/:orderId" element={<OrderDetailPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/perfil/editar" element={<EditProfilePage />} />
          <Route path="/perfil/direcciones" element={<AddressesPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
