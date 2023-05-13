export const checkImageURL = (url) => {
  if (!url) return false;
  if (url.match(/\.(jpeg|jpg|gif|png)$/) != null) return true;
};
