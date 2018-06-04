(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./templates":2}],2:[function(require,module,exports){
// function generalTemplate (general) {
//   return `
//   <tr>
//     <td>${general.title}</td>
//     <td>${general.year}</td>
//     <td>${general.score}</td>
//     <td>${general.starring}</td>
//   </tr>
// `
// }

function generalTemplate (general) {
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
          <input type="text" class="form-control" id="salesprice" aria-label="Amount (to the nearest dollar)">
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
          <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
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
      <input type="text" class="form-control" id="inputaddress" placeholder="1234 Main St">
    </div>
    <div class="form-group input-group-sm">
      <label for="inputAddress2">Address 2</label>
      <input type="text" class="form-control" id="inputaddress2" placeholder="Apartment, studio, or floor">
    </div>
    <div class="form-row">
      <div class="form-group input-group-sm col-md-6">
        <label for="inputCity">City/Village</label>
        <input type="text" class="form-control" id="inputcity">
      </div>
      <div class="form-group input-group-sm col-md-4">
        <label for="inputState">State/Territory</label>
        <select id="inputstate" class="form-control">
<option selected>Guam</option>
<option>CNMI</option>
</select>
      </div>
      <div class="form-group input-group-sm col-md-2">
        <label for="inputZip">Zip</label>
        <input type="text" class="form-control" id="inputzip">
      </div>
    </div>
  </form>
  <hr>
  <!-- Buyer/Borrower Info & General  -->
  <form>
    <div class="row">
      <div class="col">
        <h5>Buyer/Borrower Information</h5> Please select who pays
        <select class="custom-select input-group-sm mr-sm-2 mb-3" id="payer">
          <option selected value="buyerBorrowerSplit">Buyer/Borrower Split</option>
          <option value="BuyerPaysAll">Buyer Pays All</option>
          <option value="BorrowerPaysAll">Borrower Pays All</optio
        </select>
            <hr>
        <h5> Type of Transaction</h5>
        <select class="custom-select input-group-sm mr-sm-2 mb-3" id="transactiontype">
          <option selected value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select>




      </div>
      <div class="col">
        <h5>General Information</h5> Company
        <div class="input-group input-group-sm mb-3">
          <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
        </div>
        Prepared by
        <div class="input-group input-group-sm mb-3">
          <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
        </div>
        Prepared for
        <div class="input-group input-group-sm mb-3">
          <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
        </div>
      </div>
    </div>
  </form>

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
        <td>$0</td>
        <td>$0</td>
      </tr>
    </tbody>
  </table>
  `
}


module.exports = {
  summaryTemplate,
  generalTemplate
}

},{}]},{},[1]);
