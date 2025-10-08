import React, { Suspense } from "react";
import { Marker, Popup, MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Icon } from "leaflet";

// Optimize leaflet icons loading
L.Icon.Default.mergeOptions({
  markerUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const SimpleMap = () => {
  const baner = [18.559, 73.7868];

  const redIcon = new Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  return (
    <div className="w-full" role="region" aria-label="Company locations map">
      <Suspense
        fallback={
          <div className="h-96 w-full rounded-lg shadow-lg bg-gray-200 flex items-center justify-center">
            <div className="text-gray-500">Loading map...</div>
          </div>
        }
      >
        <MapContainer
          center={baner}
          zoom={12}
          scrollWheelZoom={false}
          className="h-96 w-full rounded-lg shadow-lg will-change-transform"
          attributionControl={true}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
            loading="lazy"
          />
          <Marker
            position={baner}
            icon={redIcon}
            alt="Magnox Energy Baner Location"
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-lg text-gray-800">
                  Magnox Energy Solutions - Baner
                </h3>
                <div className="mt-2">
                  <a
                    href="tel:+918419871919"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                    aria-label="Call Baner office"
                  >
                    📞 +91 8419871919
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </Suspense>
    </div>
  );
};

export default SimpleMap;
