import api from './api';

const setSpaceToken = (spaceID: string) => {
  if (spaceID) {
    localStorage.setItem('spaceID', spaceID);
    api.defaults.headers.common['space'] = spaceID;
  } else {
    localStorage.removeItem('spaceID');
    delete api.defaults.headers.common['space'];
  }
};

export default setSpaceToken;