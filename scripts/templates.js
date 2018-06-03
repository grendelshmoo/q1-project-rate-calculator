function movieTemplate (movie) {
  return `
  <tr>
    <td>${movie.title}</td>
    <td>${movie.year}</td>
    <td>${movie.score}</td>
    <td>${movie.starring}</td>
  </tr>
`
}

module.exports = movieTemplate
  
