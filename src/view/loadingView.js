export const createLoadingCards = (count) => {
  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(loadingView());
  }
  return cards;
};

const loadingView = () => {
  const loadingCard = document.createElement("div");
  loadingCard.className = "loading-placeholder";

  return loadingCard;
};
