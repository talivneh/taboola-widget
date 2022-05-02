import { api_key, ads_count } from "../constants/environment.js";

const BASE_URL = "https://api.taboola.com/1.0/json";
const PUBLISHER_ID = "taboola-templates";
const APP_TYPE = "desktop";
const SOURCE_ID = "123456789";
const SOURCE_URL = `http://www.site.com/videos/${SOURCE_ID}.html`;
const SOURCE_TYPE = "video";

const ENDPOINT = `${BASE_URL}/${PUBLISHER_ID}/recommendations.get?app.type=${APP_TYPE}&app.apikey=${api_key}&count=${ads_count}&source.type=${SOURCE_TYPE}&source.id=${SOURCE_ID}&source.url=${SOURCE_URL}`;

const fetchRecommendations = async () => {
  let data, error;
  try {
    await fetch(ENDPOINT)
      .then((response) => response.json())
      .then((json) => (data = json));
  } catch (err) {
    error = err;
  }
  return { data, error };
};

export default fetchRecommendations;
