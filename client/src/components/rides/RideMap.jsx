import {
  MapContainer,
  Marker,
  Popup,
  Polyline,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
import { locations } from "../../data/locations";

const DEFAULT_PICKUP = {
  name: "Ruston, LA",
  position: [32.5232, -92.6379],
};

const DEFAULT_DESTINATION = {
  name: "Monroe, LA",
  position: [32.5093, -92.1193],
};

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

function resolveLocation(loc, defaultLoc) {
  if (!loc) return defaultLoc;
  if (typeof loc === "string") {
    return locations[loc] || { name: loc, position: defaultLoc.position };
  }
  if (
    typeof loc === "object" &&
    Array.isArray(loc.position) &&
    loc.position.length === 2 &&
    typeof loc.position[0] === "number" &&
    typeof loc.position[1] === "number"
  ) {
    return loc;
  }
  return defaultLoc;
}

function RideMap({ pickup, destination }) {
  const resolvedPickup = resolveLocation(pickup, DEFAULT_PICKUP);
  const resolvedDestination = resolveLocation(destination, DEFAULT_DESTINATION);

  const center = [
    (resolvedPickup.position[0] + resolvedDestination.position[0]) / 2,
    (resolvedPickup.position[1] + resolvedDestination.position[1]) / 2,
  ];

  const route = [
    resolvedPickup.position,
    resolvedDestination.position,
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <MapContainer
        key={`${resolvedPickup.position.join(",")}-${resolvedDestination.position.join(",")}`}
        center={center}
        zoom={10}
        scrollWheelZoom={false}
        className="h-87.5 w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
          position={resolvedPickup.position}
          icon={pickupIcon}
        >
          <Popup>
            <strong>Pickup</strong>
            <br />
            {resolvedPickup.name}
          </Popup>
        </Marker>

        <Marker
          position={resolvedDestination.position}
          icon={destinationIcon}
        >
          <Popup>
            <strong>Destination</strong>
            <br />
            {resolvedDestination.name}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default RideMap;