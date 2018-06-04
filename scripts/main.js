//Import data & templates
// const data = require('./data')
const templates = require('./templates')
const calc = require('./calculations')


//Render the Summary Column
function renderSummary () {
  document.getElementById('summarypane').innerHTML = templates.summaryTemplate()
}
renderSummary()


//Render the General Pane
function renderGeneral() {
  document.getElementById('generalpane').innerHTML = templates.generalTemplate()
}
renderGeneral()

//Define required input variables.
const salesPrice = document.getElementById('salesprice')
const loanAmount = document.getElementById('loanamount')
const inputState = document.getElementById('inputstate')
const paymentSplit = document.getElementById('paymentsplit')
const transactionType = document.getElementById('transactiontype')

//Define secondary input variables



//Store data in local storage
function storeLocal(){
  localStorage.setItem(event.target.id, event.target.value)
}

// Event Listeners - Required
salesPrice.addEventListener('keyup',storeLocal)
loanAmount.addEventListener('keyup',storeLocal)
inputState.addEventListener('change',storeLocal)
paymentSplit.addEventListener('change',storeLocal)
transactionType.addEventListener('change',storeLocal)

//Event Listeners - secondary





// Local Storage defaults - NOTE this probably needs to be changed... may not allow state changes
// Maybe make a "defaults" function included in the reset button?
localStorage.setItem("inputstate", "Guam")
localStorage.setItem("paymentsplit", "buyerBorrowerSplit")
localStorage.setItem("transactiontype", "Residential")

// calc.splitPayments(paymentSplit)
