export const createRecommendationsCards = (list) => {
  return list.map(({ url, thumbnail, name, branding }) =>
    recommendationCards(url, thumbnail[0].url, name, branding)
  );
};

const recommendationCards = (href, thumbnailSrc, headline, publisher) => {
  const linkCard = document.createElement("a");
  linkCard.className = "recommendation";
  linkCard.href = href.trim();
  linkCard.target = "_blank";

  linkCard.appendChild(createThumbnail(thumbnailSrc, publisher));
  linkCard.appendChild(createArticleDetailsDiv(headline, publisher));

  return linkCard;
};

const createThumbnail = (src, publisherName) => {
  const thumbnail = document.createElement("div");
  thumbnail.className = "thumbnail";

  const thumbnailInner = document.createElement("img");
  thumbnailInner.className = "thumbnail-inner";
  thumbnailInner.src = src.trim();

  // if image isn't valid - takes the default img
  thumbnailInner.onerror = function () {
    thumbnailInner.src = "../images/default-placeholder.png";
  };
  thumbnailInner.alt = publisherName;

  thumbnail.appendChild(thumbnailInner);

  return thumbnail;
};

const createArticleDetailsDiv = (headline, publisher) => {
  const articleDetails = document.createElement("div");
  articleDetails.className = "article-details";

  articleDetails.appendChild(createHeadline(headline));
  articleDetails.appendChild(createPublisherSpan(publisher));

  return articleDetails;
};

const createHeadline = (text) => {
  const headline = document.createElement("h2");
  headline.textContent = text;

  return headline;
};

const createPublisherSpan = (publisherName) => {
  const publisher = document.createElement("span");
  publisher.textContent = publisherName;

  return publisher;
};
