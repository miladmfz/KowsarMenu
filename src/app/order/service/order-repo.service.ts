import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Good, GoodsResponse } from '../../model/Good';
import { Group, GroupsResponse } from '../../model/group';
import { TextValue } from 'src/app/model/textvalue';
import { BasketInfo } from 'src/app/model/BasketInfo';


@Injectable({
  providedIn: 'root'
})
export class OrderRepoService {

  constructor(private client:HttpClient) { }

  baseUrl = '87.107.78.234:60005/logincoffee';



  getAllGood(GroupCode: string,AppBasketInfoRef: string):Observable<GoodsResponse>{
    return this.client.get<GoodsResponse>('http://'+this.baseUrl+'/index.php?tag=GetOrderGoodList&GroupCode='+GroupCode+'&AppBasketInfoRef=' + AppBasketInfoRef);
  }


  getAllGroup():Observable<GroupsResponse>{
    return this.client.get<GroupsResponse>('http://'+this.baseUrl+'/index.php?tag=GetOrdergroupList&GroupCode=71');
  }

  
  GetGroupCode():Observable<TextValue>{
    return this.client.get<TextValue>('http://'+this.baseUrl+'/index.php?tag=kowsar_info&Where=AppOrder_DefaultGroupCode');
  
  }

  getGroupsByCode(groupCode: string): Observable<GroupsResponse> {
    return this.client.get<GroupsResponse>('http://'+this.baseUrl+'/index.php?tag=GetOrdergroupList&GroupCode=' + groupCode);
  }


  GetRstMizData(id: string): Observable<BasketInfo[]> {
    return this.client.get<BasketInfo[]>('http://'+this.baseUrl+'/index.php?tag=WebOrderMizData&RstMizCode=' + id);
  }

  OrderInfoInsert(rstmizCode: string,today:string): Observable<BasketInfo[]> {
    return this.client.get<BasketInfo[]>('http://'+this.baseUrl+'/index.php?tag=WebOrderInfoInsert&Miz=' + rstmizCode+'&Date='+today);
  }


  GetBasketOrder(AppBasketInfoRef: string): Observable<GoodsResponse> {
    return this.client.get<GoodsResponse>('http://'+this.baseUrl+'/index.php?tag=OrderGet&AppType=3&AppBasketInfoRef=' + AppBasketInfoRef);
  }

  
  OrderRowInsert(good:Good,amount:string,desc:string,AppBasketInfoRef: string): Observable<GoodsResponse> {

    return this.client.get<GoodsResponse>('http://'+this.baseUrl+'/index.php?tag=OrderRowInsert&GoodRef='+good.GoodCode+ '&FacAmount='+amount+ '&Price='+good.MaxSellPrice+ '&bUnitRef='+good.GoodUnitRef+ '&bRatio='+good.DefaultUnitValue+ '&Explain='+desc+ '&InfoRef='+AppBasketInfoRef+ '&RowCode='+good.RowCode);
  }

  OrderRowDelete(good:Good,AppBasketInfoRef: string): Observable<GoodsResponse> {

    return this.client.get<GoodsResponse>('http://'+this.baseUrl+'/index.php?tag=DeleteGoodFromBasket&AppBasketInfoRef=' + AppBasketInfoRef+'&RowCode=' + good.RowCode);
  }



  GetOrderSum(AppBasketInfoRef: string):Observable<GoodsResponse>{
    return this.client.get<GoodsResponse>('http://'+this.baseUrl+'/index.php?tag=GetOrderSum&AppBasketInfoRef=' + AppBasketInfoRef);
  }

  
  

}
