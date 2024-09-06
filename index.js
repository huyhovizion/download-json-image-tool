const fs = require("fs");
const axios = require("axios");
const path = require("path");
const images = require("./images");

// Function to download image using axios
const download = async (uri, filename) => {
  try {
    const response = await axios({
      url: uri,
      responseType: "stream",
    });
    return new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(filename);
      response.data.pipe(stream);
      stream.on("finish", () => resolve());
      stream.on("error", (e) => reject(e));
    });
  } catch (error) {
    console.error(`Failed to download from ${uri}:`, error);
    throw error;
  }
};

// Function to create a folder if it doesn't exist
const createFolder = (pathDir) => {
  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir, { recursive: true });
  }
};

// Function to download asynchronously with nested folders
const downloadAsync = async (uri) => {
  try {
    const splits = uri.split("/");
    const fileName = splits.pop(); // Keep the original file name with extension
    const subFolder = splits.pop(); // Use a subfolder based on the URL path
    const externalFolder = "external_downloads"; // The external main folder
    const internalFolder = path.join(externalFolder, subFolder); // Nested subfolder

    // Create both external and internal folders
    createFolder(internalFolder);

    const filePath = path.join(internalFolder, fileName);
    console.log(`Downloading to: ${filePath}`);

    await download(uri, filePath);
    return { success: true, url: uri };
  } catch (error) {
    console.error(`Failed to process ${uri}:`, error);
    return { success: false, url: uri };
  }
};

// Function to append failed URLs to a file
const logFailedUrls = async (failedUrls) => {
  const failedData = failedUrls.join("\n") + "\n"; // Format the data
  fs.appendFile("data.txt", failedData, (err) => {
    if (err) {
      console.error("Error writing to data.txt:", err);
    } else {
      console.log("Failed URLs have been logged in data.txt");
    }
  });
};

// Process all images
const reqs = images.map((url) => downloadAsync(url));

Promise.all(reqs)
  .then((results) => {
    const failedUrls = results
      .filter((result) => !result.success)
      .map((result) => result.url);

    if (failedUrls.length > 0) {
      return logFailedUrls(failedUrls);
    } else {
      console.log("All images downloaded successfully.");
    }
  })
  .catch((err) => {
    console.error("Error occurred during image downloads:", err);
  });
