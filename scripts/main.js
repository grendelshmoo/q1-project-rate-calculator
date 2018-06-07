//Import functions and templates
const data = require('./data')
const templates = require('./templates')
const calc = require('./calculations')

// Initialize local storage with empty objects for tab state controls
// if .getItem general returns anything then don't zero.  For each tab.

// localStorage.setItem('general', JSON.stringify({}))
// localStorage.setItem('closing', JSON.stringify({}))
// localStorage.setItem('other', JSON.stringify({}))


//Render the General Pane
function renderGeneral() {
  var state = JSON.parse(localStorage.getItem('general'))

  // state && (Object.hasOwnKey.general.salesprice)
  // console.log(state)

  if (state && state.hasOwnProperty('salesprice')) {

    document.getElementById('generalpane').innerHTML = templates.generalTemplate(state)

  } else {
    document.getElementById('generalpane').innerHTML = templates.generalTemplate()
  }

}
renderGeneral()

//Render the Closing Costs Pane
function renderClosing() {
  generalPane.innerHTML = templates.closingTemplate()
}

//Render the Other pane - To be implemented later.
function renderOther() {
  generalPane.innerHTML = templates.otherTemplate()
}

//Define tabs as variables
const generalTab = document.getElementById('general-tab')
const closingTab = document.getElementById('closing-tab')
const otherTab = document.getElementById('other-tab')

//Define tab contents for easy access
const generalPane = document.getElementById('generalpane')
const summaryPane = document.getElementById('summarypane')


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

//Define Reset button
const resetButton = document.getElementById('reset')

//Define Required Fields alert
// const requiredAlert = document.getElementsByClassName('alert')

//Store data in local storage
function storeLocal(event) {

  //Validation of required inputState - NOTE does not work right.
  var a = salesPrice.value
  var b = loanAmount.value

  if (a && b) {
    document.getElementById('alert-on').classList.add('hide-message')
    document.getElementById('alert-off').classList.remove('hide-message')
  } else {
    document.getElementById('alert-on').classList.remove('hide-message')
    document.getElementById('alert-off').classList.add('hide-message')
  }


  //Write
  var generalState = localStorage.getItem('general')

  if (generalState) {
    generalState = JSON.parse(generalState)
  } else {
    generalState = {}
  }

  generalState[event.target.id] = event.target.value
  localStorage.setItem('general', JSON.stringify(generalState))
  renderSummary()

}


// Reset Button
function resetLocal() {
  // localStorage.clear()
  //
  // //this works to clear the page
  // renderGeneral()
  //
  // // how to call renderSummary to zero?
  // renderSummary()
  // summaryTotal = {}

    localStorage.clear()
    location.reload()

}


//Event Listeners - tabs
generalTab.addEventListener('click', renderGeneral)
closingTab.addEventListener('click', renderClosing)
//otherTab.addEventListener('click', renderOther)   --> To be added later.


// Event Listeners - Required
salesPrice.addEventListener('keyup', storeLocal)
loanAmount.addEventListener('keyup', storeLocal)
inputState.addEventListener('change', storeLocal)
paymentSplit.addEventListener('change', storeLocal)
transactionType.addEventListener('change', storeLocal)

//Event Listeners - secondary
inputAddress.addEventListener('keyup', storeLocal)
inputAddress2.addEventListener('keyup', storeLocal)
inputCity.addEventListener('keyup', storeLocal)
inputZip.addEventListener('keyup', storeLocal)
inputCompany.addEventListener('keyup', storeLocal)
inputPreparedBy.addEventListener('keyup', storeLocal)
inputPreparedFor.addEventListener('keyup', storeLocal)

//Event Listener - reset resetButton
resetButton.addEventListener('click', resetLocal)


//Render the Summary Column
function renderSummary() {

  // let summaryTotal = calc.total(document.getElementById('salesprice'), document.getElementById('loanamount'))
  // summaryPane.innerHTML = templates.summaryTemplate(summaryTotal)

//  If you can get calculations to return the correct object.

 let resultTable = calc()
 summaryPane.innerHTML = templates.summaryTemplate(resultTable)
}
renderSummary()
