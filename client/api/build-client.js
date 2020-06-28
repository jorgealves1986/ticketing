import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server
    // http://SERVICENAME.NAMESPACE.svc.cluster.local
    // the headers is to tell ingress-srv the host we want to access
    return axios.create({
      baseURL: 'http://www.testing-some-multi-k8s.pw/',
      headers: req.headers
    });
  } else {
    // we must be on the browser
    return axios.create({
      baseURL: '/'
    });
  }
};
