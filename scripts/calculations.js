const resultTable = {}

function total(a, b) {
a = parseInt(a.value.replace(/,/g, ""))
b = parseInt(b.value.replace(/,/g, ""))

let result = (a+b)/2
resultTable['buyerTotal'] = result
resultTable['sellerTotal'] = result

return resultTable
}

module.exports = {
  total,
  resultTable
}


// const resultTable = function () { all calculation functions?  }
// return resultTable
