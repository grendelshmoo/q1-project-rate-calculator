(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//Import data
const data = require('./data')

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

  //Title Fees & rangeFinder
  function rangeFinder(num) {
    let result = 0
    let underTen = RegExp('^0*([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])$')
    let fromTenToFifty = RegExp('^0*([1-3][0-9]{4}|4[0-8][0-9]{3}|49[0-8][0-9]{2}|499[0-8][0-9]|4999[0-9])$')
    let fromFiftyToFiveHundred = RegExp('^0*([5-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|[1-3][0-9]{5}|4[0-8][0-9]{4}|49[0-8][0-9]{3}|499[0-8][0-9]{2}|4999[0-8][0-9]|49999[0-9])$')
    let fromFiveHundredToOneM = RegExp('^0*([5-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-9])$')


    if (underTen.test(num)) {
      result = Math.floor(num / 500) * 500 //?  working 0-9999

    } else if (fromTenToFifty.test(num)) {
      result = Math.floor(num / 1000) * 1000 // working 10000-49999

    } else if (fromFiftyToFiveHundred.test(num)) {
      result = Math.floor(num / 5000) * 5000 // working 50000-499999

    } else if (fromFiveHundredToOneM.test(num)) {
      result = Math.floor(num / 10000) * 10000 // working 500000-999999

    } else {
      console.log("OVER")
    } // up to and includes 1M, probably need to make it more specific... to 999999



    return result
  }

  function titleFees() {

    if (generalLocal.inputstate == "CNMI") {
      let location = data.cnmi

    } else {
      // Set the region table to compare against
      let location = data.guam
      //get the sales price
      let a = parseInt(generalLocal.salesprice.replace(/,/g, ""))
      let active = rangeFinder(a)
      let keys = Object.keys(location)
      let values = Object.values(location)
      let result = 0

      if (generalLocal.paymentsplit == "BuyerPaysAll") {
        for (let i in keys) {

          if (active == keys[i]) {
            finalResult['titleTotal'] = values[i]
            finalResult['titleBuyer'] = values[i]
          }
        }

      } else if (generalLocal.paymentsplit === "BorrowerPaysAll") {
        for (let i in keys) {

          if (active == keys[i]) {
            finalResult['titleTotal'] = values[i]
            finalResult['titleBorrower'] = values[i]

          }
        }

      } else {
        for (let i in keys) {

          if (active == keys[i]) {
            finalResult['titleTotal'] = values[i]
            finalResult['titleBuyer'] = values[i] / 2
            finalResult['titleBorrower'] = values[i] / 2
          }
        }

      }

      for (let i in keys) {

        if (active == keys[i]) {
          finalResult['titleTotal'] = values[i]
          finalResult['titleBuyer'] = values[i] / 2
          finalResult['titleBorrower'] = values[i] / 2
          console.log(finalResult['titleTotal'])
          console.log(finalResult['titleBuyer'])
          console.log(finalResult['titleBorrower'])

        }
      }
    }



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
  titleFees()
  recordingFees()
  escrowFees()
  splitTotal()

  // Should return an object {buyerTotal: xxxxx, sellerTotal:yyyyy}
  return finalResult
}


module.exports = resultTable

},{"./data":2}],2:[function(require,module,exports){
// const movies = [
//   { title: 'Say Anything...', year: 1989, score: '98%', starring: 'John Cusack, Ione Skye, John Mahoney, Lili Taylor' },
//   { title: 'Groundhog Day', year: 1993, score: '96%', starring: 'Bill Murray, Andie MacDowell, Chris Elliott, Stephen Tobolowsky' },
//   { title: 'Obvious Child', year: 2014, score: '90%', starring: 'Jenny Slate, Gaby Hoffmann, David Cross, Jake Lacy' }
// ]
//
// module.exports = movies


// const movies = [
//   { title: 'Say Anything...', year: 1989, score: '98%', starring: 'John Cusack, Ione Skye, John Mahoney, Lili Taylor' },
//   { title: 'Groundhog Day', year: 1993, score: '96%', starring: 'Bill Murray, Andie MacDowell, Chris Elliott, Stephen Tobolowsky' },
//   { title: 'Obvious Child', year: 2014, score: '90%', starring: 'Jenny Slate, Gaby Hoffmann, David Cross, Jake Lacy' },
//   { title: 'The Big Sick', year: 2017, score: '98%', starring: 'Kumail Nanjiani, Zoe Kazan, Holly Hunter, Ray Romano' },
//   { title: 'Roman Holiday', year: 1953, score: '98%', starring: 'Audrey Hepburn, Gregory Peck, Eddie Albert, Tullio Carminati' },
//   { title: 'City Lights', year: 1931, score: '98%', starring: 'Charles Chaplin, Virginia Cherrill, Harry Myers, Florence Lee' },
//   { title: 'The Princess Bride', year: 1987, score: '97%', starring: 'Cary Elwes, Robin Wright, Mandy Patinkin, Chris Sarandon' },
// ]
//
// module.exports = movies

const guam =
  {
    2000: 161,
    2500: 175,
    3000: 193,
    3500: 211,
    4000: 225,
    4500: 237,
    5000: 249,
    5500: 261,
    6000: 273,
    6500: 285,
    7000: 297,
    7500: 309,
    8000: 321,
    8500: 333,
    9000: 346,
    9500: 358,
    10000: 370,
    11000: 386,
    12000: 402,
    13000: 418,
    14000: 434,
    15000: 450,
    16000: 451,
    17000: 452,
    18000: 453,
    19000: 454,
    20000: 455,
    21000: 456,
    22000: 457,
    23000: 458,
    24000: 459,
    25000: 460,
    26000: 461,
    27000: 462,
    28000: 463,
    29000: 464,
    30000: 465,
    31000: 466,
    32000: 467,
    33000: 468,
    34000: 469,
    35000: 470,
    36000: 471,
    37000: 472,
    38000: 473,
    39000: 474,
    40000: 475,
    41000: 476,
    42000: 477,
    43000: 478,
    44000: 479,
    45000: 480,
    46000: 481,
    47000: 482,
    48000: 483,
    49000: 484,
    50000: 490,
    55000: 495,
    60000: 530,
    65000: 567,
    70000: 606,
    75000: 634,
    80000: 663,
    85000: 693,
    90000: 732,
    95000: 760,
    100000: 800,
    105000: 827,
    110000: 866,
    115000: 896,
    120000: 925,
    125000: 949,
    130000: 962,
    135000: 1012,
    140000: 1041,
    145000: 1080,
    150000: 1119,
    155000: 1146,
    160000: 1176,
    165000: 1196,
    170000: 1226,
    175000: 1253,
    180000: 1283,
    185000: 1310,
    190000: 1336,
    195000: 1360,
    200000: 1400,
    205000: 1424,
    210000: 1439,
    215000: 1487,
    220000: 1520,
    225000: 1545,
    230000: 1584,
    235000: 1623,
    240000: 1653,
    245000: 1680,
    250000: 1719,
    255000: 1741,
    260000: 1789,
    265000: 1827,
    270000: 1853,
    275000: 1886,
    280000: 1915,
    285000: 1943,
    290000: 1956,
    295000: 1984,
    300000: 2001,
    305000: 2059,
    310000: 2079,
    315000: 2108,
    320000: 2136,
    325000: 2174,
    330000: 2195,
    335000: 2213,
    340000: 2233,
    345000: 2272,
    350000: 2310,
    355000: 2340,
    360000: 2378,
    365000: 2406,
    370000: 2435,
    375000: 2464,
    380000: 2494,
    385000: 2532,
    390000: 2556,
    395000: 2581,
    400000: 2601,
    405000: 2638,
    410000: 2667,
    415000: 2697,
    420000: 2721,
    425000: 2754,
    430000: 2779,
    435000: 2803,
    440000: 2847,
    445000: 2869,
    450000: 2890,
    455000: 2919,
    460000: 2947,
    465000: 2976,
    470000: 3005,
    475000: 3037,
    480000: 3067,
    485000: 3095,
    490000: 3122,
    495000: 3140,
    500000: 3157,
    510000: 3197,
    520000: 3242,
    530000: 3269,
    540000: 3299,
    550000: 3321,
    560000: 3372,
    570000: 3424,
    580000: 3463,
    590000: 3512,
    600000: 3556,
    610000: 3610,
    620000: 3663,
    630000: 3707,
    640000: 3748,
    650000: 3807,
    660000: 3858,
    670000: 3908,
    680000: 3958,
    690000: 4008,
    700000: 4043,
    710000: 4108,
    720000: 4154,
    730000: 4201,
    740000: 4249,
    750000: 4297,
    760000: 4365,
    770000: 4424,
    780000: 4480,
    790000: 4539,
    800000: 4577,
    810000: 4637,
    820000: 4695,
    830000: 4752,
    840000: 4811,
    850000: 4852,
    860000: 4927,
    870000: 4975,
    880000: 5022,
    890000: 5061,
    900000: 5121,
    910000: 5197,
    920000: 5254,
    930000: 5312,
    940000: 5360,
    950000: 5390,
    960000: 5467,
    970000: 5514,
    980000: 5571,
    990000: 5624,
    1000000: 5659
  }

  const cnmi = 
  {
    26000: 420,
    27000: 420,
    28000: 420,
    29000: 420,
    30000: 420,
    31000: 433,
    32000: 445,
    33000: 458,
    34000: 470,
    35000: 483,
    36000: 496,
    37000: 508,
    38000: 521,
    39000: 533,
    40000: 546,
    41000: 559,
    42000: 571,
    43000: 584,
    44000: 596,
    45000: 609,
    46000: 622,
    47000: 634,
    48000: 647,
    49000: 659,
    50000: 672,
    51000: 683,
    52000: 694,
    53000: 706,
    54000: 717,
    55000: 728,
    56000: 739,
    57000: 750,
    58000: 762,
    59000: 773,
    60000: 784,
    61000: 795,
    62000: 806,
    63000: 818,
    64000: 829,
    65000: 840,
    66000: 851,
    67000: 862,
    68000: 874,
    69000: 885,
    70000: 896,
    71000: 907,
    72000: 918,
    73000: 944,
    74000: 955,
    75000: 967,
    76000: 976,
    77000: 986,
    78000: 995,
    79000: 1005,
    80000: 1015,
    81000: 1025,
    82000: 1035,
    83000: 1044,
    84000: 1054,
    85000: 1064,
    86000: 1074,
    87000: 1098,
    88000: 1107,
    89000: 1117,
    90000: 1127,
    91000: 1137,
    92000: 1147,
    93000: 1156,
    94000: 1166,
    95000: 1176,
    96000: 1186,
    97000: 1197,
    98000: 1205,
    99000: 1215,
    100000: 1225
  }


module.exports = { guam, cnmi }

},{}],3:[function(require,module,exports){
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

},{"./calculations":1,"./data":2,"./templates":4}],4:[function(require,module,exports){
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
  <h4> Buyer Closing Costs </h4>

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

},{}]},{},[3]);
