export const downloadFile = (downloadLink: string, fileName: string) => {
  const a = document.createElement('a');
  a.href = downloadLink;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
