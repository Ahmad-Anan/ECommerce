import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { loggedGuard } from './shared/guards/logged.guard';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    {path: '',component: AuthLayoutComponent,canActivate: [loggedGuard],children: [
        { path: 'login', component: LoginComponent, title: 'Login' },
        { path: 'register', component: RegisterComponent, title: 'Register' },
        { path: 'forget', component: ForgetPasswordComponent, title: 'Forget Password' }
    ]
    },
{
    path: '',component: MainLayoutComponent,canActivate: [authGuard],
    children: [
        { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'Home' },
        { path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductComponent), title: 'Products' },
        { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), title: 'Cart' },
        { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), title: 'Categories' },
        { path: 'brands', loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), title: 'Brands' },
        { path: 'allorders', loadComponent: () => import('./pages/all-orders/all-orders.component').then(m => m.AllOrdersComponent), title: 'All Orders' },
        { path: 'productDetails/:productId', loadComponent: () => import('./pages/product-details/product-details.component').then(m => m.ProductDetailsComponent), title: 'Product Details' },
        { path: 'checkout/:cart_id', loadComponent: () => import('./pages/check-out/check-out.component').then(m => m.CheckoutComponent), title: 'Check-out' },
        { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent), title: 'Error 404' }
        ]
    }
];