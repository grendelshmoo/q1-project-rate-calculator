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

//Render the Closing Costs Pane
function renderClosing() {
  document.getElementById('generalpane').innerHTML = templates.closingTemplate()
}

//Render the Other pane
function renderOther() {
  document.getElementById('generalpane').innerHTML = templates.otherTemplate()
}

//Define tabs as variables
const generalTab = document.getElementById('general-tab')
const closingTab = document.getElementById('closing-tab')
const otherTab = document.getElementById('other-tab')

//Define required input variables.
const salesPrice = document.getElementById('salesprice')
const loanAmount = document.getElementById('loanamount')
const inputState = document.getElementById('inputstate')
const paymentSplit = document.getElementById('paymentsplit')
const transactionType = document.getElementById('transactiontype')

//Define secondary input variables

const inputAddress = document.getElementById('inputaddress')
const inputAddress2 = document.getElementById('inputaddress2')
const inputCity = document.getElementById('inputcity')
const inputZip = document.getElementById('inputzip')
const inputCompany = document.getElementById('inputcompany')
const inputPreparedBy = document.getElementById('inputpreparedby')
const inputPreparedFor = document.getElementById('inputpreparedfor')

//Store data in local storage
function storeLocal(){
  localStorage.setItem(event.target.id, event.target.value)
}

//Event Listeners - tabs
generalTab.addEventListener('click', renderGeneral)
closingTab.addEventListener('click', renderClosing)
otherTab.addEventListener('click', renderOther)


// Event Listeners - Required
salesPrice.addEventListener('keyup',storeLocal)
loanAmount.addEventListener('keyup',storeLocal)
inputState.addEventListener('change',storeLocal)
paymentSplit.addEventListener('change',storeLocal)
transactionType.addEventListener('change',storeLocal)

//Event Listeners - secondary
inputAddress.addEventListener('keyup',storeLocal)
inputAddress2.addEventListener('keyup',storeLocal)
inputCity.addEventListener('keyup',storeLocal)
inputZip.addEventListener('keyup',storeLocal)
inputCompany.addEventListener('keyup',storeLocal)
inputPreparedBy.addEventListener('keyup',storeLocal)
inputPreparedFor.addEventListener('keyup',storeLocal)







// Local Storage defaults - NOTE this probably needs to be changed... may not allow state changes
// Maybe make a "defaults" function included in the reset button?
localStorage.setItem("inputstate", "Guam")
localStorage.setItem("paymentsplit", "buyerBorrowerSplit")
localStorage.setItem("transactiontype", "Residential")

// calc.splitPayments(paymentSplit)
