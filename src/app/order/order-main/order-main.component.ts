import { Component , OnInit,
   HostListener,ElementRef,  
   Renderer2 ,  ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Good, GoodsResponse } from 'src/app/model/Good';
import { OrderRepoService } from '../service/order-repo.service';
import { Group } from 'src/app/model/group';
import { TextValue } from 'src/app/model/textvalue';
import { BasketInfo } from 'src/app/model/BasketInfo';
import { CookieService } from '../service/cookie-service.service';

@Component({
  selector: 'app-order-main',
  templateUrl: './order-main.component.html',
  styleUrls: ['./order-main.component.css']
})






export class OrderMainComponent implements OnInit{

  Goods: Good[] = [];
  BasketGoods: Good[] = [];
  basketsum!:string
  Groups: Group[] = [];
  isDesktop: boolean=true;
  


  menuId!: string;
  mizname: string='';
  TextValue!: TextValue  ;
  BasketInfo: BasketInfo[]=[];

  @ViewChild('listsContainer') listsContainer!: ElementRef;
  @ViewChild('groupList') groupList!: ElementRef;
  @ViewChild('itemList') itemList!: ElementRef;
  @ViewChild('basketList') basketList!: ElementRef;

  constructor(
    private repo: OrderRepoService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    ) {}
 
  ngOnInit(): void {














   


    this.route.queryParams.subscribe(params => {

      const id = params['id'];
      if (id) {
        this.cookieService.setCookie('RstmizCode', id);
      }
    
      this.repo.GetRstMizData(this.cookieService.getCookie('RstmizCode')).subscribe(e => {
        this.BasketInfo = e;
        this.mizname=this.BasketInfo[0].RstMizName!;
        if (this.BasketInfo[0].InfoState === "0" ||this.BasketInfo[0].InfoState === "3") {

          
          this.repo.OrderInfoInsert(this.BasketInfo[0].RstmizCode!,this.BasketInfo[0].Today!).subscribe(e => {
            
            this.BasketInfo = e;
            
          
            this.repo.GetGroupCode().subscribe(e => {
              this.TextValue = e
              this.repo.getGroupsByCode(this.TextValue.Text!).subscribe(e => {
                this.Groups = e.Groups;

                this.cookieService.setCookie('Today', this.BasketInfo[0].Today!);
                this.cookieService.setCookie('RstmizCode', this.BasketInfo[0].RstmizCode!);
                this.cookieService.setCookie('RstMizName', this.BasketInfo[0].RstMizName!);
                this.cookieService.setCookie('AppBasketInfoCode', this.BasketInfo[0].AppBasketInfoCode!);
                this.cookieService.setCookie('DefaultGroupCode', this.TextValue.Text!);
                this.GetGoods();
              });
        
            });


          });


        }else{

          this.repo.GetGroupCode().subscribe(e => {
            this.TextValue = e;
      
            this.repo.getGroupsByCode(this.TextValue.Text!).subscribe(e => {
              this.Groups = e.Groups;
              this.cookieService.setCookie('Today', this.BasketInfo[0].Today!);
              this.cookieService.setCookie('RstmizCode', this.BasketInfo[0].RstmizCode!);
              this.cookieService.setCookie('RstMizName', this.BasketInfo[0].RstMizName!);
              this.cookieService.setCookie('AppBasketInfoCode', this.BasketInfo[0].AppBasketInfoCode!);
              this.cookieService.setCookie('DefaultGroupCode', this.TextValue.Text!);
              this.GetGoods();
              this.OrderGetSummmary();
              this.GetBasketGoods();
            });
      
          });
        }
      
      });

    });




    this.isDesktop = this.checkIfDesktop();



    
  }





  
  RefreshMenu(flag: boolean) {

    if(flag){
    this.GetGoods()
    this.GetBasketGoods()
    this.OrderGetSummmary()
    }
  }


  




  GetGoods() {

    this.repo.getAllGood(this.cookieService.getCookie('DefaultGroupCode'),this.cookieService.getCookie('AppBasketInfoCode')).subscribe(e => {
      this.Goods = e.Goods;
    });
    
  }


  GetBasketGoods() {

    this.repo.GetBasketOrder(this.cookieService.getCookie('AppBasketInfoCode')).subscribe(e => {
      this.BasketGoods = e.Goods ? e.Goods : [];
      
      
    });
    
  }



  OrderGetSummmary() {

    this.repo.GetOrderSum(this.cookieService.getCookie('AppBasketInfoCode')).subscribe(e => {

      if(!e.Goods){
        this.basketsum=''
      }else{
        this.basketsum=e.Goods[0].SumFacAmount!
      }

    }
    );
  
  }





  @HostListener('window:resize')
  onWindowResize() {
    this.isDesktop = this.checkIfDesktop();
  }

  checkIfDesktop(): boolean {
    return window.innerWidth >= 768; // Adjust the breakpoint as needed
  }

  isDesktopView(): boolean {
    return this.isDesktop;
  }
  
  ngAfterViewInit(): void {
    const headerContainer = this.listsContainer.nativeElement.previousElementSibling;
    const headerHeight = headerContainer.offsetHeight;
    this.renderer.setStyle(headerContainer, 'position', 'sticky');
    this.renderer.setStyle(headerContainer, 'top', '0');

    this.addScrollingToElement(this.groupList.nativeElement, headerHeight);
    this.addScrollingToElement(this.itemList.nativeElement, headerHeight);
    if (this.basketList) {
      this.addScrollingToElement(this.basketList.nativeElement, headerHeight);
    }
  }

  addScrollingToElement(element: HTMLElement, headerHeight: number): void {
    this.renderer.setStyle(element, 'overflow-y', 'auto');
    this.renderer.setStyle(element, 'max-height', `calc(100vh - ${headerHeight}px)`);
  }



}

