import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ lat, long }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      map.flyTo([lat, long]);
    }
  }, [lat, long, map]);

  return (
    <MapContainer
      center={[lat, long]}
      zoom={15}
      zoomControl={false}
      scrollWheelZoom={true}
      whenCreated={(map) => setMap(map)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[lat, long]}>
        <Popup>Current Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
