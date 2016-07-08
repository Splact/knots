import mapStyles from './map.styles';

const isProd = process.env.NODE_ENV === 'production';

const apiDevUrl = 'http://api.server.dev:3000/v1';
const apiProdUrl = 'http://api.arrray.com:8888/v1';
const apiUrl = (isProd) ? apiProdUrl : apiDevUrl; 

export default {
  localforage: {
    key: 'knots',
    name: 'knots',
    version: 1.0,
    storeName: 'knots_balloons',
    description: 'Persistent storage for Knots Balloons'
  },
  api: {
    baseURL: apiUrl
  },
  profile: {
    defaultPicture: 'https://randomuser.me/api/portraits/med/women/78.jpg'
  },
  facebook: {
    appId: '239414459735885'
  },
  map: {
    // accessToken: 'pk.eyJ1Ijoic3BsYWN0IiwiYSI6ImNpbGxoN2V6dDAwYTJvYmtxb2JvOXdjdnUifQ.tHa07LPKzQ3GCkZDTH_iuw',
    options: {
      minZoom: 3,
      maxZoom: 10,
      defaultZoom: 7,
      defaultCenter: {
        lat: 40.8540942,
        lng: 14.1765627
      },
      disableDefaultUI: true,
      allowedBounds: {
        ne: {
          lat: 85,
          lng: 175
        },
        sw: {
          lat: -85,
          lng: -175
        }
      },
      styles: mapStyles
    }
  }
};
