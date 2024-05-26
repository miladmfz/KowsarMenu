import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Good } from 'src/app/model/Good';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderRepoService } from '../service/order-repo.service';
import { TextValue } from 'src/app/model/textvalue';
import { DialogEnComponent } from '../dialog-en/dialog-en.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-en',
  templateUrl: './item-en.component.html',
  styleUrls: ['./item-en.component.css']
})
export class ItemEnComponent implements OnInit {

  @Input() item!: Good
  @Output() Item_RefreshState = new EventEmitter<boolean>();
  TextValue!: TextValue;
  public imageSrc: string | ArrayBuffer | null = null;
  Imageitem: string = '';
  miztype: string = '';
  fallbackIconSrc = 'http://94.139.164.68:60005/img/logo.jpg';
  constructor(
    private dialog: MatDialog,
    private repo: OrderRepoService,
    private http: HttpClient,

  ) { }


  showFallbackIcon() {
    this.imageSrc = this.fallbackIconSrc;
  }




  ngOnInit(): void {
    this.miztype = sessionStorage.getItem("MizType") + ''


    this.repo.GetImage(this.item.GoodCode + '').subscribe((data: any) => {

      this.Imageitem = `data:${Image};base64,${data.Text}`;

      console.log(this.Imageitem)
    },
    );




  }

  openOrderDialog(Good: Good): void {
    const dialogRef = this.dialog.open(DialogEnComponent, {
      data: {
        Good: Good
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.Item_RefreshState.emit(true);
      // Handle dialog close event if needed
    });
  }



}




