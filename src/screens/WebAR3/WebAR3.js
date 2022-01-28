/* eslint-disable react-hooks/exhaustive-deps */
// import * as AFRAME from "aframe";

import { Entity, Scene } from "aframe-react";
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

const WebAR3 = () => {
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

  const handleClick = (evt) => {
    console.log("[DEBUG] :: ", { evt });
    alert("Click!");
  };

  // useEffect(() => {
  //   const crates = document.querySelector("[id^='box']");
  //   console.log("[DEBUG] :: ", { crates });
  //   if (crates) {
  //     crates.addEventListener("click", handleClick);
  //   }
  // }, []);

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

      {/* <a-scene
        stats
        vr-mode-ui="enabled: false"
        // cursor="rayOrigin: mouse; fuse: true; fuseTimeout: 10000;"
        // raycaster="objects: [clickhandler];"
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false; trackingMethod: best;"
        renderer="antialias: true; alpha: true"
      >
        <a-camera
          gps-camera="maxDistance: 30; alert:true; posMinAccuracy:100;"
          rotation-reader
        ></a-camera>
      </a-scene> */}
      <Scene
        stats
        vr-mode-ui="enabled: false"
        cursor="rayOrigin: mouse; fuse: true; fuseTimeout: 10000;"
        // raycaster="objects: [clickhandler];"
        // raycaster="objects: .clickable"
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false; trackingMethod: best;"
        renderer="antialias: true; alpha: true"
      >
        <Entity
          id="box"
          cursor-listener
          geometry="primitive: box"
          material="color: green"
          gps-entity-place="latitude: 2.733597; longitude: 101.894016"
          geometry={{ primitive: "box" }}
          material={{ color: "red" }}
          position={{ x: 0, y: 0, z: -5 }}
        />

        <Entity
          // camera
          // look-controls
          //   gps-camera={`maxDistance: 30; alert:true; posMinAccuracy:100; simulateLatitude: ${myLocation.lat}; simulateLongitude: ${myLocation.lon}; simulateAltitude: ${myLocation.alt}`}
          gps-camera="maxDistance: 30; alert:true; posMinAccuracy:100;"
          rotation-reader
        >
          <Entity
            cursor="fuse: true; fuseTimeout: 500"
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: black; shader: flat"
          ></Entity>
        </Entity>
      </Scene>
    </div>
  );
};

export default WebAR3;
