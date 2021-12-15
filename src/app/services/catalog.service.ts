import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICity, ICountry, ICurrency, IPrefix, IProvince, IRegion } from '../models/models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  readonly url = 'https://api-catalogs.betstarters.cloud';
  currencies$: BehaviorSubject<Array<ICurrency>>;
  private _prefixes: Array<IPrefix>;
  private _countries: Array<ICountry>;

  /**
   * @ignore
   */
  constructor(private http: HttpClient) {
  }


  /**
   * @returns prefixes for the app, prefixes are cached in memory after first call because they are static for each bookmakerId
   */
  prefixes(): Promise<Array<IPrefix>> {
    if (this._prefixes) { // prefixes are static foreach bookmakerId
      return of(this._prefixes).toPromise();
    }
    return this.http.get<Array<IPrefix>>(`${this.url}/prefixes`).pipe(tap(prefixes => this._prefixes = prefixes)).toPromise();
  }

  /**
   * @returns Array of currencies for the app, currencies are cached in memory after first call because they are static for each bookmakerId
   */
  currencies(): Observable<Array<ICurrency>> {
    if (this.currencies$) {
      return of(this.currencies$.getValue());
    }
    return this.http.get<Array<ICurrency>>(`${this.url}/currencies`).pipe(tap(currencies => {
      currencies[0].selected = true;
      this.currencies$ = new BehaviorSubject<Array<ICurrency>>(currencies);
    }));
  }

  /**
   * @returns promise like object of Currency from the provided id
   * @param id
   */
  currency(id: number): Promise<ICurrency> {
    return this.http.get<ICurrency>(`${this.url}/currencies/${id}`).toPromise();
  }

  /**
   * GET /geo/countries
   * countries are cached in memory after first call because they are static for each bookmakerId
   * @returns countries for the app as Array of countries
   */
  countries(): Promise<Array<ICountry>> {
    if (this._countries) {
      return of(this._countries).toPromise();
    }
    return this.http.get<Array<ICountry>>(`${this.url}/geo/countries`).pipe(tap(countries => this._countries = countries)).toPromise();
  }

  /**
   * GET /geo/countries/:ID/regions
   * @returns array of regions or 404
   * @param country
   */
  regions(country: ICountry): Promise<Array<IRegion>> {
    return this.http.get<Array<IRegion>>(`${this.url}/geo/countries/${country.id}/regions`).toPromise();
  }

  /**
   * GET /geo/regions/:ID/provinces
   * @returns array provinces or 404
   * @param region
   */
  provinces(region: IRegion): Promise<Array<IProvince>> {
    return this.http.get<Array<IProvince>>(`${this.url}/geo/regions/${region.id}/provinces`).toPromise();
  }

  /**
   * GET /geo/provinces/:ID/cities
   * @returns Array cities or 404
   * @param province
   */
  cities(province: IProvince): Promise<Array<ICity>> {
    return this.http.get<Array<ICity>>(`${this.url}/geo/provinces/${province.id}/cities`).toPromise();
  }


}
