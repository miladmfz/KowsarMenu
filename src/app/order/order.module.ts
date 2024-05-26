import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderBasketComponent } from './order-basket/order-basket.component';
import { OrderGroupComponent } from './order-group/order-group.component';
import { ModelModule } from '../model/model.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FarsiNumberPipe } from '../model/Number';
import { OrderBasketItemComponent } from './order-basketitem/order-basketitem.component';
import { RouterModule } from '@angular/router';
import { MenuFaComponent } from './menu-fa/menu-fa.component';
import { MenuEnComponent } from './menu-en/menu-en.component';
import { ItemEnComponent } from './item-en/item-en.component';
import { DialogFaComponent } from './dialog-fa/dialog-fa.component';
import { DialogEnComponent } from './dialog-en/dialog-en.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    OrderGroupComponent,
    OrderBasketComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    FarsiNumberPipe,
    OrderBasketItemComponent,
    MenuFaComponent,
    MenuEnComponent,

    DialogFaComponent,
    DialogEnComponent,
    ItemEnComponent,


  ],
  imports: [
    CommonModule, HttpClientModule, FormsModule, ModelModule, RouterModule, MatIconModule, MatSnackBarModule,

  ]

})
export class OrderModule { }


