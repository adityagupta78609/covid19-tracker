import React from 'react'
import {MapContainer as LeafletMap,TileLayer} from "react-leaflet";
import "./Map.css"
import { showDataOnMap } from './util';
export default function Map({countries,center , zoom}) {



  return (
    <div className='map'>

      <LeafletMap center={center} zoom={zoom}>
      <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution ='&copy; <a href="http;//osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {showDataOnMap(countries,"cases")}
      {/* loop through countries and draw circle */}

      </LeafletMap>
    </div>
  )
}

 
