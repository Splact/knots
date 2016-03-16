const TOTAL_COUNT = 20;

const susolvkaCoords = { lat: 40.8540942, lng: 14.1765627 };

let markersData = [...Array(TOTAL_COUNT)].fill(0) // fill(0) for loose mode
  .map((__, index) => ({
    id: index,
    lat: susolvkaCoords.lat +
      0.01 * index *
      Math.sin(30 * Math.PI * index / 180) *
      Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180),
    lng: susolvkaCoords.lng +
      0.01 * index *
      Math.cos(70 + 23 * Math.PI * index / 180) *
      Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180)
  }));

let stores = {
  MarkerStore: {
    markers: markersData
  }
};

let storage = {
  app: JSON.stringify(stores)
};

export default {
  get() {
    return storage.app;
  },
  set(k, v) {
    storage.app = JSON.stringify(v);
  }
};
