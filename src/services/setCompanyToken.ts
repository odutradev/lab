import api from './api';

const setCompanyToken = (companyID: string) => {
  if (companyID) {
    localStorage.setItem('companyID', companyID);
    api.defaults.headers.common['company'] = companyID;
  } else {
    localStorage.removeItem('companyID');
    delete api.defaults.headers.common['company'];
  }
};

export default setCompanyToken;