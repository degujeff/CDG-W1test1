import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from '../assets/fonts/th-sarabun.js'


pdfMake.vfs = pdfFonts

pdfMake.fonts = {
  Roboto: {
    normal: 'THSarabun.woff',
    bold: 'THSarabunBold.woff', // แก้ให้ตรงกับที่มีใน th-sarabun.js
  },
  THSarabun: {
    normal: 'THSarabun.woff',
    bold: 'THSarabunBold.woff',
    italics: 'THSarabunIT9.woff',
    bolditalics: 'THSarabunIT9Bold.woff'
  },
  THSarabunIT9: {
    normal: 'THSarabun.woff',     // ใช้ไฟล์ที่มีอยู่แทน
    bold: 'THSarabunBold.woff',   // ใช้ไฟล์ที่มีอยู่แทน
  },
}

const primaryStyle = () => {
  return {
    font: 'THSarabunIT9',
    fontSize: 16,
    lineHeight: 1.1,
    columnGap: 20,
  }
}
const tableStyle = () => {
  return {
    font: 'THSarabunIT9',
    fontSize: 16,
    lineHeight: 1.8,
    columnGap: 20,
  }
}

const pdfPrintPreview = (content) => {
  const pdfDocGenerator = window.pdfMake.createPdf(content)
  pdfDocGenerator.getBlob((blob) => {
    const pdfPreview = document.getElementById('pdfPreview')
    if (pdfPreview) {
      pdfPreview.remove()
    }
    const iframe = document.createElement('iframe')
    iframe.id = 'pdfPreview'
    iframe.style.display = 'none'
    iframe.src = URL.createObjectURL(blob)
    document.body.appendChild(iframe)
    iframe.contentWindow.focus()
    iframe.contentWindow.print()
  })
}

export default {
  primaryStyle,
  pdfPrintPreview,
  tableStyle,
}
