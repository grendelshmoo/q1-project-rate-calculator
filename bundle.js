(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const resultTable = {}

function total(a, b) {
a = parseInt(a.value.replace(/,/g, ""))
b = parseInt(b.value.replace(/,/g, ""))

let result = (a+b)/2
resultTable['buyerTotal'] = result
resultTable['sellerTotal'] = result

return resultTable
}

module.exports = {
  total,
  resultTable
}


// const resultTable = function () { all calculation functions?  }
// return resultTable

},{}],2:[function(require,module,exports){
//Import data & templates
// const data = require('./data')
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

  if (state && state.hasOwnProperty('salesprice' && 'loanamount')) {

    document.getElementById('generalpane').innerHTML = templates.generalTemplate(state)

  } else {
    document.getElementById('generalpane').innerHTML = templates.generalTemplate()

  }


}
renderGeneral()

//Render the Closing Costs Pane
function renderClosing() {
  document.getElementById('generalpane').innerHTML = templates.closingTemplate()
}

//Render the Other pane - To be implemented later.
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

//Define Reset button
const resetButton = document.getElementById('reset')

//Define Required Fields alert
const requiredAlert = document.getElementsByClassName('alert')

//Store data in local storage
function storeLocal(event) {

  //Validation of required inputState - NOTE does not work.
  // var a = salesPrice.value
  // var b = loanAmount.value
  //
  // if (a && b) {
  //   requiredAlert.toggle('hidden')
  // }


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
  localStorage.clear()

  //this works to clear the page
  renderGeneral()

  // how to call renderSummary to zero?
  renderSummary()

  // NOTE - Why doesn't this work to initialize an empty object in local storage?
  // localStorage.setItem('general', JSON.stringify('{}')

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







// Local Storage defaults - NOTE this probably needs to be changed... may not allow state changes
// Maybe make a "defaults" function included in the reset button?

//Newest way... in the templates as default.


// New way, into object
// localStorage.setItem("general",JSON.stringify({"inputstate": "Guam"}))
// localStorage.setItem("general",JSON.stringify({"paymentsplit": "buyerBorrowerSplit"}))
// localStorage.setItem("general",JSON.stringify({"transactiontype": "Residential"}))

// Old way, into individual items:
// localStorage.setItem("inputstate", "Guam")
// localStorage.setItem("paymentsplit", "buyerBorrowerSplit")
// localStorage.setItem("transactiontype", "Residential")

// calc.splitPayments(paymentSplit)


//Render the Summary Column
function renderSummary() {
  let summaryTotal = calc.total(salesPrice, loanAmount)
  document.getElementById('summarypane').innerHTML = templates.summaryTemplate(summaryTotal)
}
renderSummary()

},{"./calculations":1,"./templates":3}],3:[function(require,module,exports){
function generalTemplate (general = {}) {
  // console.log(general.inputaddress)
  return `
  <h4> Transaction Details </h4>
  <!-- Required Fields  -->
  <form>
    <div class="row">
      <div class="col">
        <span>Sales Price</span>
        <div style="width:200px" class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
          </div>
          <input type="text" class="form-control" id="salesprice" aria-label="Amount (to the nearest dollar)" value=${general.salesprice || ''}>
          <div class="input-group-append">
            <span class="input-group-text">.00</span>
          </div>
        </div>
      </div>
      <div class="col">
        <span>Loan Amount</span>
        <div style="width:200px" class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
          </div>
          <input type="text" class="form-control" id="loanamount" aria-label="Amount (to the nearest dollar)" value=${general.loanamount || ''}>
          <div class="input-group-append">
            <span class="input-group-text">.00</span>
          </div>
        </div>
      </div>
    </div>
  </form>
  <hr>
  <!-- Property Info  -->
  <h4>Property Information</h4>
  <form>
    <div class="form-group input-group-sm">
      <label for="inputAddress">Address</label>
      <input type="text" class="form-control" id="inputaddress" placeholder="1234 Main St" value=${general.inputaddress || ''}>
    </div>
    <div class="form-group input-group-sm">
      <label for="inputAddress2">Address 2</label>
      <input type="text" class="form-control" id="inputaddress2" placeholder="Apartment, studio, or floor" value=${general.inputaddress2 || ''}>
    </div>
    <div class="form-row">
      <div class="form-group input-group-sm col-md-6">
        <label for="inputCity">City/Village</label>
        <input type="text" class="form-control" id="inputcity" value=${general.inputcity || ''}>
      </div>
      <div class="form-group input-group-sm col-md-4">
        <label for="inputState">State/Territory</label>
        <select id="inputstate" class="form-control" value=${general.inputstate || 'CNMI'}>
<option value="Guam">Guam</option>
<option value="CNMI">CNMI</option>
</select>
      </div>
      <div class="form-group input-group-sm col-md-2">
        <label for="inputZip">Zip</label>
        <input type="text" class="form-control" id="inputzip" value=${general.inputzip || ''}>
      </div>
    </div>
  </form>
  <hr>
  <!-- Buyer/Borrower Info & General  -->
  <form>
    <div class="row">
      <div class="col">
        <h5>Buyer/Borrower Information</h5> Please select who pays
        <select class="custom-select input-group-sm mr-sm-2 mb-3" id="paymentsplit" value=${general.paymentsplit || 'buyerBorrowerSplit'}>
          <option selected value="buyerBorrowerSplit">Buyer/Borrower Split</option>
          <option value="BuyerPaysAll">Buyer Pays All</option>
          <option value="BorrowerPaysAll">Borrower Pays All</option>
        </select>
            <hr>
        <h5> Type of Transaction</h5>
        <select class="custom-select input-group-sm mr-sm-2 mb-3" id="transactiontype" value=${general.transactiontype || 'Residential'}>
          <option selected value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select>

      </div>
      <div class="col">
        <h5>General Information</h5> Company
        <div class="input-group input-group-sm mb-3">
          <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="inputcompany" value=${general.inputcompany || ''}>
        </div>
        Prepared by
        <div class="input-group input-group-sm mb-3">
          <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="inputpreparedby" value=${general.inputpreparedby || ''}>
        </div>
        Prepared for
        <div class="input-group input-group-sm mb-3">
          <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="inputpreparedfor" value=${general.inputpreparedfor || ''}>
        </div>
      </div>
    </div>
  </form>

  `
}

function closingTemplate (closing) {
  return `
  <h1> Closing Page </h1>


  `
}

function otherTemplate (other) {
  return `
  <h1> Other Page </h1>
  `
}

function summaryTemplate (summary) {
  return `
  <table class="table table-responsive">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Buyer</th>
        <th scope="col">Seller</th>
      </tr>
    </thead>
    <tbody>
      <tr>

        <td>Title Fee:</td>
        <td>$0</td>
        <td>$0</td>
      </tr>
      <tr>

        <td>Escrow Fee:</td>
        <td>$0</td>
        <td>$0</td>
      </tr>
      <tr>
        <td>Recording Fee:</td>
        <td>$0</td>
        <td>$0</td>
      </tr>

      <tr class="font-weight-bold">
        <td>Total:</td>
        <td>\$${summary.buyerTotal || '0'}</td>
        <td>\$${summary.sellerTotal || '0'}</td>
      </tr>
    </tbody>
  </table>
  `
}


module.exports = {
  summaryTemplate,
  generalTemplate,
  closingTemplate,
  otherTemplate
}

},{}]},{},[2]);
