import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Good } from 'src/app/model/Good';
import { OrderRepoService } from '../service/order-repo.service';

import { BasketInfo } from 'src/app/model/BasketInfo';
import { TextValue } from 'src/app/model/textvalue';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-basket',
  templateUrl: './order-basket.component.html',
  styleUrls: ['./order-basket.component.css']
})
export class OrderBasketComponent implements OnInit {
  @Input() items!: Good[]
  @Output() Basket_RefreshState = new EventEmitter<boolean>();
  basketsum: Good[] = []
  mizname: string = '';

  Goods: Good[] = [];
  BasketGoods: Good[] = [];
  isDesktop: boolean = true;

  menuId!: string;
  TextValue!: TextValue;
  BasketInfo: BasketInfo[] = [];

  // Example usage
  ngOnInit(): void {




    this.repo.GetRstMizData('' + sessionStorage.getItem('RstmizCode')).subscribe(e => {
      this.BasketInfo = e;
      this.mizname = this.BasketInfo[0].RstMizName!;

      this.OrderGetSummmary();
      this.GetBasketGoods();


    });


  }




  constructor(
    private repo: OrderRepoService,

    private router: Router
  ) { }




  OrderGetSummmary() {

    this.repo.GetOrderSum('' + sessionStorage.getItem('AppBasketInfoCode')).subscribe(e => {
      if (!e.Goods) {
        const RstmizCode = '' + sessionStorage.getItem('RstmizCode');
        this.router.navigate(['/menu-fa']);
      } else {
        this.basketsum = e.Goods;
      }

    }
    );

  }



  GetBasketGoods() {

    this.repo.GetBasketOrder('' + sessionStorage.getItem('AppBasketInfoCode'))
      .subscribe(e => {

        this.BasketGoods = e.Goods ? e.Goods : [];

      });



  }





  RefreshMenu(flag: boolean) {

    if (flag) {

      this.OrderGetSummmary()
      this.GetBasketGoods();

    }
  }



}
