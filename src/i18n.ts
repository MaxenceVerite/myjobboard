// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
          "phase.Applied": "Applied",
          "phase.Interviewing": "Interviewing",
          "phase.NegociatingOnOffers": "Negociating on offers",
          "phase.Over": "Over",
          "meetingConditions.Videocall": "Video Call", 
          "meetingConditions.Physical": "Physical",
          "interviewType.HR":"HR Interview",
          "interviewType.Technical":"Technical Interview",
          "interviewType.Client":"Client Interview",
          "interviewType.Other":"Other",
          "documentType.CV": "CV",
          "documentType.MOTIVATION_LETTER": "Motivation Letter"
        }
      },
      fr: {
        translation: {
          "phase.Applied": "A Postulé",
          "phase.Interviewing": "Passe des entretiens",
          "phase.NegociatingOnOffers": "Négocie les offres",
          "phase.Over": "Terminé",
          "meetingConditions.Videocall": "Visioconférence", 
          "meetingConditions.Physical": "En physique",
          "interviewType.HR":"Entretien RH",
          "interviewType.Technical":"Entretien Technique",
          "interviewType.Client":"Entretien Client Final",
          "interviewType.Other":"Autre",
          "documentType.CV": "CV",
          "documentType.MOTIVATION_LETTER": "Lettre de motivation"
        }
      }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "fr", 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
