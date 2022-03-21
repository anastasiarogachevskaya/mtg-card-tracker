function getManaCost (manacost:string) {
  const matchedValues = manacost.matchAll(/{(.*?)}/gi);
  const extractedValues = Array.from(matchedValues);
  let extractedManaCost:object[] = [];
  let cmc = {};
  const letters = /[a-zA-Z]/;
  const numbers = /[0-9]/;
  extractedValues.map((data: string[]) => {
    // Check if string contians letters
    if(letters.test(data[1])) {
      cmc = {
        type: 'color',
        title: data[1].replace('/', '-'),
        class: `color-${data[1].replace('/', '-')}`
      }
    }

    if(numbers.test(data[1])) {
      cmc = {
        type: 'cost',
        title: data[1],
        class: `color-${data[1]}`
      }
    }
    extractedManaCost.push(cmc);
  })
  return extractedManaCost;
}

export default getManaCost;
