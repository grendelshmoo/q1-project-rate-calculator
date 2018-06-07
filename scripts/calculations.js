//Import data
const data = require('./data')

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

  // Escrow Fees
  function escrowFees() {
    //BuyerPaysAll
    if (generalLocal.paymentsplit == "BuyerPaysAll") {
      let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
      let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))


      let result = (((a - b) / 1000) * 2.50) + 50
      finalResult['escrowBuyer'] = round(result)
      finalResult['escrowTotal'] = round(result)

      //BorrowerPaysAll -
    } else if (generalLocal.paymentsplit === "BorrowerPaysAll") {
      let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
      let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))


      let result = (((a - b) / 1000) * 2.50) + 50
      finalResult['escrowBorrower'] = round(result)
      finalResult['escrowTotal'] = round(result)

    } else {
      //Else Split Evenly
      let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
      let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))


      let result = (((a - b) / 1000) * 2.50) + 50
      finalResult['escrowBuyer'] = round(result / 2)
      finalResult['escrowBorrower'] = round(result / 2)
      finalResult['escrowTotal'] = round(result)

    }
  }

  // Recording Fees

  function recordingFees() {
    //BuyerPaysAll
    if (generalLocal.paymentsplit == "BuyerPaysAll") {
      let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))
      let result = ((b / 1000) * 2.5) + 25
      finalResult['recordingBuyer'] = round(result)
      finalResult['recordingTotal'] = round(result)

      //BorrowerPaysAll -
    } else if (generalLocal.paymentsplit === "BorrowerPaysAll") {
      let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))
      let result = ((b / 1000) * 2.5) + 25
      finalResult['recordingBorrower'] = round(result)
      finalResult['recordingTotal'] = round(result)

      //Else Split Evenly
    } else {
      let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))
      let result = ((b / 1000) * 2.5) + 25
      finalResult['recordingBuyer'] = round(result / 2)
      finalResult['recordingBorrower'] = round(result / 2)
      finalResult['recordingTotal'] = round(result)


    }
  }

  //Title Fees & rangeFinder
  function rangeFinder(num) {
    let result = 0
    let underTen = RegExp('^0*([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])$')
    let fromTenToFifty = RegExp('^0*([1-3][0-9]{4}|4[0-8][0-9]{3}|49[0-8][0-9]{2}|499[0-8][0-9]|4999[0-9])$')
    let fromFiftyToFiveHundred = RegExp('^0*([5-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|[1-3][0-9]{5}|4[0-8][0-9]{4}|49[0-8][0-9]{3}|499[0-8][0-9]{2}|4999[0-8][0-9]|49999[0-9])$')
    let fromFiveHundredToOneM = RegExp('^0*([5-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-9])$')


    if (underTen.test(num)) {
      result = Math.floor(num/500)*500 //?  working 0-9999

    } else if (fromTenToFifty.test(num)) {
      result = Math.floor(num/1000)*1000 // working 10000-49999

    } else if (fromFiftyToFiveHundred.test(num)) {
      result = Math.floor(num/5000)*5000 // working 50000-499999

    } else if (fromFiveHundredToOneM.test(num)) {
      result = Math.floor(num/10000)*10000 // working 500000-999999

    } else { console.log("OVER")}  // up to and includes 1M, probably need to make it more specific... to 999999



  return result
  }


  function titleFees() {
console.log(data.guam)

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
  // titleFees()
  recordingFees()
  escrowFees()
  splitTotal()

  // Should return an object {buyerTotal: xxxxx, sellerTotal:yyyyy}
  return finalResult
}


module.exports = resultTable
