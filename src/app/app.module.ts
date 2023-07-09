import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderModule } from './order/order.module';
import { ModelModule } from './model/model.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrderModule,
    ModelModule,
    MatDialogModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
