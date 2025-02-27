export const getImage = (path) => {
  console.log("✌️path --->", path);
  if (!path) {
    return "";
  }
  if (path.startsWith("https") || path.startsWith("data")) {
    return path;
  }
  return import.meta.env.VITE_API_URL + "/" + path;
};
