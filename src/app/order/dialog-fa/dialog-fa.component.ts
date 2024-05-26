import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { MatSnackBar } from '@angular/material/snack-bar';

import { Good } from 'src/app/model/Good';
import { OrderRepoService } from '../service/order-repo.service';


@Component({
  selector: 'app-dialog-fa',
  templateUrl: './dialog-fa.component.html',
  styleUrls: ['./dialog-fa.component.css']
})
export class DialogFaComponent implements OnInit {
  // Define additional properties as needed
  public quantity!: number;
  public explanation!: string;
  errorMessage: string = "";
  isloading: boolean = false
  item!: Good;
  Goods: Good[] = [];
  @Output() Dialog_RefreshState = new EventEmitter<boolean>();




  constructor(
    //  / private snackBar: MatSnackBar,
    private repo: OrderRepoService,

    public dialogRef: MatDialogRef<DialogFaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item = data.Good
    // Assign initial values to the properties

  }



  ngOnInit() {
    this.quantity = 0;
    this.explanation = '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }



  setRefresh() {

    this.Dialog_RefreshState.emit(true);
  }


  onSave(): void {
    this.isloading = true
    // Update the data object before closing the dialog
    const quantityValue = this.quantity;

    if (isNaN(quantityValue) || quantityValue === 0) {
      this.errorMessage = "لطفا تعداد را وارد کنید";
      return;
    }

    // Reset the error message if the input is valid
    this.errorMessage = "";

    this.data.quantity = quantityValue;
    this.data.explanation = this.explanation;

    if (this.data.quantity !== 0) {
      console.log(this.data.quantity);
    }

    if (this.data.explanation.trim().length !== 0) {
      console.log(this.data.explanation);
    }

    this.repo.OrderRowInsert(
      this.item,
      this.data.quantity,
      this.data.explanation,
      '' + sessionStorage.getItem('AppBasketInfoCode')

    ).subscribe(e => {
      this.isloading = false
      this.dialogRef.close(this.data);

    });




  }











  getLastDigit(): number {
    const value = this.quantity.toString();
    return +value.charAt(value.length - 1);
  }





  updateLastDigit(): void {

    const value = this.quantity.toString();
    const lastDigit = value.charAt(value.length - 1);
    const parsedDigit = parseInt(lastDigit);
    this.quantity = isNaN(parsedDigit) ? 0 : parsedDigit;

  }


  validateInput(event: any): void {
    const input = event.target.value;
    const parsedValue = parseInt(input);
    if (isNaN(parsedValue) || parsedValue < 0) {
      event.target.value = this.quantity;
    } else {
      this.quantity = parsedValue;
    }
  }

  incrementQuantity(): void {

    const parsedValue = this.quantity;
    if (!isNaN(parsedValue) || parsedValue < 10) {
      this.quantity = (parsedValue + 1);
    }
  }

  decrementQuantity(): void {
    const parsedValue = this.quantity;
    if (!isNaN(parsedValue) && parsedValue > 0) {
      this.quantity = (parsedValue - 1);
    }
  }



}
