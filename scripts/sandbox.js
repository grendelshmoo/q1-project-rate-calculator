// Escrow
function escrow() {
  //BuyerPaysAll
  if (generalLocal.paymentsplit == "BuyerPaysAll") {
    let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
    let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))

    console.log("Buyer Escrow")

  //BorrowerPaysAll -
  } else if (generalLocal.paymentsplit === "BorrowerPaysAll") {
    let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
    let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))

    console.log("Borrower Escrow")

  } else {
    //Else Split Evenly
    let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
    let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))

    console.log("Split Escrow")

  }
}
