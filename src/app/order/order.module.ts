import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderSettingComponent } from './order-setting/order-setting.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrderBasketComponent } from './order-basket/order-basket.component';
import { OrderGroupComponent } from './order-group/order-group.component';
import { OrderMainComponent } from './order-main/order-main.component';
import { ModelModule } from '../model/model.module';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { FarsiNumberPipe } from '../model/Number';
import { OrderBasketItemComponent } from './order-basketitem/order-basketitem.component';
import { RouterModule, Routes } from '@angular/router';





@NgModule({
  declarations: [
    OrderMainComponent,
    OrderGroupComponent,
    OrderBasketComponent,
    OrderItemComponent,
    OrderSettingComponent,
    OrderDialogComponent,
    AboutusComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    FarsiNumberPipe,
    OrderBasketItemComponent
  

  ],
  imports: [
    CommonModule,HttpClientModule,FormsModule,ModelModule,RouterModule
    
  ]

})
export class OrderModule { }

