const downloadUrl = (blob, fileName) => {
  if (window.navigator.msSaveOrOpenBlob) {
    console.log('in msSaveOrOpenBlob')
    navigator.msSaveBlob(blob, fileName);
  } else {
    console.log('in create a')
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
};

export const downloadBlob = async res => {
  let resBlob = res.data;
  let resData = null;
  try {
    let resText = await new Promise((resolve, reject) => {
      // 通过 FileReader 接受并解析
      let reader = new FileReader();
      reader.addEventListener('abort', reject);
      reader.addEventListener('error', reject);
      reader.addEventListener('loadend', () => {
        resolve(reader.result);
      });
      // 文件
      reader.readAsText(resBlob);
    });
    // JSON
    resData = JSON.parse(resText);
  } catch (err) {
    console.log(err);
  }
  return { res, resData, resBlob };
};

export default downloadUrl;
