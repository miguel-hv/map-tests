import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CircleMarker, Map, Marker } from 'leaflet';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  cities: string = '/assets/myCities.geojson';

  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  constructor(
    private http: HttpClient,
    private popupService: PopupService
  ) { }

  makeCityMarkers(map: Map): void { 
    this.http.get(this.cities).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = new Marker([lat, lon]);
        
        marker.addTo(map);
      }
    });
  }

  makeCityCircleMarkers(map: Map): void {
    this.http.get(this.cities).subscribe((res: any) => {
      for (const c of res.features) {
      const maxPop = Math.max(...res.features.map((x:any) => x.properties.population), 0);
      const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const circle = new CircleMarker([lat, lon],
          {
            radius: MarkerService.scaledRadius(c.properties.population, maxPop)
          });
        
          circle.bindPopup(this.popupService.makeCityPopup(c.properties));

        circle.addTo(map);
      }
    });
  }
}
