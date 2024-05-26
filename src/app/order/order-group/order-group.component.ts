import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Group } from 'src/app/model/group';


@Component({
  selector: 'app-order-group',
  templateUrl: './order-group.component.html',
  styleUrls: ['./order-group.component.css']
})

export class OrderGroupComponent {
  @Input() item!: Group;
  @Output() Group_RefreshState = new EventEmitter<boolean>();
  selectedItems: Group[] = [];
  constructor() { }

  ngOnInit(): void {

  }

  saveNameToCookie(item: Group) {
    console.log(item.Name);

    sessionStorage.setItem('DefaultGroupCode', item.GroupCode!);
    console.log('' + sessionStorage.getItem('DefaultGroupCode'));

    this.setRefresh();
  }

  setRefresh() {
    this.Group_RefreshState.emit(true);
  }


  isSelected(item: Group): boolean {
    const defaultGroupCode = '' + sessionStorage.getItem('DefaultGroupCode');
    return defaultGroupCode === item.GroupCode;
  }


}

