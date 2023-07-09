import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Good } from 'src/app/model/Good';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit{
  
  @Input() item!:Good
  @Output() Item_RefreshState = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog) { }

  
  ngOnInit(): void {
   
  }

  openOrderDialog(Good: Good): void {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
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




