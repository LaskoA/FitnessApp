// export function dataURLtoFile(dataurl: string, filename: string) {
//   const arr = dataurl.split(',');
//   const mime = arr[0].match(/:(.*?);/)[1];
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
      
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
  
//   return new File([u8arr], filename, {type:mime});
// };

export async function dataURLtoFile(dataUrl: string, fileName: string): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();

  return new File([blob], fileName, { type: 'image/png' });
}