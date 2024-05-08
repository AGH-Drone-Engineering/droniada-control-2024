export default [
  {
    text: " ",
    style: "header3"
  },
  {
    text: "Informacje końcowe",
    style: "header3"
  },
  {
    table: {
      headerRows: 1,
      widths: ['*', 'auto'],
      body: [
        [{ text: 'Uzupełnia komisja sędziowska', style: "header3b" }, { text: 'Pkt', style: "header3b" }],
        ['Lot ZERO z poprawnym przygotowanym raportem początkowym', ''],
        ['Automatyczny start, lot i lądowanie', ''],
        ['Poprawne wykrycie i raportowanie zmiany w infrastrukturze stałej (zmiany statyczne)', ''],
        ['Poprawne wykrycie i raportowanie o pracownikach', ''],
        ['Poprawne wykrycie zdarzenia nadzwyczajnego', ''],
        ['Wykrycie i odczytanie kodów ArUCo', ''],
        ['Najkrótszy czas wykonania całej misji (lot + raport)', ''],
        ['Premia za wysłanie raportu jeszcze w trakcie lotu lub jednocześnie wraz z lądowaniem', ''],
        ['Punkty karne', ''],
        [{
          text: "Suma punktów",
          style: "header3"
        }, '']
      ]
    }
  }
]