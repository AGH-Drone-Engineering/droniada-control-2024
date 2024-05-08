//PDFmake content
export default function (pilot, datatime, phone, mission, batt, duration, kp, battAfter) {
  return [{
    text: "Raport z konkurencji \"Inspekcja\", dzień " + mission,
    style: "header2"
  },
  {
    text: "Spis treści",
    style: "header3"
  },
  {
    ol: [
      "Podstawowe informacje o wykonanej misji", "Dodatkowe informacje o wykonanej misji ", "Lista pracowników znajdujących się na terenie",
      "Zmiany w infrastrukturze", "Sytuacje nadzwyczajne", "Kody ArUcoS", "Mapa infrastruktury", "Informacje końcowe"
    ]
  },
  {
    text: " ",
    style: "header3"
  },
  {
    text: "Podstawowe informacje o wykonanej misji",
    style: "header3"
  },
  {
    table: {
      headerRows: 1,
      widths: ['*', '*', 'auto'],
      body: [
        [{ text: ' ', style: "header3b" }, { text: 'Zespół', style: 'header3b' }, { text: 'Jury', style: "header3b" }],
        ['Zespół', "AGH Drone Engineering\n drone@agh.edu.pl", "+/-"],
        ['Pilot, kontakt', `${pilot}\n+48${phone}`, "+/-"],
        ['Data i godzina rozpoczęcia', datatime.replace("T", "  "), "+/-"],
        ['Nr misji', mission, "+/-"],
        ['Czas trwania', duration, "+/-"],
        ['Bateria przed wykonaniem', batt, "+/-"]
      ]
    }
  },
  {
    text: " ",
    style: "header3"
  },
  {
    text: "Dodatkowe informacje o wykonanej misji",
    style: "header3"
  },
  {
    table: {
      headerRows: 1,
      widths: ['*', '*', 'auto'],
      body: [
        [{ text: ' ', style: "header3b" }, { text: 'Zespół', style: "header3b" }, { text: 'Jury', style: "header3b" }],
        ['Index KP', kp, "+/-"],
        ['Bateria po zakończeniu lotu', battAfter, "+/-"]
      ]
    }
  }
  ]
}
