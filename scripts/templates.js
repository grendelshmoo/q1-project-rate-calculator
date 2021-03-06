function generalTemplate (general = {}) {

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


function closingTemplate (closing = {}) {
  return `
  <h4> Buyer Closing Costs </h4>

  Termite Report
  <div style="width:200px" class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">$</span>
    </div>
    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" value="${closing.inputtermitereport || ''}" id="inputtermitereport">
    <div class="input-group-append">

    </div>
  </div>

  Attorney Fees
  <div style="width:200px" class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">$</span>
    </div>
    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" value="${closing.inputattorneyfees || ''}" id="inputattorneyfees">
    <div class="input-group-append">

    </div>
  </div>

  Home Inspection
  <div style="width:200px" class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">$</span>
    </div>
    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" value="${closing.inputhomeinspection || ''}" id="inputhomeinspection">
    <div class="input-group-append">

    </div>
  </div>

  Loan Payoff
  <div style="width:200px" class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">$</span>
    </div>
    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" value="${closing.inputloanpayoff || ''}" id="inputloanpayoff">
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
        <td>\$${summary.titleBuyer || '0'}</td>
        <td>\$${summary.titleBorrower || '0'}</td>
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
