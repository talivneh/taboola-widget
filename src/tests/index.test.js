/**
 * @jest-environment jsdom
 */

require("@testing-library/jest-dom");

import dummyApi from "../API/mockApiResponse.json";
import fetchRecommendations from "../API/api";

const index = require("../index");
jest.spyOn(index, "createView");
jest.spyOn(index, "handleResponse");

const loadingCards = require("../view/loadingView");
jest.spyOn(loadingCards, "createLoadingCards");

const recommendationsCards = require("../view/recommendationView");
jest.spyOn(recommendationsCards, "createRecommendationsCards");

document.body.innerHTML = `
      <div class="recommendations-container"></div>
    `;

describe("fetch recommendations data from Api and creates view accordingly", () => {
  const ads_count = 6;

  test("fetch recommendations from api or catch error", async () => {
    const apiRes = await fetchRecommendations();
    expect(apiRes).toHaveProperty("data");
    expect(apiRes).toHaveProperty("error");
  });

  test("handles Api response containing data", () => {
    const functionCall = index.handleResponse({ data: dummyApi, error: null });
    expect(functionCall).not.toBeFalsy();
  });

  test("handles Api response containing error", () => {
    const functionCallWithErr = index.handleResponse({
      data: null,
      error: "some-error",
    });
    expect(functionCallWithErr).toBeNull();
  });

  const loadingCardsArray = loadingCards.createLoadingCards(ads_count);
  const recommendationsCardsArray =
    recommendationsCards.createRecommendationsCards(dummyApi.list);

  test("creates loading cards array", () => {
    const loadingCard = `<div class="loading-placeholder"/>`;
    expect(loadingCardsArray).toBeTruthy();
    expect(loadingCardsArray).toHaveLength(ads_count);
    for (let i = 0; i < ads_count; i++) {
      expect(loadingCardsArray[i]).toContainHTML(loadingCard);
    }
  });

  test("creates loading view", () => {
    index.createView(loadingCardsArray);
    const loadingElement = document.querySelector(".loading-placeholder");
    expect(loadingElement).toBeInTheDOM();
  });

  test("creates recommendations cards array", () => {
    expect(recommendationsCardsArray).toBeTruthy();
    expect(recommendationsCardsArray).toHaveLength(dummyApi.list.length);
    for (let i = 0; i < dummyApi.list.length; i++) {
      expect(recommendationsCardsArray[i]).toBeTruthy();
      expect(recommendationsCardsArray[i]).toHaveClass("recommendation");
    }
  });

  test("creates recommendations view", () => {
    index.createView(recommendationsCardsArray);
    const recommendationElement = document.querySelector(".recommendation");
    expect(recommendationElement).toBeInTheDOM();
  });
});
