import {
  Component, OnInit,
  HostListener, ElementRef,
  Renderer2, ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Good } from 'src/app/model/Good';
import { OrderRepoService } from '../service/order-repo.service';
import { Group } from 'src/app/model/group';
import { TextValue } from 'src/app/model/textvalue';
import { BasketInfo } from 'src/app/model/BasketInfo';


@Component({
  selector: 'app-menu-en',
  templateUrl: './menu-en.component.html',
  styleUrls: ['./menu-en.component.css']
})
export class MenuEnComponent implements OnInit {

  Goods: Good[] = [];
  AllGoods: Good[] = [];
  GoodsValue: Good[] = [];

  BasketGoods: Good[] = [];
  basketsum!: string
  Groups: Group[] = [];
  isDesktop: boolean = true;
  loading: boolean = true;

  searchTerm: string = '';

  menuId!: string;
  mizname: string = '';
  TextValue!: TextValue;
  BasketInfo: BasketInfo[] = [];


  @ViewChild('listsContainer') listsContainer!: ElementRef;
  @ViewChild('groupList') groupList!: ElementRef;
  @ViewChild('itemList') itemList!: ElementRef;
  @ViewChild('basketList') basketList!: ElementRef;
  @ViewChild('itemListRef', { static: false }) itemListRef!: ElementRef;
  @ViewChild('itemElement', { static: false }) itemElement!: ElementRef[];
  constructor(
    private repo: OrderRepoService,
    private renderer: Renderer2,
    private route: ActivatedRoute,

    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {

    const newItem: Group = {
      GroupCode: '71',
      Name: 'All',
      L1: 'null',
      L2: 'null',
      L3: 'null',
      L4: 'null',
      L5: 'null',
      ChildNo: '0',
      Selected: false
    };



    this.repo.GetRstMizData('' + sessionStorage.getItem('RstmizCode')).subscribe(e => {
      this.BasketInfo = e;
      this.mizname = this.BasketInfo[0].RstMizName!;
      if (this.BasketInfo[0].InfoState === "0" || this.BasketInfo[0].InfoState === "3") {


        this.repo.OrderInfoInsert(this.BasketInfo[0].RstmizCode!, this.BasketInfo[0].Today!).subscribe(e => {

          this.BasketInfo = e;


          this.repo.GetGroupCode().subscribe(e => {
            this.TextValue = e
            this.repo.getGroupsByCode(this.TextValue.Text!).subscribe(e => {

              this.Groups = e.Groups;
              this.Groups.unshift(newItem);





              sessionStorage.setItem('Today', this.BasketInfo[0].Today!);
              sessionStorage.setItem('RstmizCode', this.BasketInfo[0].RstmizCode!);
              sessionStorage.setItem('RstMizName', this.BasketInfo[0].RstMizName!);
              sessionStorage.setItem('AppBasketInfoCode', this.BasketInfo[0].AppBasketInfoCode!);
              sessionStorage.setItem('DefaultGroupCode', this.TextValue.Text!);
              sessionStorage.setItem('DefaultGroupCodeAll', this.TextValue.Text!);
              this.GetGoods();
              this.GetAllGoods();
            });

          });


        });


      } else {

        this.repo.GetGroupCode().subscribe(e => {
          this.TextValue = e;

          this.repo.getGroupsByCode(this.TextValue.Text!).subscribe(e => {
            this.Groups = e.Groups;
            this.Groups.unshift(newItem);
            sessionStorage.setItem('Today', this.BasketInfo[0].Today!);
            sessionStorage.setItem('RstmizCode', this.BasketInfo[0].RstmizCode!);
            sessionStorage.setItem('RstMizName', this.BasketInfo[0].RstMizName!);
            sessionStorage.setItem('AppBasketInfoCode', this.BasketInfo[0].AppBasketInfoCode!);
            sessionStorage.setItem('DefaultGroupCode', this.TextValue.Text!);
            sessionStorage.setItem('DefaultGroupCodeAll', this.TextValue.Text!);
            this.GetGoods();
            this.GetAllGoods();

            this.OrderGetSummmary();
            this.GetBasketGoods();
          });

        });
      }

    });

    this.isDesktop = this.checkIfDesktop();



  }


  onListScroll(event: any) {
    const listElement = event.target;
    const listItemElements = listElement.querySelectorAll('li');

    listItemElements.forEach((itemElement: any) => {
      const titleElement = itemElement.querySelector('.card-grp');

      const rect = itemElement.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (isVisible && titleElement) {
        console.log(titleElement.textContent);
        const titleText = titleElement.textContent.trim();
        const matchingGroup = this.Groups.find((group) => group.Name === titleText);
        if (matchingGroup) {
          console.log('GroupCode:', matchingGroup.GroupCode);

          sessionStorage.setItem('DefaultGroupCode', matchingGroup.GroupCode!);
        }


      }
    });
  }





  RefreshMenu(flag: boolean) {

    if (flag) {
      this.searchTerm = '';
      this.GetGoods()
      this.GetBasketGoods()
      this.OrderGetSummmary()
    }
  }







  GetGoods() {
    this.loading = true
    this.Goods = []
    this.repo.getAllGood('' + sessionStorage.getItem('DefaultGroupCode'), '' + sessionStorage.getItem('AppBasketInfoCode')).subscribe(e => {
      this.Goods = e.Goods;
      this.loading = false
    });



  }




  GetAllGoods() {


    this.loading = true
    this.Goods = []

    this.repo.getAllGood('' + sessionStorage.getItem('DefaultGroupCodeAll'), '' + sessionStorage.getItem('AppBasketInfoCode')).subscribe(e => {
      this.AllGoods = e.Goods;
      this.loading = false

    });

  }

  GetBasketGoods() {

    this.repo.GetBasketOrder('' + sessionStorage.getItem('AppBasketInfoCode')).subscribe(e => {
      this.BasketGoods = e.Goods ? e.Goods : [];


    });

  }



  OrderGetSummmary() {

    this.repo.GetOrderSum('' + sessionStorage.getItem('AppBasketInfoCode')).subscribe(e => {

      if (!e.Goods) {
        this.basketsum = ''
      } else {
        this.basketsum = e.Goods[0].SumFacAmount!
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





  get filteredGoods() {
    if (this.searchTerm) {
      this.Goods = this.AllGoods;
      sessionStorage.setItem('DefaultGroupCode', '' + sessionStorage.getItem('DefaultGroupCodeAll'));
      return this.AllGoods.filter(item => item.GoodName?.includes(this.searchTerm));
    }
    this.GoodsValue = this.Goods.filter(item => item.GoodName?.includes(this.searchTerm));

    return this.GoodsValue;
  }






}
















