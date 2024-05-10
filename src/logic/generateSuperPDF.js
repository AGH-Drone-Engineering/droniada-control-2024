import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { mapType, getType } from 'logic/TypeLogic';
import { demoImg } from 'logic/demoImg';
import header from 'logic/pdf_modules/header';
import footer from './pdf_modules/footer';
import arucos from './pdf_modules/arucos';
import supersituation from './pdf_modules/supersituation';
import staticchanges from './pdf_modules/staticchanges';
import workers from './pdf_modules/workers';

let images = { demo: `data:image/jpeg;base64,/9j/${demoImg}` };

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

const v4 = () => {
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function addImage(data) {
  //Fetch image at 'data' and check it returns 404
  if (data.img) {
    return data.img;
  }
  else {
    return `data:image/jpeg;base64,/9j/${demoImg}`;
  }
  let link = data.imgSrc
  try {
    let req = new XMLHttpRequest();
    req.open('GET', link, false);
    req.send();
    if (req.status === 404) {
      return "demo";
    }
  }
  catch (e) {
    return "demo";
  }
  let id = v4() + "-" + v4() + "-" + v4() + "-" + v4();
  images[id] = link;
  return id;
}

function fbTimeToTime(point) {
  if (!('timestamp' in point)) {
    return '[brak znacznika czasu]';
  }
  const time = point.timestamp.toDate();
  const options = { weekday: 'long', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', locale: 'pl-PL' };
  const timeString = time.toLocaleString('pl-PL', options);
  return '' + timeString;
}

export default function generatePdf(points, headerInfo, day) {
  const docDefinition = {
    content: [
      {
        text: 'AGH Drone Engineering',
        style: 'header'
      },
      header(headerInfo.pilot, headerInfo.datetime, headerInfo.pilotPhone, day, headerInfo.batt, headerInfo.duration, headerInfo.kp, headerInfo.battAfter),
      {
        text: ' ',
        style: 'header3'
      },
      workers(points, addImage),
      {
        text: ' ',
        style: 'header3'
      },
      staticchanges(points, addImage),
      {
        text: ' ',
        style: 'header3'
      },
      supersituation(points, addImage),
      {
        text: ' ',
        style: 'header3'
      },
      arucos(points, addImage),
      {
        text: ' ',
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
      header1b: {
        fontSize: 10,
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
    },
    images
  };
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  //pdfMake.createPdf(docDefinition).download('Raport z misji Inspekcja - AGH Drone Engineering');
  pdfMake.createPdf(docDefinition).open()
};
