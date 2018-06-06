const resultTable = function() {


  let generalLocal = JSON.parse(localStorage.getItem('general'))
  // let loanAmountLocal = JSON.parse(localStorage.getItem('general'))
  let finalResult = {}

  if (!generalLocal) {
    return finalResult
  }
  if (!generalLocal.salesprice || !generalLocal.loanamount) {
    return finalResult
  }


// Rounder
function round(num) {
  return Math.round(num * 100) / 100
}

// Escrow
function escrow() {
  //BuyerPaysAll
  if (generalLocal.paymentsplit == "BuyerPaysAll") {
    let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
    let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))

    console.log("Buyer Escrow")
    let result = (((a-b)/1000) * 2.50) + 50
    finalResult['escrowBuyer'] = round(result)
    finalResult['escrowTotal'] = round(result)

  //BorrowerPaysAll -
  } else if (generalLocal.paymentsplit === "BorrowerPaysAll") {
    let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
    let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))

    console.log("Borrower Escrow")
    let result = (((a-b)/1000) * 2.50) + 50
    finalResult['escrowBorrower'] = round(result)
    finalResult['escrowTotal'] = round(result)

  } else {
    //Else Split Evenly
    let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
    let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))

    console.log("Split Escrow")
    let result = (((a-b)/1000) * 2.50) + 50
    finalResult['escrowBuyer'] = round(result/2)
    finalResult['escrowBorrower'] = round(result/2)
    finalResult['escrowTotal'] = round(result)

  }
}

// Total & Split
  function splitTotal() {

    //BuyerPaysAll
    if (generalLocal.paymentsplit == "BuyerPaysAll") {
      let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
      let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))

      let result = (a + b)
        finalResult['buyerTotal'] = round(result)

    //BorrowerPaysAll -
    } else if (generalLocal.paymentsplit === "BorrowerPaysAll") {
      let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
      let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))

      let result = (a + b)
        finalResult['borrowerTotal'] = round(result)

    } else {
      //Else Split Evenly
      let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
      let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))

      let result = (a + b) / 2
      finalResult['buyerTotal'] = round(result)
      finalResult['borrowerTotal'] = round(result)
    }



  }


  // Call all calculation functions
  escrow()
  splitTotal()

  // Should return an object {buyerTotal: xxxxx, sellerTotal:yyyyy}
  return finalResult
}


module.exports = resultTable
