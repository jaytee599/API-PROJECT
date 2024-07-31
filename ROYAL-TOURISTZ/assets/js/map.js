let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  const marker = new AdvancedMarkerElement({
    map: map,
    position: { lat: -34.397, lng: 150.644 },
  });
}

window.initMap = initMap; // Ensure initMap is available globally
