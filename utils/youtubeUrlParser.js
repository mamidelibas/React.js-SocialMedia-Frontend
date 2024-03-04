export const youtubeParser = (videoUrl) => {
  debugger;
  let url = videoUrl;
  if (url.includes("youtu.be")) {
    url = url.replace("youtu.be/", "youtube.com/watch?v=");
  }

  const videoId = url.split("v=");
  return videoId[1];
};
