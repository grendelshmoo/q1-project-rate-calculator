// const movies = require('./data')
// const movieTemplate = require('./templates')
//
// movies.forEach(movie => {
//   const tbody = document.querySelector('tbody')
//   tbody.innerHTML += movieTemplate(movie)
//
// })

// This works

// const h2 = document.querySelector('h2')
// h2.addEventListener('click', () => {
//   alert(h2.textContent)
// })


// This does not
// function is invoked when the page loads, after which the function value is set to undefined.  remove the trailing parens at the invocation and it will work.

// const h2 = document.querySelector('h2')
// const alertFn = () => {
//   alert(h2.textContent)
// }
// h2.addEventListener('click', alertFn())

//querySelectorAll returns a nodelist.  eventlistener will not act upon a list, only on an individual node.
//
// const th = document.querySelectorAll('th')
// const alertFn = () => {
//   alert(th.textContent)
// }
// th.addEventListener('click', alertFn)

// same as above
//
// const th = document.querySelectorAll('th')
// const alertFn = () => {
//   alert(th.textContent)
// }
// Array.from(th).forEach(element => element.addEventListener('click', alertFn))

// returns info from the targeted node.
//
//
// const th = document.querySelectorAll('th')
// const alertFn = (event) => {
//   alert(event.target.textContent)
// }
// Array.from(th).forEach(element => element.addEventListener('click', alertFn))
//


const movies = require('./data')
const generateRow = require('./templates')

const th = document.querySelectorAll('th')
const sortFn = (event) => {
  console.log('Getting ready to sort by:', event.target.textContent)
}

Array.from(th).forEach(element => {
  element.addEventListener('click', sortFn)
})

function render () {
  const newRows = movies.map(generateRow)
  document.querySelector('tbody').innerHTML = newRows.join('')
}

render()






//DOMContentLoaded - alternative to defer or adding your script at the end of your body.

//const heading = document.querySelector('h1')

// const h1element = document.querySelector('h1').textContent
// const tableRows = document.querySelector('tbody').textContent

// document.querySelector("h1").innerHTML = "DOM Romantic Comedies"
// //const yearArray = document.getElementsByTagName("TR")[1].children[1].textContent
//
//
// const trsElements = document.querySelectorAll('tbody tr')
// const trs = Array.from(trsElements)
//
// trs.forEach((element) => {
//
// let array = element.children[3].textContent.split(',')
// element.children[3].innerText = `${array} (${array.length})`
//
//
//
// console.log(array)
//
//
//
// })
// console.log(heading)
// console.log(h1element)
// console.log(tableRows)

// array.from
