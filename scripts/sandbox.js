const data = require('./data')

const salesPrice = 3642

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

//rangeFinder(salesPrice)




function escrowFees(num, location) {
  let active = rangeFinder(num)
  let keys = Object.keys(location)
  let values = Object.values(location)

  let result = 0


  for (let i in keys) {

     if (active == keys[i]) {
      finalResult['titleTotal'] = values[i]
      finalResult['buyerTitle'] = values[i]/2
      finalResult['borrowerTotal'] = values[i]/2

     }
  }


  return result
}


escrowFees(salesPrice, data.guam)


// 7,300  = 7000
// 7,501 = 7500
// 12,600 = 12500
// 66,500 = 65000
// 499,000 = 495,000
// 674,000 = 670,000


// Matching -
//
// less then 10,000, every 500  result = Math.floor(num/1000)*1000+500
// 10,000-50,000, every 1000
// 50,000 - 500,000 every 5000
// 500,000 - 1,000,000 every 10,000







// let result = rounder(salesPrice,data.guam)



// console.log(result)

// // Escrow
// function escrow() {
//   //BuyerPaysAll
//   if (generalLocal.paymentsplit == "BuyerPaysAll") {
//     let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
//     let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))
//
//     console.log("Buyer Escrow")
//
//   //BorrowerPaysAll -
//   } else if (generalLocal.paymentsplit === "BorrowerPaysAll") {
//     let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
//     let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))
//
//     console.log("Borrower Escrow")
//
//   } else {
//     //Else Split Evenly
//     let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
//     let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))
//
//     console.log("Split Escrow")
//
//   }
// }
