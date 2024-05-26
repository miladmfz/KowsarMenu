import { Component, ViewChild, TemplateRef, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrderRepoService } from '../service/order-repo.service';

import { Router } from '@angular/router';

import { Good, GoodsResponse } from 'src/app/model/Good';
import { Group } from 'src/app/model/group';
import { TextValue } from 'src/app/model/textvalue';
import { BasketInfo } from 'src/app/model/BasketInfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent {



  constructor(
    private repo: OrderRepoService,
    private renderer: Renderer2,
    private route: ActivatedRoute,

    private dialog: MatDialog,
    private router: Router
  ) { }
  // openDialog() {
  //   alert('مهمان عزیز، شما می‌توانید در این بخش سفارش خود را انتخاب کنید و سپس از ویتر خواهش کنید که سفارش شما را ثبت کند ');
  // }

  @ViewChild('dialogTemplateEn') dialogTemplateEn!: TemplateRef<any>;
  @ViewChild('dialogTemplateFa') dialogTemplateFa!: TemplateRef<any>;

  Goods: Good[] = [];
  BasketGoods: Good[] = [];
  basketsum!: string
  Groups: Group[] = [];
  isDesktop: boolean = true;


  menuId!: string;
  mizname: string = 'کافه کتاب ققنوس';
  miztype: string = '';
  id: string = '';

  TextValue!: TextValue;
  BasketInfo: BasketInfo[] = [];



  currentSlide: number = 0;
  images: { src: string, alt: string }[] = [
    { src: './assets/images/cafe_001.jpg', alt: 'cafe_001' },
    { src: './assets/images/cafe_002.jpg', alt: 'cafe_002' },
    { src: './assets/images/cafe_003.jpg', alt: 'cafe_003' },
    { src: './assets/images/cafe_004.jpg', alt: 'cafe_004' },

    // Add more images as needed
  ];




  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }



  ngOnInit(): void {







    this.route.queryParams.subscribe(params => {

      sessionStorage.setItem('RstmizCode', params?.['id']);


      this.repo.GetRstMizData('' + sessionStorage.getItem('RstmizCode')).subscribe(e => {
        this.BasketInfo = e;

        if (this.BasketInfo[0].InfoState === "0" || this.BasketInfo[0].InfoState === "3") {


          this.repo.OrderInfoInsert(this.BasketInfo[0].RstmizCode!, this.BasketInfo[0].Today!).subscribe(e => {

            this.BasketInfo = e;

            sessionStorage.setItem('Today', this.BasketInfo[0].Today!);
            sessionStorage.setItem('RstmizCode', this.BasketInfo[0].RstmizCode!);
            sessionStorage.setItem('RstMizName', this.BasketInfo[0].RstMizName!);
            sessionStorage.setItem('AppBasketInfoCode', this.BasketInfo[0].AppBasketInfoCode!);
            sessionStorage.setItem('AppBasketInfoCode', this.BasketInfo[0].AppBasketInfoCode!);
            sessionStorage.setItem('MizType', this.BasketInfo[0].MizType + '');


            this.mizname = this.BasketInfo[0].RstMizName + '';
          });


        } else {

          sessionStorage.setItem('Today', this.BasketInfo[0].Today!);
          sessionStorage.setItem('RstmizCode', this.BasketInfo[0].RstmizCode!);
          sessionStorage.setItem('RstMizName', this.BasketInfo[0].RstMizName!);
          sessionStorage.setItem('AppBasketInfoCode', this.BasketInfo[0].AppBasketInfoCode!);
          sessionStorage.setItem('MizType', this.BasketInfo[0].MizType + '');
          this.mizname = this.BasketInfo[0].RstMizName + '';
        }



      });

    });





    setInterval(() => {
      this.nextSlide();
    }, 4000);


  }





  openDialog_en() {
    this.miztype = sessionStorage.getItem("MizType") + ''

    if (this.miztype.length > 0) {
      const dialogRef = this.dialog.open(this.dialogTemplateEn, {
        position: {
          top: '50px',
          left: '50px',
          bottom: '50px'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/menu-en']);
      });
    } else {
      this.router.navigate(['/menu-en']);
    }



  }


  openDialog_fa() {
    this.miztype = sessionStorage.getItem("MizType") + ''
    //this.router.navigate(['/menu-fa']);

    if (this.miztype.length > 0) {
      const dialogRef = this.dialog.open(this.dialogTemplateFa, {
        position: {
          top: '50px',
          left: '50px',
          bottom: '50px'
        }
      });



      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/menu-fa']);
      });
    } else {
      this.router.navigate(['/menu-fa']);
    }




  }


  closeDialog() {
    this.dialog.closeAll();
  }

  contactInfo = [
    { label: 'شماره تماس کتاب‌فروشی:', value: '66414118' },
    { label: 'شماره تماس کافه:', value: '66403386' },
    { label: 'اینستاگرام:', value: 'qoqnoosbookcafe' },
    { label: 'واتس‌آپ مجموعه:', value: '100 10 95 - 0936' },
    { label: 'سایت:', value: 'www.qoqnoosbookcafe.com' },
    { label: 'آدرس:', value: 'تهران، خیابان انقلاب، خیابان وصال شیرازی، کوچه شفیعی، شماره 1' },

  ];


}


