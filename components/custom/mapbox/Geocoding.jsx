"use client"
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import dynamic from "next/dynamic";
const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
import { useAddressStore } from "@/app/store/useAddressStore";

const Geocoder = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.Geocoder),
  { ssr: false }
);

export default function MapWithGeocoder() {
  const mapContainerRef = useRef();
  const mapInstanceRef = useRef();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [zoom, setZoom] = useState(11);
  // const address = useAddressStore(state => state.address)
  const updateAddress = useAddressStore(state => state.setAddress)


  const [mapLoaded, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const renderMap = () => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    map.on('moveend', async () => {
      console.log(lat)
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
      updateAddress({ addressText: '', longitude: lat, latitude: lng, mapLink: `https://maps.google.com/?q=${lat},${lng}` })
    });


    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    mapInstanceRef.current = map

    mapInstanceRef.current.on("load", () => {
      setMapLoaded(true);
    });

    setMapLoaded(false)

    return () => map.remove();
  }
  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setLat(pos.lat)
        setLng(pos.lng)
        setZoom(11)
      }
    );
    updateAddress({ addressText: '', longitude: lat, latitude: lng, mapLink: `https://maps.google.com/?q=${lat},${lng}` })

    renderMap()
  }, []);

  useEffect(() => {
    renderMap()
    updateAddress({ addressText: '', longitude: lat, latitude: lng, mapLink: `https://maps.google.com/?q=${lat},${lng}` })


  }, [lat, lng])

  return (
    <div>
      <Geocoder
        accessToken={accessToken}
        map={mapInstanceRef.current}
        mapboxgl={mapboxgl}
        value={inputValue}
        onChange={(d) => {
          setInputValue(d);
        }
        }
        marker
      />
      <div id="map-container" ref={mapContainerRef} style={{ height: 300 }} />
    </div>
  );
}








