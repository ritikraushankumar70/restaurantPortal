"use client";

import { useState } from "react";
import { MapPin, Loader2, Navigation } from "lucide-react";

interface LocationDetectorProps {
  onLocationFound?: (address: string) => void;
}

export default function LocationDetector({ onLocationFound }: LocationDetectorProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number; accuracy: number; address?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAddress = async (lat: number, lng: number, accuracy: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      const address = data.display_name || "Unknown Location";
      
      setLocation({ lat, lng, accuracy, address });
      if (onLocationFound) {
        onLocationFound(address);
      }
    } catch (err) {
      console.error("Failed to fetch address:", err);
      setLocation({ lat, lng, accuracy, address: "Address not found" });
      if (onLocationFound) {
        onLocationFound("Unknown Location");
      }
    } finally {
      setLoading(false);
    }
  };

  const detectLocation = () => {
    if (window.isSecureContext === false && window.location.hostname !== 'localhost') {
      setError("Geolocation requires a secure connection (HTTPS) or localhost.");
      return;
    }

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);

    const handleSuccess = (position: GeolocationPosition) => {
      fetchAddress(
        position.coords.latitude,
        position.coords.longitude,
        position.coords.accuracy
      );
    };

    const handleError = (err: GeolocationPositionError, isHighAccuracy: boolean) => {
      if (isHighAccuracy && err.code === err.TIMEOUT) {
        navigator.geolocation.getCurrentPosition(
          handleSuccess,
          (lowAccErr) => handleFinalError(lowAccErr),
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
        );
      } else {
        handleFinalError(err);
      }
    };

    const handleFinalError = (err: GeolocationPositionError) => {
      setLoading(false);
      switch (err.code) {
        case err.PERMISSION_DENIED:
          setError("Location permission denied. Please allow location access in your browser settings and try again.");
          break;
        case err.POSITION_UNAVAILABLE:
          setError("Location information is unavailable on this device.");
          break;
        case err.TIMEOUT:
          setError("Request timed out. Ensure your GPS/Location is enabled on this device.");
          break;
        default:
          setError("An unknown error occurred while detecting location.");
          break;
      }
    };

    // First attempt: High accuracy
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      (err) => handleError(err, true),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-2">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
          <Navigation size={24} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Current Location</h2>
      </div>
      
      <p className="text-gray-600 mb-6 text-sm">
        Allow location access to get the most exact delivery and distance estimates.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <button
          onClick={detectLocation}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <MapPin size={20} />
          )}
          {loading ? "Detecting exact location..." : "Use My Current Location"}
        </button>
        
        <div className="text-gray-400 font-medium hidden sm:block">OR</div>
        
        <div className="flex w-full sm:w-auto gap-2">
          <input 
            type="text" 
            placeholder="Type your address manually..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-[250px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                if (onLocationFound) {
                  onLocationFound(e.currentTarget.value.trim());
                }
              }
            }}
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex flex-col gap-2">
          <strong>Detection Failed:</strong>
          <span>{error}</span>
          <span className="text-xs opacity-80">Make sure location services are turned ON in your device settings.</span>
        </div>
      )}

      {location && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Exact Location Found</h3>
          
          <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100 mb-4">
            <p className="text-xs text-gray-500 mb-1">Detected Address</p>
            <p className="font-semibold text-gray-900 text-sm">{location.address}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Latitude</p>
              <p className="font-medium text-gray-900">{location.lat.toFixed(6)}</p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Longitude</p>
              <p className="font-medium text-gray-900">{location.lng.toFixed(6)}</p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Accuracy</p>
              <p className="font-medium text-gray-900">Within {Math.round(location.accuracy)} meters</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
             <a 
               href={`https://www.google.com/maps?q=${location.lat},${location.lng}`} 
               target="_blank" 
               rel="noreferrer"
               className="text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center gap-1 inline-flex"
             >
               View on Google Maps <MapPin size={14} />
             </a>
          </div>
        </div>
      )}
    </div>
  );
}
