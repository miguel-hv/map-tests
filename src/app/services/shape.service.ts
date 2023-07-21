import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private http: HttpClient) { }

  getPostalCodesShapes() {
    return this.http.get('/assets/MADRID.geojson');
  }

}
