import {
  MapContainer,
  Marker,
  Popup,
  Polyline,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";

const pickupIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const destinationIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function RideMap({
  pickup = {
    name: "Ruston, LA",
    position: [32.5232, -92.6379],
  },
  destination = {
    name: "Monroe, LA",
    position: [32.5093, -92.1193],
  },
}) {
  const center = [
    (pickup.position[0] + destination.position[0]) / 2,
    (pickup.position[1] + destination.position[1]) / 2,
  ];

  const route = [
    pickup.position,
    destination.position,
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <MapContainer
        center={center}
        zoom={10}
        scrollWheelZoom={false}
        className="h-87.5 w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline
          positions={route}
          pathOptions={{
            color: "#2563eb",
            weight: 5,
          }}
        />

        <Marker
          position={pickup.position}
          icon={pickupIcon}
        >
          <Popup>
            <strong>Pickup</strong>
            <br />
            {pickup.name}
          </Popup>
        </Marker>

        <Marker
          position={destination.position}
          icon={destinationIcon}
        >
          <Popup>
            <strong>Destination</strong>
            <br />
            {destination.name}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default RideMap;