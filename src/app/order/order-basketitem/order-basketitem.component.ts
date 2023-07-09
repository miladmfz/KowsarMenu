import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Good } from 'src/app/model/Good';
import { OrderRepoService } from '../service/order-repo.service';
import { CookieService } from '../service/cookie-service.service';


@Component({
  selector: 'app-order-basketitem',
  templateUrl: './order-basketitem.component.html',
  styleUrls: ['./order-basketitem.component.css']
})
export class OrderBasketItemComponent  implements OnInit{
  
  @Output() Basketitem_RefreshState = new EventEmitter<boolean>();

  basketsum:Good[]=[]
  @Input() items!:Good[]


  constructor  (    
    private repo: OrderRepoService,
    private cookieService: CookieService
     ) { }


  removeItemFromCart(item: any): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {


      this.repo.OrderRowDelete(
        item,
        this.cookieService.getCookie('AppBasketInfoCode')
        
        ).subscribe(e => {
          this.setRefresh();
      }
      );


    }



  }

  incrementQuantity(item: any): void {
   
    if (item.Amount < 10 ) {
      item.Amount++;
    this.repo.OrderRowInsert(
      item,
      item.Amount,
      item.Explain,
      this.cookieService.getCookie('AppBasketInfoCode')
      
      ).subscribe(e => {
        this.setRefresh();
    }
    );

  }

  }

  decrementQuantity(item: any): void {
    if (item.Amount > 1 ) {
      item.Amount--;
      this.repo.OrderRowInsert(
        item,
        item.Amount,
        item.Explain,
        this.cookieService.getCookie('AppBasketInfoCode')
        
        ).subscribe(e => {
          this.setRefresh();
      }
      );
    
    
    }

  }

 

    

  OrderGetSummmary() {

    this.repo.GetOrderSum(this.cookieService.getCookie('AppBasketInfoCode')).subscribe(e => {

      this.basketsum=e.Goods
    }
    );
  
  }


  setRefresh() {

    this.Basketitem_RefreshState.emit(true);
  }

  // Example usage
  ngOnInit(): void {

    this.OrderGetSummmary() 
    this.GetBasketGoods()
    

    
  }
  
  GetBasketGoods() {

    this.repo.GetBasketOrder(this.cookieService.getCookie('AppBasketInfoCode')).subscribe(e => {
      this.items = e.Goods ? e.Goods : [];
      
      
    });
    
  }










}
