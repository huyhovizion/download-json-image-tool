const fs = require("fs");
const request = require("request");

// Define your image URLs array
var images = require("./images");

const download = function (uri, filename, callback) {
  request.head(uri, function () {
    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};

const createFolder = (pathDir) => {
  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir, { recursive: true });
  }
};

const downloadAsync = (uri) => {
  return new Promise((resolve) => {
    const splits = uri.split("/");
    let fileName = splits.pop(); // Keep the original file name
    let path = "images/scenes"; // Default path
    let subPath = "";

    // Check and assign the correct folder based on the URL
    if (uri.includes("/tour/")) {
      path = "images/tour";
    } else if (uri.includes("/thumb/")) {
      path = "images/thumb";
    } else if (uri.includes("/media/")) {
      path = "images/media";
    } else {
      // Preserve the original path structure for scenes
      subPath = splits.slice(3).join("/"); // Remove the base URL part
      path = `images/scenes`;
    }

    createFolder(path);
    const filePath = subPath
      ? `${path}/${`${subPath}-${fileName}`}.jpg`
      : `${path}/${fileName}.jpg`;

    download(uri, filePath, () => resolve(fileName));
  });
};

const reqs = images.map((url) => downloadAsync(url));

Promise.all(reqs)
  .then(() => {
    console.log("DONE");
  })
  .catch((err) => {
    console.error(err);
  });
