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
import { MatDialog } from '@angular/material/dialog';
import { DialogFaComponent } from '../dialog-fa/dialog-fa.component';


@Component({
  selector: 'app-menu-fa',
  templateUrl: './menu-fa.component.html',
  styleUrls: ['./menu-fa.component.css']
})
export class MenuFaComponent implements OnInit {

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
    private dialog: MatDialog,
    private repo: OrderRepoService,
    private renderer: Renderer2,
    private route: ActivatedRoute,

    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    sessionStorage.setItem('ShowDialog', '0');
    const newItem: Group = {
      GroupCode: '71',
      Name: 'همه',
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
      this.mizname = sessionStorage.getItem('RstMizName')!;

      if (this.BasketInfo[0].InfoState === "0" || this.BasketInfo[0].InfoState === "3") {


        this.repo.OrderInfoInsert(this.BasketInfo[0].RstmizCode!, this.BasketInfo[0].Today!).subscribe(e => {

          this.BasketInfo = e;
          console.log(e)

          this.repo.GetGroupCode().subscribe(e => {
            console.log(e)
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


    const listItemElements1 = listElement.querySelectorAll('li');

    listItemElements1.forEach((itemElement: any) => {
      const titleElement = itemElement.querySelector('.card-Goodcode');

      const rect = itemElement.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      const titleText = titleElement.textContent.trim();

      const matchingGroup = this.filteredGoods.find((Good) => Good.GoodCode === titleText);

      if (isVisible && titleElement) {
        this.ImageCode11(titleText)
      }
    });






    const listItemElements = listElement.querySelectorAll('li');

    listItemElements.forEach((itemElement: any) => {
      const titleElement = itemElement.querySelector('.card-grp');

      const rect = itemElement.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      // console.log('*********************************');
      // console.log('rect:', rect.top);
      // console.log('rect.bottom:', rect.bottom);
      // console.log('window.innerHeight:', window.innerHeight);
      // console.log('isVisible:', isVisible);
      if (isVisible && titleElement) {
        const titleText = titleElement.textContent.trim();
        const matchingGroup = this.Groups.find((group) => group.Name === titleText);
        if (matchingGroup) {
          // console.log('GroupCode:', matchingGroup.GroupCode);

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
      setTimeout(() => {
        this.scrollToListItem();
      }, 200);

    });



  }


  scrollDownBy100px() {

    console.log("sadasdasd")
    const element = this.elementRef.nativeElement.querySelector('.your-container-class');
    if (element) {
      element.scrollTop += 200;
    }
    return false;
  }


  GetAllGoods() {

    this.loading = true
    this.Goods = []

    this.repo.getAllGood('' + sessionStorage.getItem('DefaultGroupCodeAll'), '' + sessionStorage.getItem('AppBasketInfoCode')).subscribe(e => {
      this.AllGoods = e.Goods;
      this.loading = false
      setTimeout(() => {
        this.scrollToListItem();
      }, 1000);
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




  public imageSrc: string | ArrayBuffer | null = null;
  fallbackIconSrc = 'http://94.139.164.68:60005/img/logo.jpg';
  Imageitem: string = '';
  miztype: string = '';












  showFallbackIcon() {
    this.imageSrc = this.fallbackIconSrc;
  }






  ImageCode(GoodCode_str: string) {

    this.repo.GetImage(GoodCode_str + '').subscribe((data: any) => {

      const Imageitemtemp = `data:${Image};base64,${data.Text}`;


      this.filteredGoods.forEach((GoodDetail: Good) => {


        if (GoodDetail.GoodCode == GoodCode_str) {
          GoodDetail.Imageitem = Imageitemtemp
        }




      });


    });

  }




  ImageCodebycall(GoodCode_str: string) {

    this.repo.GetImage(GoodCode_str + '').subscribe((data: any) => {



      return `data:${Image};base64,${data.Text}`;

    });

  }


  ImageCode11(GoodCode_str: string) {


    this.filteredGoods.forEach((GoodDetail: Good) => {
      if (GoodDetail.GoodCode == GoodCode_str) {

        if (GoodDetail.Imageitem.length == 0) {
          this.repo.GetImage(GoodCode_str + '').subscribe((data: any) => {

            const Imageitemtemp = `data:${Image};base64,${data.Text}`;
            GoodDetail.Imageitem = Imageitemtemp


          });

        }
      }
    });

  }





















  /*
    ngOnInit(): void {
      this.miztype = sessionStorage.getItem("MizType") + ''
  
      // this.repo.GetImage(this.item.GoodCode + '').subscribe((data: any) => {
  
      //   this.Imageitem = `data:${Image};base64,${data.Text}`;
  
      //   console.log(this.Imageitem)
      // },
      // );
  
    }
  */
  openOrderDialog(Good: Good): void {

    console.log(sessionStorage.getItem('ShowDialog'));

    if (sessionStorage.getItem('ShowDialog') != null) {
      if (sessionStorage.getItem('ShowDialog') == "0") {
        sessionStorage.setItem('ShowDialog', '1');

        this.showDialog(Good);
      }

    } else {
      sessionStorage.setItem('ShowDialog', '1');
      this.showDialog(Good);
    }


  }



  showDialog(Good: Good): void {

    const dialogRef = this.dialog.open(DialogFaComponent, {
      data: {
        Good: Good
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      sessionStorage.setItem('ShowDialog', '0');

      //this.Item_RefreshState.emit(true);
      this.RefreshMenu(true);
    });

  }

  scrollToListItem(): void {
    const secondItem = this.elementRef.nativeElement.querySelector('.item-sdsd:nth-child(2)');
    if (secondItem) {
      secondItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }



}






















