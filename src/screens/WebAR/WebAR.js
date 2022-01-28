/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const airdrops = [
  {
    id: "ad-001",
    locationName: "Ainsdale Corner 1",
    latitude: 2.733597,
    longitude: 101.894016,
    position: "0 100 0",
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
    position: "-10 82 0",
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
    position: "20 110 -20",
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
    position: "10 90 10",
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

const WebAR = () => {
  const [myPosition, setMyPosition] = useState({
    lat: 0,
    lon: 0,
    alt: 0,
  });

  const getData = () => {
    try {
      if (airdrops) {
        return airdrops;
      }
    } catch (err) {
      return null;
      console.log("[ERROR] :: ", { err });
    }
  };

  const clickListener = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    alert("click");
  };

  const handlePositionSuccess = async (position) => {
    const { coords } = position;

    setMyPosition({
      lat: coords.latitude,
      lon: coords.longitude,
      alt: coords.altitude,
    });

    const scene = document.querySelector("a-scene");
    const crates = await getData();
    if (crates.length > 0) {
      crates.forEach((crate) => {
        const latitude = crate.latitude;
        const longitude = crate.longitude;

        const box = document.createElement("a-box");
        box.setAttribute(
          "gps-entity-place",
          `latitude: ${latitude}; longitude: ${longitude}`
        );
        box.setAttribute("id", crate.id);
        box.setAttribute("width", "2");
        box.setAttribute("height", "2");
        box.setAttribute("depth", "2");
        box.setAttribute("position", crate.position);

        // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
        box.setAttribute("scale", crate.scale);
        box.setAttribute("color", crate.color);

        box.addEventListener("loaded", () =>
          window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"))
        );

        console.log("[DEBUG] :: ", { box });
        box.addEventListener("click", clickListener, true);

        scene.appendChild(box);
      });
    }
  };

  const handlePositionError = (err) => {
    alert(`[ERR] - handlePositionErrors :: ${err}`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      handlePositionSuccess,
      handlePositionError,
      positionOptions
    );
  }, []);

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
        {/* <p style={{ margin: 0, fontSize: 8 }}>object(s): {data.length}</p> */}
      </div>

      <a-scene
        stats
        vr-mode-ui="enabled: false"
        cursor="rayOrigin: mouse; fuse: false; fuseTimeout: 1000;"
        // raycaster="objects: [clickhandler];"
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false; trackingMethod: best;"
        renderer="antialias: true; alpha: true"
      >
        <a-camera
          //   gps-camera={`maxDistance: 30; alert:true; posMinAccuracy:100; simulateLatitude: ${myLocation.lat}; simulateLongitude: ${myLocation.lon}; simulateAltitude: ${myLocation.alt}`}
          gps-camera="maxDistance: 30; alert:true; posMinAccuracy:100;"
          rotation-reader
        >
          <a-cursor></a-cursor>
        </a-camera>
      </a-scene>
    </div>
  );
};

export default WebAR;
