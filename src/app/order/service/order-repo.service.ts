import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Good, GoodsResponse } from '../../model/Good';
import { Group, GroupsResponse } from '../../model/group';
import { TextValue } from 'src/app/model/textvalue';
import { BasketInfo } from 'src/app/model/BasketInfo';


@Injectable({
  providedIn: 'root'
})
export class OrderRepoService {

  constructor(private client: HttpClient) { }

  // baseUrl = 'http://localhost:60009/logincoffee/index.php?tag=';

  baseUrl = 'http://94.139.164.68:60005/login/index.php?tag=';


  getAllGood(GroupCode: string, AppBasketInfoRef: string): Observable<GoodsResponse> {

    const params = new HttpParams()
      .append('GroupCode', GroupCode)
      .append('AppBasketInfoRef', AppBasketInfoRef)

    return this.client.get<GoodsResponse>(this.baseUrl + 'GetOrderGoodList', { params: params })
  }


  getAllGroup(): Observable<GroupsResponse> {
    const params = new HttpParams().append('GroupCode', '71')

    return this.client.get<GroupsResponse>(this.baseUrl + 'GetMenuOnlinegroups', { params: params })
  }


  GetGroupCode(): Observable<TextValue> {
    const params = new HttpParams().append('Where', 'AppOrder_DefaultGroupCode')

    return this.client.get<TextValue>(this.baseUrl + 'kowsar_info', { params: params })

  }

  getGroupsByCode(groupCode: string): Observable<GroupsResponse> {
    const params = new HttpParams().append('GroupCode', groupCode)

    return this.client.get<GroupsResponse>(this.baseUrl + 'GetMenuOnlinegroups', { params: params })
  }


  GetRstMizData(id: string): Observable<BasketInfo[]> {
    const params = new HttpParams().append('RstMizCode', id)

    return this.client.get<BasketInfo[]>(this.baseUrl + 'WebOrderMizData', { params: params })
  }

  OrderInfoInsert(rstmizCode: string, today: string): Observable<BasketInfo[]> {
    const params = new HttpParams().append('Miz', rstmizCode).append('Date', today)
    return this.client.get<BasketInfo[]>(this.baseUrl + 'WebOrderInfoInsert', { params: params })
  }


  GetBasketOrder(AppBasketInfoRef: string): Observable<GoodsResponse> {
    const params = new HttpParams().append('AppType', '3').append('AppBasketInfoRef', AppBasketInfoRef)

    return this.client.get<GoodsResponse>(this.baseUrl + 'OrderGet', { params: params })
  }


  OrderRowInsert(good: Good, amount: string, desc: string, AppBasketInfoRef: string): Observable<GoodsResponse> {
    const params = new HttpParams()
      .append('GoodRef', good.GoodCode + '')
      .append('FacAmount', amount)
      .append('Price', good.MaxSellPrice + '')
      .append('bUnitRef', good.GoodUnitRef + '')
      .append('bRatio', good.DefaultUnitValue + '')
      .append('Explain', desc)
      .append('InfoRef', AppBasketInfoRef)
      .append('RowCode', good.RowCode + '')

    return this.client.get<GoodsResponse>(this.baseUrl + 'OrderRowInsert', { params: params })
  }

  OrderRowDelete(good: Good, AppBasketInfoRef: string): Observable<GoodsResponse> {
    const params = new HttpParams().append('AppBasketInfoRef', AppBasketInfoRef).append('RowCode', good.RowCode + '')

    return this.client.get<GoodsResponse>(this.baseUrl + 'DeleteGoodFromBasket', { params: params })
  }



  GetOrderSum(AppBasketInfoRef: string): Observable<GoodsResponse> {
    const params = new HttpParams().append('AppBasketInfoRef', AppBasketInfoRef)

    return this.client.get<GoodsResponse>(this.baseUrl + 'GetOrderSum', { params: params })
  }




  GetImage(GoodCode: string): Observable<TextValue> {

    const params = new HttpParams()

      .append('ClassName', 'TGood')
      .append('IX', '0')
      .append('Scale', '500')
      .append('ObjectRef', GoodCode)

    return this.client.get<any>(this.baseUrl + 'getImage', { params: params })

  }









}
