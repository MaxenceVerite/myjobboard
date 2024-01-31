import { saveAs } from 'file-saver';

const downloadDocumentOnUserPc = (filename: string, fileData:Blob) =>{

    saveAs(fileData, filename)
}


export {
    downloadDocumentOnUserPc
}