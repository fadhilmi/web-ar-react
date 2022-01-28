# Getting Started with web-ar-react


In the project directory, you can run:

### `yarn start-https`

p/s: need to run in **https** to be able to use ARjs

Runs the app in the development mode.\

Open [https://localhost:3000](https://localhost:3000) to view it in your browser.

The page will reload when you make changes.\

You may also see any lint errors in the console.

  

## Files  
Since there are multiple ways of implementing AR.js; I created few file for each implementation:

  

### WebAR
render objects by appending them into `<a-scene>`

    const  scene  =  document.querySelector("a-scene");
    const  crates  =  await  getData();
    
    if (crates.length  >  0) {
	    crates.forEach((crate) => {
		    const  latitude  =  crate.latitude;
		    const  longitude  =  crate.longitude;
		    
		    const  box  =  document.createElement("a-box");
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
		    box.addEventListener("loaded", () => window.dispatchEvent(new  CustomEvent("gps-entity-place-loaded"))
		    );
		    
		    box.addEventListener("click", clickListener, true);
		    scene.appendChild(box);
		    });
	    }
    }

  
### WebAR2
render objects by `data.map(renderCrates)` :

    const  renderCrates  = (item) => {
    	const { id, latitude, longitude, position, rotation, scale, color } =  item;
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

  

### WebAR3

This file is just for try and error 😁

  
#### Rendering:

  

## Resources

  

-  [Build your Location-Based Augmented Reality Web App - By Nicolò Carpignoli](https://medium.com/chialab-open-source/build-your-location-based-augmented-reality-web-app-c2442e716564).

  

-  [How to handle click events on AR.js - By Nicolò Carpignoli](https://medium.com/swlh/how-to-handle-click-events-on-ar-js-f397ea5994d)

  

- https://github.com/jeromeetienne/AR.js/blob/location-based/aframe/examples/click-places/places.js