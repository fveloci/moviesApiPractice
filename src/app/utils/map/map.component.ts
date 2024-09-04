import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { LeafletMouseEvent, Marker, icon, latLng, marker, tileLayer } from 'leaflet';
import { Coordinate, CoordinateWithMessage } from '../../interfaces/coordinate';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [NgIf, LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  options = {}

  iconConfig = {
    icon: icon({
      iconSize: [25,41],
      iconAnchor: [13,41],
      iconUrl: 'marker-icon.png',
      iconRetinaUrl: 'marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  }

  constructor() {
  }

  @Input()
  initialCoordinates: CoordinateWithMessage[] = [];

  @Output()
  selectedCoordinate: EventEmitter<Coordinate> = new EventEmitter<Coordinate>();

  @Input()
  readOnly: boolean = false;

  ngOnInit(): void {
      this.layers = this.initialCoordinates.map(value => {
        let markerVal = marker([value.latitude, value.longitude], this.iconConfig)
        if(value.message) {
          markerVal.bindPopup(value.message, { autoClose: false, autoPan: false })
        }
        return markerVal
      })

      this.options = {
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
        ],
        zoom: 14,
        center: latLng(-32.88999843295217, -68.84312152904296)
      };
  }  
  layers: Marker<any>[] = [];

  handleClick(event: LeafletMouseEvent) {    
    if(!this.readOnly) {
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;
      this.layers = []
      this.layers.push(marker([latitude, longitude], this.iconConfig));
      this.selectedCoordinate.emit({ latitude, longitude })
    }    
  }
}
