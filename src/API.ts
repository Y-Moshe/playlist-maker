import axios from 'axios';

import { YTSearchResponse } from './App/Types';

const API_KEY  = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_YT_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL
});

instance.interceptors.request.use( req => {
  req.params = {
    ...req.params,
    key: API_KEY
  };

  return req;
});

export const searchVideos = ( query: string, maxResults = 7 ) => {
  const params = {
    q: query,
    maxResults,
    part: 'snippet'
  };

  return instance.get<YTSearchResponse>( '/search', { params } );
};
