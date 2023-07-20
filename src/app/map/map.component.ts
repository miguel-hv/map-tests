import { Component } from '@angular/core';
import { Map, TileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private map!:Map;

  private initMap(): void {
    this.map = new Map('map', {
      center: [ 40.4422, -3.4895 ],
      zoom: 3
    });
    const tiles = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor() { 
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
