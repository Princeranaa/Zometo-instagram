const ImageKit = require("imagekit");


const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

exports.uploadFile = async (file, filename) => {
  const resulte = await imagekit.upload({
    file: file, // required
    fileName: filename, //required
  });

  return resulte; // Return the URL of the file.
};
