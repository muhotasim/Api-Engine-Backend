function uuidv4() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
function uploadFilesAndGetUrlsWithKeyAndObject(
  files,
  moduleName,
  keys,
  callback
) {
  let fileAndKey = {};

  Object.keys(files).forEach((fileKey) => {
    if (keys.includes(fileKey)) {
      let file = files[fileKey];

      let fileName = moduleName + '/' + uuidv4() + '_' + file.name;
      fileAndKey[fileKey] = fileName;
      file.mv('./public/' + fileName, function (err) {
        console.log(err);
      });
    }
  });
  callback(fileAndKey);
}
module.exports = {
  uuidv4,
  uploadFilesAndGetUrlsWithKeyAndObject,
};
