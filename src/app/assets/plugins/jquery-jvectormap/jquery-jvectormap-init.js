$('#world-map').vectorMap({
  map: 'world_mill_en',
      backgroundColor: "transparent",
  regionStyle: {
    initial: {
      fill: '#C2C2C2' // Set the initial fill color for all regions
    },
    // Add more specific styles for individual regions here
    // Example:
    'Australia': {
      fill: 'blue' // Set the fill color for the United States
    },
    // ...
  },
  normalizeFunction: "polynomial",
  hoverOpacity: 0.8,
  markers: [
    { latLng: [47.14, 9.52], name: "Australia", style: { r: 10 } },
    { latLng: [3.2, 73.22], name: "Maldives", style: { r: 12 } },
    { latLng: [37.0902, 95.7129], name: "China", style: { r: 10 } },
    { latLng: [14.01, -60.98], name: "Saint Lucia", style: { r: 11 } },
    { latLng: [1.3, 103.8], name: "Singapore", style: { r: 10 } },
    { latLng: [61.5240, 105.3188], name: "Russia", style: { r: 13 } },
 ],
  markerStyle: {
    initial: {
      fill: "#924AEF",
      stroke: "#FFFFFF",
      r: 8,
      "stroke-width": 4,
    },
    hover: {
      fill: "#924AEF",
      stroke: "#FFFFFF",
      // r: 8,
      "stroke-width": 2,
    },
  },
});


