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
      result = Math.floor(num / 500) * 500 //?  working 0-9999

    } else if (fromTenToFifty.test(num)) {
      result = Math.floor(num / 1000) * 1000 // working 10000-49999

    } else if (fromFiftyToFiveHundred.test(num)) {
      result = Math.floor(num / 5000) * 5000 // working 50000-499999

    } else if (fromFiveHundredToOneM.test(num)) {
      result = Math.floor(num / 10000) * 10000 // working 500000-999999

    } else if (num >= 1000000) {

      result = 'OVER'

    }

    return result
  }

  function titleFees() {

    if (generalLocal.inputstate == "CNMI") {
      let location = data.cnmi

    } else {
      // Set the region table to compare against
      let location = data.guam
      //get the sales price
      let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
      let active = rangeFinder(a)
      let keys = Object.keys(location)
      let values = Object.values(location)
      let result = 0


      if (active == 'OVER') {

        if (generalLocal.paymentsplit == "BuyerPaysAll") {
          let mult = 0
          for (i = 1000000; i < a; i++) {
            i += 1000
            mult = mult + 1
          }
          result = (5659 + (mult * 3))
          finalResult['titleTotal'] = round(result)
          finalResult['titleBuyer'] = round(result)



        } else if (generalLocal.paymentsplit === "BorrowerPaysAll") {
          let mult = 0
          for (i = 1000000; i < a; i++) {
            i += 1000
            mult = mult + 1
          }
          result = (5659 + (mult * 3))
          finalResult['titleTotal'] = round(result)

          finalResult['titleBorrower'] = round(result)

        } else {
          let mult = 0
          for (i = 1000000; i < a; i++) {
            i += 1000
            mult = mult + 1
          }
          result = (5659 + (mult * 3))
          finalResult['titleTotal'] = round(result)
          finalResult['titleBuyer'] = round(result / 2)
          finalResult['titleBorrower'] = round(result / 2)

        }

      } else {

        if (generalLocal.paymentsplit == "BuyerPaysAll") {
          for (let i in keys) {

            if (active == keys[i]) {
              finalResult['titleTotal'] = round(values[i])
              finalResult['titleBuyer'] = round(values[i])

            }
          }

        } else if (generalLocal.paymentsplit === "BorrowerPaysAll") {
          for (let i in keys) {

            if (active == keys[i]) {
              finalResult['titleTotal'] = round(values[i])
              finalResult['titleBorrower'] = round(values[i])

            }
          }

        } else {
          for (let i in keys) {

            if (active == keys[i]) {
              finalResult['titleTotal'] = round(values[i])
              finalResult['titleBuyer'] = round(values[i] / 2)
              finalResult['titleBorrower'] = round(values[i] / 2)
            }
          }

        }
      }
    }



  }

  // Total & Split
  function splitTotal() {

    //BuyerPaysAll
    if (generalLocal.paymentsplit == "BuyerPaysAll") {
      let result = finalResult['titleTotal'] + finalResult['escrowTotal'] + finalResult['recordingTotal']

      finalResult['buyerTotal'] = round(result)

      //BorrowerPaysAll -
    } else if (generalLocal.paymentsplit === "BorrowerPaysAll") {
      let result = finalResult['titleTotal'] + finalResult['escrowTotal'] + finalResult['recordingTotal']

      finalResult['borrowerTotal'] = round(result)

    } else {
      //Else Split Evenly
      let result = finalResult['titleTotal'] + finalResult['escrowTotal'] + finalResult['recordingTotal']

      finalResult['buyerTotal'] = round(result / 2)
      finalResult['borrowerTotal'] = round(result / 2)
    }



  }


  // Call all calculation functions
  titleFees()
  recordingFees()
  escrowFees()
  splitTotal()

  // Should return an object {buyerTotal: xxxxx, sellerTotal:yyyyy}
  return finalResult
}


module.exports = resultTable
