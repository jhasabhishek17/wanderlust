// below is the code for mapbox api to show the location of the listing on the map
    mapboxgl.accessToken = mapToken;

    
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

    const marker = new mapboxgl.Marker({color: 'red'})
    .setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
    .setPopup(new mapboxgl.Popup({offset: 25}) // add popups
    .setHTML(
        `<h4>${listing.title}</h4><p>${listing.location}</p>`
    )
    )
    .addTo(map);