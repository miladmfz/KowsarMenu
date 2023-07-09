import { Injectable } from '@angular/core';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor(private ngxCookieService: NgxCookieService) { }

  setCookie(name: string, value: string) {
    this.ngxCookieService.set(name, value);
  }

  getCookie(name: string): string {
    return this.ngxCookieService.get(name);
  }

  deleteCookie(name: string) {
    this.ngxCookieService.delete(name);
  }
}
