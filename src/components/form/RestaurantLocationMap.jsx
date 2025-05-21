import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Map } from 'lucide-react';
import 'leaflet/dist/leaflet.css';



// Fix Leaflet icon issue
const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

// Interactive map component
const InteractiveMap = ({ onLocationSelect, selectedLocation }) => {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect([lat, lng]);
    },
  });

  // Center map on the selected location when it changes
  useEffect(() => {
    if (selectedLocation) {
      map.setView(selectedLocation, map.getZoom());
    }
  }, [selectedLocation, map]);

  return selectedLocation ? <Marker position={selectedLocation} icon={markerIcon} /> : null;
};


const RestaurantLocationMap = ({ onLocationSelect, selectedLocation }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Default center coordinates (San Francisco)
  const defaultCenter = [37.7749, -122.4194];
  
  // Set initial map center based on user's selection or default
  const center = selectedLocation || defaultCenter;

  // Simulate map loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full rounded-lg overflow-hidden shadow-md border border-gray-200">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <Map size={32} className="mx-auto text-blue-500 animate-pulse" />
            <p className="mt-2 text-gray-600 text-sm">Loading map...</p>
          </div>
        </div>
      )}
      
      <div className={`h-full transition-opacity duration-500 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <InteractiveMap 
            onLocationSelect={onLocationSelect} 
            selectedLocation={selectedLocation}
          />
        </MapContainer>
      </div>
      
      <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 py-2 px-3 rounded-md text-xs text-gray-600 shadow-sm">
        Click anywhere on the map to select a location and get coordinates
      </div>
    </div>
  );
};

export default RestaurantLocationMap;