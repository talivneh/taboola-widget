import fetchRecommendations from "./API/api.js";
import { createRecommendationsCards } from "./view/recommendationView.js";
import { createLoadingCards } from "./view/loadingView.js";
import { ads_count } from "./constants/environment.js";

window.addEventListener("load", () => {
  createView(createLoadingCards(ads_count));
  fetchRecommendationsFunc();
});

export const fetchRecommendationsFunc = () => {
  fetchRecommendations()
    .then((res) => handleResponse(res))
    .then((cards) => {
      if (cards) {
        createView(cards);
      } else {
        setTimeout(fetchRecommendationsFunc, 0);
      }
    });
};

export const handleResponse = ({ data, error }) => {
  if (error || !data.list.length) {
    return null;
  } else {
    return createRecommendationsCards(data.list);
  }
};

export const createView = (cards) => {
  const container = document.querySelector(".recommendations-container");
  container.innerHTML = "";
  cards.map((card) => container.appendChild(card));
};
