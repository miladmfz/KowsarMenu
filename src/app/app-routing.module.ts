import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './order/home/home.component';
import { OrderBasketComponent } from './order/order-basket/order-basket.component';
import { MenuFaComponent } from './order/menu-fa/menu-fa.component';
import { MenuEnComponent } from './order/menu-en/menu-en.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'menu-fa', component: MenuFaComponent },
  { path: 'menu-en', component: MenuEnComponent },
  { path: 'basket', component: OrderBasketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
