/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const airdrops = [
  {
    id: "ad-001",
    locationName: "Ainsdale Corner 1",
    latitude: 2.733597,
    longitude: 101.894016,
    position: "0 3 0",
    scale: "1 1 1",
    color: "red",
    reward: {
      points: 1,
      item: "UC",
    },
  },
  {
    id: "ad-002",
    locationName: "Ainsdale Fence Corner 2",
    latitude: 2.733615,
    longitude: 101.894279,
    position: "-10 2 0",
    scale: "1 1 1",
    color: "blue",
    reward: {
      points: 1,
      item: "UC",
    },
  },
  {
    id: "ad-003",
    locationName: "inside my house",
    latitude: 2.7334544,
    longitude: 101.8941537,
    position: "20 0 -20",
    scale: "1 1 1",
    color: "green",
    reward: {
      points: 1,
      item: "UC",
    },
  },
  {
    id: "ad-004",
    locationName: "my location",
    latitude: 2.7334647,
    longitude: 101.8942552,
    position: "10 10 10",
    scale: "0.5 0.5 0.5",
    color: "yellow",
    reward: {
      points: 1,
      item: "UC",
    },
  },
];

const positionOptions = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 5000,
};

const WebAR2 = () => {
  const [data, setData] = useState([]);
  const [myPosition, setMyPosition] = useState({
    lat: 0,
    lon: 0,
    alt: 0,
  });

  const getData = () => {
    try {
      if (airdrops) {
        setData(airdrops);
      }
    } catch (err) {
      console.log("[ERROR] :: ", { err });
    }
  };

  const renderCrates = (item) => {
    const { id, latitude, longitude, position, rotation, scale, color } = item;

    return (
      <a-box
        key={id}
        id={id}
        width="2"
        height="2"
        depth="2"
        color={color}
        scale={scale}
        rotation={rotation}
        position={position}
        gps-entity-place={`latitude: ${latitude}; longitude: ${longitude}`}
      />
    );
  };

  const handlePositionSuccess = async (position) => {
    const { coords } = position;
    setMyPosition({
      lat: coords.latitude,
      lon: coords.longitude,
      alt: coords.altitude,
    });
  };

  const handlePositionError = (err) => {
    alert(`[ERR] - handlePositionErrors :: ${err}`);
  };

  useEffect(() => {
    getData();
    navigator.geolocation.getCurrentPosition(
      handlePositionSuccess,
      handlePositionError,
      positionOptions
    );
  }, []);

  const clickListener = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    alert("click");
  };

  useEffect(() => {
    const crates = document.querySelectorAll("a-box");
    console.log("[DEBUG] :: ", { crates });

    if (crates.length) {
      crates.forEach((crate) => crate.addEventListener("click", clickListener));
    }
    // if (crates.length > 0) {
    //   crates.forEach((crate) => crate.addEventListener("click", clickListener));
    // }
  }, [data]);

  return (
    <div style={{ display: "block", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          zIndex: 100,
          top: 0,
          right: 0,
          backgroundColor: "#212121",
          padding: "5px",
          color: "#EEE",
        }}
      >
        <p style={{ margin: 0, fontSize: 8 }}>Latitude: {myPosition.lat}</p>
        <p style={{ margin: 0, fontSize: 8 }}>Longitude: {myPosition.lon}</p>
        <p style={{ margin: 0, fontSize: 8 }}>Altitude: {myPosition.alt}</p>
        <p style={{ margin: 0, fontSize: 8 }}>Crates: {data.length}</p>
        {/* <p style={{ margin: 0, fontSize: 8 }}>object(s): {data.length}</p> */}
      </div>

      <a-scene
        stats
        vr-mode-ui="enabled: false"
        cursor="rayOrigin: mouse; fuse: false; fuseTimeout: 1000;"
        raycaster="objects: [clickhandler];"
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false; trackingMethod: best;"
        renderer="antialias: true; alpha: true"
      >
        {data.length > 0 && data.map(renderCrates)}
        {/* <a-box
          id="crate-001"
          width="2"
          height="2"
          depth="2"
          color="red"
          scale="1 1 1"
          rotation="0 20 0"
          position="0 10 0"
          gps-entity-place="latitude: 2.733597; longitude: 101.894016"
        /> */}
        <a-camera
          //   gps-camera={`maxDistance: 30; alert:true; posMinAccuracy:100; simulateLatitude: ${myLocation.lat}; simulateLongitude: ${myLocation.lon}; simulateAltitude: ${myLocation.alt}`}
          gps-camera
          rotation-reader
        ></a-camera>
      </a-scene>
    </div>
  );
};

export default WebAR2;
