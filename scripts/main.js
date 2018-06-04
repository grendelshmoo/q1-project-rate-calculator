// const data = require('./data')
const templates = require('./templates')


//Render the Summary Column
function renderSummary () {
  document.getElementById('summaryPane').innerHTML = templates.summaryTemplate()
}
renderSummary()


//Render the General Pane
function renderGeneral() {
  document.getElementById('generalPane').innerHTML = templates.generalTemplate()
}
renderGeneral()

//On Input Event Listener for Sales Price

//On Input Event Listener for Loan Amount
