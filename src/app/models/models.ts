import { KeyValue } from '@angular/common';

export interface ICountry {
  id?: number;
  code: string;
  name: string;
}

export interface IRegion {
  id: number;
  countryId: number;
  name: string;
}

export interface IProvince {
  id: number;
  regionId: number;
  name: string;
}

export interface ICity {
  id: number;
  provinceId: number;
  name: string;
}

export interface ICurrency {
  id: number;
  code: string;
  name: string;
  symbol?: string;
  selected?: boolean;
}

export class CurrencyConversion {
  currencyId: number;
  currencyCode: string;
  currencySymbol: string;
  subunit: number;
  rate: number;
}

export interface Amount extends CurrencyConversion {
  amount: number;
  amountDeposit: number;
  amountWithdrawable: number;
  amountBonus: number;
  amountOverdraft: number;
}


export declare interface IdName<T, S = number> {
  id: S;
  name: T;
  selected?: boolean;
}

export function idNames(T): Array<IdName<any>> {
  return Object.keys(T).filter(type => typeof T[type] === 'string').map(key => ({name: T[key], id: +key}));
}

export function keyValues(T): Array<KeyValue<number, string>> {
  return Object.keys(T).filter(type => !isNaN(type as any) && type !== 'values').map(key => ({key: +key, value: T[key]}));
}

export function asStrings(T): Array<string> {
  return Object.values<string>(T).filter((x) => typeof x === 'string');
}


export enum GeoInfoType {
  Residence = 3
}

export namespace GeoInfoType {
  export function values(): Array<{ key: number, value: string }> {
    return keyValues(GeoInfoType);
  }

  export function names(): Array<{ id: number, name: string }> {
    return idNames(GeoInfoType);
  }
}


export interface IGeoInfo {
  id: number;
  address?: string;
  country: ICountry;
  region: IRegion;
  typeId: GeoInfoType;
  city?: ICity;
  latitude?: number;
  longitude?: number;
  province?: IProvince;
  zipCode?: string;
}

export interface IPrefix {
  id: number;
  name: string;
  prefix: string;
  code?: string;
}

export class IMobilePrefix {
  phone: string;
  prefix: IPrefix;

  constructor(phone: string, prefix: IPrefix) {
    this.phone = phone;
    this.prefix = prefix;
  }
}
