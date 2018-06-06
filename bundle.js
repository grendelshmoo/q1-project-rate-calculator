(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

  //Title Fees

  function titleFees() {


  }

  // Total & Split
  function splitTotal() {

    //BuyerPaysAll
    if (generalLocal.paymentsplit == "BuyerPaysAll") {
      let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
      let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))

      let result = (a + b)
      finalResult['buyerTotal'] = round(result)

      //BorrowerPaysAll -
    } else if (generalLocal.paymentsplit === "BorrowerPaysAll") {
      let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
      let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))

      let result = (a + b)
      finalResult['borrowerTotal'] = round(result)

    } else {
      //Else Split Evenly
      let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
      let b = parseInt(generalLocal.loanamount.replace(/,/g, ""))

      let result = (a + b) / 2
      finalResult['buyerTotal'] = round(result)
      finalResult['borrowerTotal'] = round(result)
    }



  }


  // Call all calculation functions
  recordingFees()
  escrowFees()
  splitTotal()

  // Should return an object {buyerTotal: xxxxx, sellerTotal:yyyyy}
  return finalResult
}


module.exports = resultTable

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
      <input type="text" class="form-control" id="inputaddress" placeholder="1234 Main St" value="${general.inputaddress || ''}">
    </div>
    <div class="form-group input-group-sm">
      <label for="inputAddress2">Address 2</label>
      <input type="text" class="form-control" id="inputaddress2" placeholder="Apartment, studio, or floor" value="${general.inputaddress2 || ''}">
    </div>
    <div class="form-row">
      <div class="form-group input-group-sm col-md-6">
        <label for="inputCity">City/Village</label>
        <input type="text" class="form-control" id="inputcity" value="${general.inputcity || ''}">
      </div>
      <div class="form-group input-group-sm col-md-4">
        <label for="inputState">State/Territory</label>
        <select id="inputstate" class="form-control" value=${general.inputstate || 'CNMI'}>
<option ${general.inputstate === 'Guam' && "selected"} value="Guam">Guam</option>
<option ${general.inputstate === 'CNMI' && "selected"} value="CNMI">CNMI</option>
</select>
      </div>
      <div class="form-group input-group-sm col-md-2">
        <label for="inputZip">Zip</label>
        <input type="text" class="form-control" id="inputzip" value="${general.inputzip || ''}">
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
          <option ${general.paymentsplit === 'buyerBorrowerSplit' && "selected"} value="buyerBorrowerSplit">Buyer/Borrower Split</option>
          <option ${general.paymentsplit === 'BuyerPaysAll' && "selected"} value="BuyerPaysAll">Buyer Pays All</option>
          <option ${general.paymentsplit === 'BorrowerPaysAll' && "selected"} value="BorrowerPaysAll">Borrower Pays All</option>
        </select>
            <hr>
        <h5> Type of Transaction</h5>
        <select class="custom-select input-group-sm mr-sm-2 mb-3" id="transactiontype" value=${general.transactiontype || 'Residential'}>
          <option ${general.transactiontype === "Residential" && "selected"} value="Residential">Residential</option>
          <option ${general.transactiontype === "Commercial" && "selected"} value="Commercial">Commercial</option>
        </select>

      </div>
      <div class="col">
        <h5>General Information</h5> Company
        <div class="input-group input-group-sm mb-3">
          <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="inputcompany" value="${general.inputcompany || ''}">
        </div>
        Prepared by
        <div class="input-group input-group-sm mb-3">
          <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="inputpreparedby" value="${general.inputpreparedby || ''}">
        </div>
        Prepared for
        <div class="input-group input-group-sm mb-3">
          <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="inputpreparedfor" value="${general.inputpreparedfor || ''}">
        </div>
      </div>
    </div>
  </form>

  `
}

function closingTemplate (closing) {
  return `
  <h4> Closing Costs </h4>

  Termite Report
  <div style="width:200px" class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">$</span>
    </div>
    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
    <div class="input-group-append">

    </div>
  </div>

  Attorney Fees
  <div style="width:200px" class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">$</span>
    </div>
    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
    <div class="input-group-append">

    </div>
  </div>

  Home Inspection
  <div style="width:200px" class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">$</span>
    </div>
    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
    <div class="input-group-append">

    </div>
  </div>

  Loan Payoff
  <div style="width:200px" class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">$</span>
    </div>
    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
    <div class="input-group-append">

    </div>
  </div>
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
        <td>\$${summary.escrowBuyer || '0'}</td>
        <td>\$${summary.escrowBorrower || '0'}</td>
      </tr>
      <tr>
        <td>Recording Fee:</td>
        <td>\$${summary.recordingBuyer || '0'}</td>
        <td>\$${summary.recordingBorrower || '0'}</td>
      </tr>

      <tr class="font-weight-bold">
        <td>Total:</td>
        <td>\$${summary.buyerTotal || '0'}</td>
        <td>\$${summary.borrowerTotal || '0'}</td>
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
