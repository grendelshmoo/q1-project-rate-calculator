//Import data & templates
// const data = require('./data')
const templates = require('./templates')


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

//Define input variables.
const salesPrice = document.getElementById('salesprice')
const loanAmount = document.getElementById('loanamount')
const inputState = document.getElementById('inputstate')
const paymentSplit = document.getElementById('paymentsplit')
const transactionType = document.getElementById('transactiontype')


//Store data in local storage
function storeLocal(){
  localStorage.setItem(event.target.id, event.target.value)
}

// Event Listeners
salesPrice.addEventListener('keyup',storeLocal)
loanAmount.addEventListener('keyup',storeLocal)
inputState.addEventListener('change',storeLocal)
paymentSplit.addEventListener('change',storeLocal)
transactionType.addEventListener('change',storeLocal)

// Local Storage defaults - NOTE this probably needs to be changed... may not allow state changes
localStorage.setItem("inputstate", "Guam")
localStorage.setItem("paymentsplit", "buyerBorrowerSplit")
localStorage.setItem("transactiontype", "Residential")
