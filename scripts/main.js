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
// const state
// const paymentSplit
// const transactionType


//Store data in local storage
function storeLocal(){
  // console.log(salesPrice.id)
  // console.log(salesPrice.value)
  // console.log(event.target.id)
}

//On Input Event Listener for Sales Price
salesPrice.addEventListener('keyup',storeLocal)
loanAmount.addEventListener('keyup',storeLocal)


//On Input Event Listener for Loan Amount
