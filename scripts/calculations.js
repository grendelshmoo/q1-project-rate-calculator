const resultTable = function () {


  let generalLocal = JSON.parse(localStorage.getItem('general'))
  // let loanAmountLocal = JSON.parse(localStorage.getItem('general'))
  let finalResult = {}

  if (!generalLocal) {
    return finalResult
  }
  if (!generalLocal.salesprice || !generalLocal.loanamount) {
    return finalResult
  }

  // Need to make buyer & seller exports from generalState
  function splitTotal () {

    buyerCost = parseInt(generalLocal.salesprice.replace(/,/g, ""))
    sellerCost = parseInt(generalLocal.loanamount.replace(/,/g, ""))

    let result = (buyerCost+sellerCost)/2
    finalResult['buyerTotal'] = result
    finalResult['sellerTotal'] = result

  }



  // Call all calculation functions
  splitTotal()
  // Should return an object {buyerTotal: xxxxx, sellerTotal:yyyyy}
  return finalResult
}


module.exports = resultTable
