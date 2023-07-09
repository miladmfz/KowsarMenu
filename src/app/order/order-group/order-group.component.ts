import { Component, Input , EventEmitter, Output} from '@angular/core';
import { Group } from 'src/app/model/group';
import { CookieService } from '../service/cookie-service.service';

@Component({
  selector: 'app-order-group',
  templateUrl: './order-group.component.html',
  styleUrls: ['./order-group.component.css']
})
export class OrderGroupComponent {
  @Input() item!:Group
  @Output() Group_RefreshState = new EventEmitter<boolean>();
  constructor  (private cookieService: CookieService, ) { }
  
  ngOnInit(): void {
   
  }

  
  saveNameToCookie(name: string) {
    console.log(name)
    this.cookieService.setCookie('DefaultGroupCode', name);
    console.log(this.cookieService.getCookie('DefaultGroupCode'))
    this.setRefresh() ;
  }
  
  setRefresh() {

    this.Group_RefreshState.emit(true);
  }


}




