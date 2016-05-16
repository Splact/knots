export default {
  localforage: {
    key: 'knots',
    name: 'knots',
    version: 1.0,
    storeName: 'knots_balloons',
    description: 'Persistent storage for Knots Balloons',
  },
  api: {
    baseURL: 'http://api.server.dev:3000/v1',
  },
  profile: {
    defaultPicture: 'https://randomuser.me/api/portraits/med/women/78.jpg',
  },
  facebook: {
    appId: '239414459735885',
  },
  map: {
    // accessToken: 'pk.eyJ1Ijoic3BsYWN0IiwiYSI6ImNpbGxoN2V6dDAwYTJvYmtxb2JvOXdjdnUifQ.tHa07LPKzQ3'+
    // 'GCkZDTH_iuw',
    options: {
      minZoom: 3,
      maxZoom: 10,
      defaultZoom: 7,
      defaultCenter: {
        lat: 40.8540942,
        lng: 14.1765627,
      },
      disableDefaultUI: true,
      allowedBounds: {
        ne: {
          lat: 85,
          lng: 175,
        },
        sw: {
          lat: -85,
          lng: -175,
        },
      },
      styles: [
        {
          featureType: 'administrative.country',
          elementType: 'geometry.stroke',
          stylers: [{ lightness: '40' }, { visibility: 'on' }],
        },
        {
          featureType: 'administrative.country',
          elementType: 'labels',
          stylers: [{ visibility: 'simplified' }, { lightness: '20' }],
        },
        {
          featureType: 'administrative.province',
          elementType: 'geometry.stroke',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'administrative.province',
          elementType: 'labels',
          stylers: [{ visibility: 'simplified' }, { lightness: '10' }],
        },
        {
          featureType: 'administrative.locality',
          elementType: 'geometry.stroke',
          stylers: [{ visibility: 'on' }],
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels',
          stylers: [{ lightness: '25' }],
        },
        {
          featureType: 'landscape',
          elementType: 'all',
          stylers: [
            { hue: '#ffbb00' },
            { saturation: 43.400000000000006 },
            { lightness: 37.599999999999994 }, { gamma: 1 },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'all',
          stylers: [
            { hue: '#00ff6a' },
            { saturation: -1.0989010989011234 },
            { lightness: 11.200000000000017 },
            { gamma: 1 },
          ],
        },
        {
          featureType: 'road',
          elementType: 'all',
          stylers: [{ visibility: 'on' }, { lightness: '30' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'all',
          stylers: [
            { hue: '#ffc200' },
            { saturation: -61.8 },
            { lightness: 45.599999999999994 },
            { gamma: 1 },
          ],
        },
        {
          featureType: 'road.arterial',
          elementType: 'all',
          stylers: [
            { hue: '#ff0300' },
            { saturation: -100 },
            { lightness: 51.19999999999999 },
            { gamma: 1 },
          ],
        },
        {
          featureType: 'road.local',
          elementType: 'all',
          stylers: [{ hue: '#ff0300' }, { saturation: -100 }, { lightness: 52 }, { gamma: 1 }],
        },
        {
          featureType: 'water',
          elementType: 'all',
          stylers: [
            { hue: '#0078FF' },
            { saturation: -13.200000000000003 },
            { lightness: 2.4000000000000057 },
            { gamma: 1 },
          ],
        },
        {
          featureType: 'water',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    },
  },
};
