let input = document.getElementById("input");
let before = document.getElementById("before");
let after = document.getElementById("after");
let loader = document.getElementById("loader-wrapper"); 
let cancel = document.getElementById('cancel');

getData = async (value) => {
    showLoader(); 
    try {
        let api = "https://omdbapi.com/?apikey=ed708b24&t=" + value;
        let res = await fetch(api);
        let data = await res.json();
        console.log(data.Response);
        if (data.Response === "True") {
            processData(data);
        } else {
            alert("Movie not found");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching data.");
    } finally {
        hideLoader(); 
    }
}

showLoader = () => {
    loader.style.display = 'block';
}

hideLoader = () => {
    loader.style.display = 'none';
}

processData = (get) => {
    changeInterface();
    let title = document.getElementById("title");
    let date = document.getElementById("date");
    let genre = document.getElementById("genre");
    let actors = document.getElementById("actors");
    let director = document.getElementById("director");
    let lang = document.getElementById("lang");
    let rating = document.getElementById("rating");
    let awards = document.getElementById("awards");
    let plot = document.getElementById("plot");
    let collection = document.getElementById("collection");
    let poster = document.getElementById("poster");

    title.innerText = get.Title;
    plot.innerText = get.Plot;
    date.innerText = get.Released;
    genre.innerText = get.Genre;
    actors.innerText = get.Actors;
    director.innerText = get.Director;
    lang.innerText = get.Language;
    rating.innerText = get.imdbRating;
    awards.innerText = get.Awards;
    collection.innerText = get.BoxOffice;
    poster.src = get.Poster;
}

eventctl = (event) => {
    if (event.key == "Enter") {
        getData(input.value);
    }
}

btnClick = () => {
    getData(input.value);
}

changeInterface = () => {
    before.style.display = 'none';
    after.style.display = 'block';
}

cancel = () => {
    before.style.display = 'block';
    after.style.display = 'none';
}

let imgData = document.querySelectorAll(".movie-img img");

console.log(imgData);
imgData.forEach(el => {
    el.addEventListener("click", () => {
        getData(el.name);
    });
});
