//Import data & templates
// const data = require('./data')
const templates = require('./templates')
const salesPrice = document.getElementById('salesprice')

//Define input variables.

// const loanAmount
// const state
// const paymentSplit
// const transactionType


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

//Store data in local storage

function storeLocal(){
  console.log(salesPrice)
}

//On Input Event Listener for Sales Price
salesPrice.addEventListener('input',storeLocal)


//On Input Event Listener for Loan Amount
