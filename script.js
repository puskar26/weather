const display = document.querySelector(".info");

const get = document.querySelector(".get");
get.addEventListener("click", () => {
  const city = document.querySelector(".location").value;
  fetch(`https://goweather.herokuapp.com/weather/${city}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.description === "") {
        display.innerHTML = `<p>Either You entered a invalid city name or we don't have weather details for this particular city.</p>
        <p>Try again with another city name.</p>
        `;
        display.style.color = "red";
      } else {
        display.innerHTML = `
            <h2>${city}</h2>
          <p>Temperature :- ${data.temperature} </p>
          <p>Wind :- ${data.wind}</p>
          <p>Description :- ${data.description}</p>
          <h3>Forecast</h3>
            `;
        for (let i = 0; i < data.forecast.length; i++) {
          display.innerHTML += `
              <h4>Day ${data.forecast[i].day}: </h4>
              <p>Temperature :- ${data.forecast[i].temperature} </p>
          <p>Wind :- ${data.forecast[i].wind}</p>
              `;
        }
      }
    })
    .catch((err) => {
      console.log(err);
      display.innerHTML = `<p>Error: ${err.message}</p>`;
    });
});
