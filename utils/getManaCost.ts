function getManaCost (manacost:string) {
  const matchedValues = manacost.matchAll(/{(.*?)}/gi);
  const extractedValues = Array.from(matchedValues);
  let extractedManaCost:object[] = [];
  let cmc = {};
  extractedValues.map((data) => {
    if(isNaN(data[1])) {
      cmc = {
        type: 'color',
        title: data[1].replace('/', '-'),
        class: `color-${data[1].replace('/', '-')}`
      }
    } else {
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
