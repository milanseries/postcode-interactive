import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export const MapContainer = ({ lat, loc }: { lat?: number | null; loc?: number | null }) => {
  return (
    <>
      <APIProvider apiKey={process.env.NEXT_MAP_API_KEY || ""}>
        <Map
          style={{ width: "100%", height: "400px" }}
          center={{ lat: lat ?? 0, lng: loc ?? 0 }}
          defaultZoom={10}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <Marker position={{ lat: lat ?? 0, lng: loc ?? 0 }} />
        </Map>
      </APIProvider>
    </>
  );
};
