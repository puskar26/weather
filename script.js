const display = document.querySelector(".info");
const displayForecast = document.querySelector(".forecast");
const displayError = document.querySelector(".error-display");

const get = document.querySelector(".get");
get.addEventListener("click", () => {
  displayForecast.innerHTML = "";
  displayError.innerHTML = "";
  const city = document.querySelector(".location").value;
  if (!city) {
    displayError.innerHTML = `<p>Enter a city.</p>`;
  } else {
    fetch(`https://goweather.herokuapp.com/weather/${city}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.description === "") {
          displayError.innerHTML = `<p>Either You entered a invalid city name or we don't have weather details for this particular city.</p>
          <p>Try again with another city name.</p>
          `;
          displayError.style.color = "white";
        } else {
          display.style.display = "block";
          display.innerHTML = `
          <h2 class="border title">${city}</h2>
          <p class="border">Temperature <span class="end">${data.temperature}</span></p>
          <p class="border">Wind <span class="end">${data.wind}</span></p>
          <p class="border">
            Description <span class="end">Sunny or partly cloudy</span>
          </p>
              `;
          for (let i = 0; i < data.forecast.length; i++) {
            const foreElement = document.createElement("div");
            foreElement.classList.add("forecast-item");
            displayForecast.appendChild(foreElement);
            foreElement.innerHTML = `
            <h4 class="border title">Day ${i + 1} </h4>
            <p class="border" >Temperature <span class="end"> ${
              data.forecast[i].temperature
            } </span> </p>
          <p class="border" > Wind <span class="end"> ${
            data.forecast[i].wind
          } </span></p>
            `;
          }
        }
      })
      .catch((err) => {
        console.log(err);
        displayError.innerHTML = `<p>Error: ${err.message}</p>`;
      });
  }
});
