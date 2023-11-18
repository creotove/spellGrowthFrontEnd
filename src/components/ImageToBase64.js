function ImageToBase64(file) {
  if (file.size > 50 * 1024) {
    return "File size over limit";
  }
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
      return fileReader.result;
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export default ImageToBase64;
