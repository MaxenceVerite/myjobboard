import React from "react";
import CVPicto from "../common/CVPicto";
import MotivationLetterPicto from "../common/MotivationLetterPicto";
import { DocumentType } from "../../models/document";


const getIconSvg = (type: DocumentType, className?: string, width?: string) => {

    const finalWidth = width?? "80px";

    switch (type) {
      case DocumentType.CV:
        return <CVPicto width={finalWidth} className={className} />;
      case DocumentType.MOTIVATION_LETTER:
        return <MotivationLetterPicto width={finalWidth} className={className}/>;
      default:
        return <MotivationLetterPicto width={finalWidth} className={className}/>;
    }
  };

  export {getIconSvg}