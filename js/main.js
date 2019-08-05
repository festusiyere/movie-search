$(document).ready(()=>{
  $("#searchForm").on("submit", (e)=> {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  })
});


function getMovies(searchText) {
  axios.get('http://www.omdbapi.com/?apikey=fe7b1936&s=' + searchText)
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      console.log(movies);
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3 mb-md-3">
            <div class="rounded text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary mb-md-3 mb-sm-3" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com/?apikey=fe7b1936&i=' + movieId)
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2> ${movie.Title}</h2>
            <ul class="list-group">
            <li class="list-group-item font-weight-bold"> Genre: ${movie.Genre}</li>
            <li class="list-group-item font-weight-bold"> Released: ${movie.Released}</li>
            <li class="list-group-item font-weight-bold"> Rated: ${movie.Rated}</li>
            <li class="list-group-item font-weight-bold"> imdbRating: ${movie.imdbRating}</li>
            <li class="list-group-item font-weight-bold"> Director: ${movie.Director}</li>
            <li class="list-group-item font-weight-bold"> Writers: ${movie.Writers}</li>
            <li class="list-group-item font-weight-bold"> Actors: ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="rounded">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View iMBD</a>
            <a href="index.html" class="btn btn-default">Back to Search</a>
          </div>
        </div>
      `;

      $("#movie").html(output);
    })
    .catch((err) => {
      console.log(err);
    });


}
