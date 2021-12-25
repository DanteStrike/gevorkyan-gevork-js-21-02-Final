type EncodeType = string | ArrayBuffer | null;

const encodeToBase64 = (file: File, callback: (res: EncodeType) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => callback(reader.result);
};

export default {
  encodeToBase64,
};
