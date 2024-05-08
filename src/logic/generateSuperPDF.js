import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { mapType, getType } from 'logic/TypeLogic';
import { demoImg } from 'logic/demoImg';
import header from 'logic/pdf_modules/header';
import footer from './pdf_modules/footer';

const mapping = { 'inspection-points': 'inspekcja', 'mines-points': 'kopalnie marsjańskie' };

const isValidBase64Jpeg = (str) => {
  if (!str) return false;

  // Check if the string has the correct prefix for a base64 encoded JPEG

  // Remove the prefix and validate the base64 content
  const base64Content = str;
  try {
    const decoded = atob(base64Content);
    return decoded.length > 0;
  } catch (e) {
    return false;
  }
};

function fbTimeToTime(point) {
  if (!('timestamp' in point)) {
    return '[brak znacznika czasu]';
  }
  const time = point.timestamp.toDate();
  const options = { weekday: 'long', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', locale: 'pl-PL' };
  const timeString = time.toLocaleString('pl-PL', options);
  return '' + timeString;
}

export default function generatePdf(headerInfo, day) {
  const docDefinition = {
    content: [
      {
        text: 'AGH Drone Engineering',
        style: 'header'
      },
      header(headerInfo.pilot, headerInfo.datetime, headerInfo.pilotPhone, day, headerInfo.batt, headerInfo.duration, headerInfo.kp, headerInfo.battAfter),
      {
        text: '//TODO tu będą punkty',
        style: 'header3'
      },
      footer
    ],
    styles: {
      formated: {
        preserveLeadingSpaces: true
      },
      header: {
        fontSize: 25,
        bold: true,
        margin: [0, 0, 0, 10],
        alignment: 'center'
      },
      header2: {
        fontSize: 20,
        bold: true,
        margin: [0, 0, 0, 10],
        alignment: 'center'
      },
      header3: {
        fontSize: 17,
        bold: true,
        margin: [0, 0, 0, 5],
        alignment: 'center'
      },
      header3b: {
        fontSize: 15,
        bold: true,
        margin: [0, 0, 0, 0],
        fillColor: "lightblue",
        alignment: 'center'
      },
      center: {
        alignment: 'center'
      },
      detection_image: {
        margin: [0, 25, 0, 2],
        width: 150,
        height: 150
      },
      link: {
        fontSize: 12,
        decoration: 'underline',
        color: 'blue',
        alignment: 'center'
      }
    }
  };
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  //pdfMake.createPdf(docDefinition).download('Raport z misji Inspekcja - AGH Drone Engineering');
  pdfMake.createPdf(docDefinition).open()
};
