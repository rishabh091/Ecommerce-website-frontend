import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserinfoComponent } from './userinfo/userinfo.component';


const routes: Routes = [{ path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: UserCartComponent },
  { path: 'home/:id', component: ProductDetailsComponent },
  { path: 'home/category/:category', component: HomepageComponent},
  { path: 'userInfo', component: UserinfoComponent },
  { path: '', redirectTo: "/home", pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
