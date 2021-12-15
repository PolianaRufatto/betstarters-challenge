import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

import { GeoInfoType, ICity, ICountry, IdName, IGeoInfo, IProvince, IRegion } from '../../models/models';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'geo-infos',
  templateUrl: './geo-infos.component.html',
  styleUrls: ['./geo-infos.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GeoInfosComponent),
      multi: true
    }
  ]
})
export class GeoInfosComponent implements ControlValueAccessor, OnInit {

  @Input()
  typeKeys: Array<{ key: number, value: string }>;

  @Input()
  options: { hideProvinces?: boolean, isRemovable?: boolean, canCreate?: boolean } = {hideProvinces: false};

  @Input()
  autoselect: boolean;

  isDisabled: boolean;
  loading: boolean;

  hasValues: boolean;
  active = 0;

  geoInfos: FormArray;
  types = GeoInfoType;
  countries: Array<ICountry>;
  regions: Array<Array<IRegion>> = [];
  provinces: Array<Array<IProvince>> = [];
  cities: Array<Array<ICity>> = [];

  constructor(private fb: FormBuilder, private geoService: CatalogService) {
    this.geoService.countries().then(countries => {
      this.countries = countries;

      if (this.autoselect) {
        setTimeout(() => this.geoInfos.at(0).get('country').setValue(this.countries[0]), 1);
      }
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(geoInfos: Array<IGeoInfo>): void {

    this.hasValues = geoInfos !== null;

    this.geoInfos = this.buildGeoInfos(geoInfos);

    this.geoInfos.valueChanges.subscribe(res => this.propagateChange(res));
  }

  addGeoInfo(typeId: number): void {
    if (this.geoInfos.value.find(x => x.typeId === typeId)) {
      return;
    }

    this.geoInfos.push(this.createGeoInfos({typeId}));
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;

    if (isDisabled) {
      this.geoInfos.controls.forEach(c => c.disable());
    }
  }

  setRegions(country: ICountry, i: number) {
    this.resetFields(i, true, true, true);
    if (!country) {
      return;
    }
    this.geoService.regions(country).then(
      regions => {
        this.geoInfos.at(i).get('region').enable();
        if (regions.length) {
          this.regions[i] = regions;
        } else {
          this.bypass(i, true, true, true);
        }
      }, () => this.bypass(i, true, true, true));
  }

  setProvinces(region: IRegion, i: number) {
    this.resetFields(i, true, true);
    if (!region) {
      return;
    }
    this.geoService.provinces(region).then(
      provinces => {
        this.geoInfos.at(i).get('province').enable();
        if (provinces.length) {
          this.provinces[i] = provinces;
        } else {
          this.bypass(i, true, true);
        }
      }, () => this.bypass(i, true, true));
  }

  setCities(province: IProvince, i: number) {
    this.resetFields(i, true);
    if (!province) {
      return;
    }
    this.geoService.cities(province).then(
      cities => {
        this.geoInfos.at(i).get('city').enable();
        if (cities.length) {
          this.cities[i] = cities;
        } else {
          this.bypass(i, true);
        }
      }, () => this.bypass(i, true));
  }

  isVisible(tab): boolean {

    if (this.typeKeys.length === 1) {
      return false;
    }

    if (this.geoInfos.controls.length) {
      return !this.geoInfos.controls.some(c => {
        return c.get('typeId').value === tab.key;
      });
    }

    return true;
  }

  ngOnInit(): void {
    this.typeKeys = this.typeKeys || this.types.values();
    this.geoInfos = new FormArray([]);

    if (this.typeKeys.length === 1) {
      setTimeout(() => this.addGeoInfo(this.typeKeys[0].key), 0);
    }
  }

  /**
   * @description it checks whether control exists for the key/typeId given
   *
   * @param {AbstractControl[]} controls - forms from each typekey
   * @param {number} key - id from one of the typeKeys
   */
  existsControl(controls: AbstractControl[], key: number) {
    return controls?.find(c => c.value.typeId === key);
  }

  private asIdName(val: any): IdName<string> {
    if (typeof val === 'string') {
      return {
        id: null,
        name: val
      };
    } else {
      return val;
    }
  }

  /**
   * @description this method reset fields and array of region, city or province
   *
   * @param i
   * @param r reset region
   * @param p reset province
   * @param c reset city
   * @private
   */
  private resetFields(i: number, c?: boolean, p?: boolean, r?: boolean) {

    const patch = {};

    if (r) {
      this.regions[i] = null;
      Object.assign(patch, {region: null});
    }

    if (p) {
      this.provinces[i] = null;
      Object.assign(patch, {province: null});
    }

    if (c) {
      this.cities[i] = null;
      Object.assign(patch, {city: null});
    }

    this.geoInfos.at(i).patchValue(patch);
    // this.geoInfos.at(i).updateValueAndValidity();
  }

  private buildGeoInfos(infos: Array<IGeoInfo>) {
    const arr = infos ? infos.map(geoInfo => this.createGeoInfos(geoInfo)) : [];
    return this.fb.array(arr);
  }

  private createGeoInfos(infos?: Partial<IGeoInfo>) {
    const group = this.fb.group({
      id: [],
      address: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      country: ['', Validators.required],
      region: ['', Validators.required],
      province: [''],
      city: ['', Validators.required],
      typeId: [],
      zipCode: ['', Validators.compose([Validators.required, Validators.pattern(/^\w{2,}([-]|\s*)?(\w{2,})?$/), Validators.maxLength(10)])]
    });

    if (!this.options.hideProvinces) {
      group.get('province').setValidators(Validators.required);
    }

    if (infos) {
      // group.patchValue(Object.assign(delivery, {isConfirmed: true}));
      group.patchValue(infos);
    }

    return group;
  }

  private propagateChange(_model: Array<IGeoInfo>) {
  }

  private bypass(i: number, c?: boolean, p?: boolean, r?: boolean) {

    if (c) {
      this.cities[i] = [];
      this.geoInfos.at(i).get('city').enable();
    }

    if (p) {
      this.provinces[i] = [];
      this.geoInfos.at(i).get('province').enable();
    }

    if (r) {
      this.regions[i] = [];
      this.geoInfos.at(i).get('region').enable();
    }
  }
}
