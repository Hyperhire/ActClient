import { saveAs } from 'file-saver';

const download = async url => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split('.').pop();
  const filename = url.split('/').pop();
  const metadata = { type: `image/${ext}` };
  return { data, filename, metadata };
};

export const urlToFile = async url => {
  const { data, filename, metadata } = await download(url);
  return new File([data], filename, metadata);
};

export const downloadFile = async url => {
  const { data, filename } = await download(url);
  saveAs(data, filename);
};
