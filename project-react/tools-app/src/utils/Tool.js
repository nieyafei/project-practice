import * as PDFJS from "pdfjs-dist";
import JSZip from "jszip";
import saveAs from 'file-saver';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { message } from "antd";
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const Tool = {};

Tool.toggleKey=(e)=> {
  console.log(e.context)
  const {toggleKey} = e.context;
  toggleKey && toggleKey(e.props.keystr || "index");
}

Tool.readPdf =(file, self)=> {
  self.setState({ploading: true})
  let el = document.getElementById("pdf-container");
  delDomChild(el);
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = function (e) {
    const typedarray = new Uint8Array(this.result);
    const loadingTask = PDFJS.getDocument(typedarray);
    loadingTask.promise.then(async function (pdf) {
      if (pdf) {
        // pdf 总页数
        const pageNum = pdf.numPages;
        for (let i = 1; i <= pageNum; i++) {
          // 生成每页 pdf 的 canvas
          const canvas = document.createElement('canvas');
          canvas.id = "pageNum" + i;
          // 将 canvas 添加到 dom 中
          el.append(canvas);
          const context = canvas.getContext('2d');
          await openPage(pdf, i, context);
        }
        self.setState({
          fileBase: {
            pageNum
          },
          ploading: false
        })
      }
    }).catch(function (reason) {
      self.setState({ploading: false})
      console.error("Error: " + reason);
      message.error("Error: " + reason)
    });
  }
}

/**
 * 导出图片
 * @param {*} self 
 * @param {*} number 页数
 */
Tool.exportImage =async (self, number)=> {
  self.setState({ploading: true})
  let el = document.getElementById("pdf-container");
  let cArr = el.getElementsByTagName("canvas");
  console.log(cArr)
  console.log(cArr.length)
  let picArr = [];
  for(let i = 0;i<cArr.length;i ++){
    const canvas = cArr[i];
    let base64ImgSrc = canvas.toDataURL("image/png");
    picArr.push({
      name: i+1,
      url: convertBase64UrlToBlob(base64ImgSrc)
    })
  }
  await Tool.downloadImageZip(picArr);
  setTimeout(()=> {self.setState({ploading: false})}, 1000)
}

Tool.downloadImageZip =(list)=> {
  const ZIP = new JSZip();
  const file = ZIP.folder('压缩图片');
  list.forEach(d=> {
    file.file(`${d.name}.png`, d.url, {base64: true});
  })
  setTimeout(()=> {
    ZIP.generateAsync({type: 'blob'}).then(
    function (content) {
      saveAs(content, '压缩图片.zip');
    });
  }, 1000);
}

async function openPage (pdfFile, pageNumber, context) {
  var scale = 2;
  let page = await pdfFile.getPage(pageNumber);
  // reference canvas via context
  const viewport = page.getViewport({scale});
  var canvas = context.canvas;
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  var renderContext = {
    canvasContext: context,
    viewport: viewport
  };
  page.render(renderContext);
  return;
}

function convertBase64UrlToBlob(urlData) {
  const arr = urlData.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
}

function delDomChild(el){
  while(el.hasChildNodes()){
    el.removeChild(el.firstChild);
  }
}

/**
 * 本地数据存储或读取
 * @param {any} key
 * @param {any} value
 * @param company string 公司名称
 * @param fieldList string 选择的领域
 * @param user  用户信息
 * @param typeFlag  登录true false
 * @returns
 */
Tool.localItem = function (key, value) {
  if (arguments.length === 1) {
    return localStorage.getItem(key);
  } else {
    return localStorage.setItem(key, value);
  }
}


/**
* 删除本地数据
* @param {any} key
* @returns
*/
Tool.removeLocalItem = function (key) {
  if (key) {
    return localStorage.removeItem(key);
  }
  return localStorage.removeItem();
}

export default Tool;

