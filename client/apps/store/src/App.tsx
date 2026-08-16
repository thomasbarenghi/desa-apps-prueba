import { Routes, Route } from "react-router-dom";
import { StoreLayout } from "./layouts/StoreLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { RequireAuth } from "@repo/components";
import { routes } from "./routes";
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
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
        <Route path={routes.forgotPassword} element={<ForgotPasswordPage />} />
        <Route path={routes.resetPassword} element={<ResetPasswordPage />} />
      </Route>
      <Route element={<RequireAuth loginPath={routes.login} />}>
        <Route element={<StoreLayout />}>
          <Route index element={<HomePage />} />
          <Route path={routes.catalog} element={<CatalogPage />} />
          <Route path={routes.product} element={<ProductDetailPage />} />
          <Route path={routes.cart} element={<CartPage />} />
          <Route path={routes.checkout} element={<CheckoutPage />} />
          <Route path={routes.branches} element={<SucursalesPage />} />
          <Route path={routes.orders} element={<OrdersPage />} />
          <Route path={routes.orderDetail} element={<OrderDetailPage />} />
          <Route path={routes.profile} element={<ProfilePage />} />
          <Route path={routes.profileEdit} element={<EditProfilePage />} />
          <Route path={routes.profileAddresses} element={<AddressesPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
