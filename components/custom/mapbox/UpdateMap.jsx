"use client"
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import dynamic from "next/dynamic";
const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
import { useMapStore } from "@/app/store/useMapStore";
import { Button } from "@/components/ui/button"
import CustomButton from "../button/CustomButton";
import { LocateFixed } from "lucide-react";
import { UpdateMapAddress } from "@/app/actions/users/updateMapAddress";
import toast from "react-hot-toast";

const Geocoder = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.Geocoder),
  { ssr: false }
);

export default function UpdateMap() {
  const mapContainerRef = useRef();
  const mapInstanceRef = useRef();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [zoom, setZoom] = useState(11);
  // const address = useAddressStore(state => state.address)
  const updateMap = useMapStore(state => state.setMap)
  const mapAddress = useMapStore(state => state.map)

  const handleUpdateMap = async () => {
    console.log(mapAddress)
    const updateResult = await UpdateMapAddress({ props: mapAddress })
    if (updateResult.success) {
      toast.success(updateResult.message)
    } else {
      toast.error(updateResult.message)
    }
  }


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
      updateMap({ addressText: '', longitude: lat, latitude: lng, mapLink: `https://maps.google.com/?q=${lat},${lng}` })
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
    renderMap()
  }, []);

  useEffect(() => {
    renderMap()
    updateMap({ addressText: '', longitude: lat, latitude: lng, mapLink: `https://maps.google.com/?q=${lat},${lng}` })

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
      <div id="map-container" ref={mapContainerRef} style={{ height: 300, borderRadius: 20 }} />

      <div className="mt-6 w-full flex items-center justify-center">
        <Button text="" onClick={() => { handleUpdateMap() }} className="bg-blue-500 hover:bg-blue-500" >
          <LocateFixed className="mr-2" />
          Cập nhật vị trí
        </Button>
      </div>
    </div>
  );
}

