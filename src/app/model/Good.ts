export interface Good{
    rwn?:string,
    GoodCode?:string,
    GoodName?:string,
    MaxSellPrice?:string,
    RowCode?:string,
    DefaultUnitValue?:string,
    GoodUnitRef?:string,
    PrivateCodeForSort?:string,
    ErrCode?:string,
    ErrDesc?:string,
    Amount?:string,
    Explain?:string,
    Price?:string,
    AppBasketInfoRef?:string,
    FactorCode?:string,
    SumFacAmount?:string,
    SumPrice?:string,
    CountGood?:string,
    InfoState?:string,
    AppBasketInfoCode?:string,
}

export interface GoodsResponse {    Goods :  Good []; }


