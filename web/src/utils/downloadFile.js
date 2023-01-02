import { saveAs } from 'file-saver';

const download = async url => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split('.').pop(); // url 구조에 맞게 수정할 것
  const filename = url.split('/').pop(); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` };
  return { data, filename, metadata };
};

export const urlToFile = async url => {
  console.log('url', url);
  const { data, filename, metadata } = await download(url);
  return new File([data], filename, metadata);
};

export const downloadFile = async url => {
  console.log('downloadFile', url);
  const { data, filename, metadata } = await download(url);
  saveAs(data, filename);
};
