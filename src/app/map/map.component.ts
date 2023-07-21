import { Component } from '@angular/core';
import { Icon, Map, Marker, TileLayer, geoJSON } from 'leaflet';
import { MarkerService } from '../services/marker.service';
import { ShapeService } from '../services/shape.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = new Icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private map!:Map;
  private postalCodes!: any;

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

  constructor(private markerService: MarkerService, private shapeService: ShapeService) { 
  }
  
  private initPostalCodesLayer() {
    const postalCodesLayer = geoJSON(this.postalCodes, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.25,
        fillColor: '#52e92c00'
      }),
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetFeature(e)),
        })
      )
    });

    this.map.addLayer(postalCodesLayer);
    postalCodesLayer.bringToBack(); //moves layer to background
  }

  ngAfterViewInit(): void {
    this.initMap();
    // this.markerService.makeCityMarkers(this.map);
    this.markerService.makeCityCircleMarkers(this.map);
    this.shapeService.getPostalCodesShapes().subscribe(postalCodes => {
      this.postalCodes = postalCodes;
      this.initPostalCodesLayer();
    });
  }

  private highlightFeature(e:any){
    const layer = e.target;
  
    layer.setStyle({
      weight: 10,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042'
    });
  }
  
  private resetFeature(e:any) {
    const layer = e.target;
  
    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#52e92c00'
    });
  }

}
