import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderMainComponent } from './order/order-main/order-main.component';
import { HomeComponent } from './order/home/home.component';
import { AboutusComponent } from './order/aboutus/aboutus.component';
import { OrderBasketComponent } from './order/order-basket/order-basket.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'menu',component:OrderMainComponent},
  {path:'menu/:id',component:OrderMainComponent },
  {path:'basket',component:OrderBasketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
