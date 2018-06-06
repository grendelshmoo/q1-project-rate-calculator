let salesPriceLocal = JSON.parse(localStorage.getItem('general')).salesprice
let loanAmountLocal = JSON.parse(localStorage.getItem('general')).loanamount


const resultTable = function () {
  let finalResult = {}

  // Need to make buyer & seller exports from generalState
  function splitTotal () {
    buyerCost = parseInt(salesPriceLocal.value.replace(/,/g, ""))
    sellerCost = parseInt(loanAmountLocal.value.replace(/,/g, ""))

    let result = (buyerCost+sellerCost)/2
    finalResult['buyerTotal'] = result
    finalResult['sellerTotal'] = result


  }


  // Call all calculation functions
  splitTotal()
  // Should return an object {buyerTotal: xxxxx, sellerTotal:yyyyy}
  return finalResult
}


module.exports = {
  resultTable
}
