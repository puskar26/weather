# Source Code

## HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="favicons/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="favicons/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="favicons/favicon-16x16.png"
    />
    <link rel="manifest" href="/site.webmanifest" />
    <title>Weather Forecast</title>
  </head>
  <body>
    <div class="container">
      <h1>Weather Forecast</h1>
      <div class="form">
        <input
          id="city"
          class="location"
          type="text"
          placeholder="Enter a city"
        />
        <button class="get">Get</button>
      </div>
      <div class="info"></div>
      <div class="forecast"></div>
      <div class="error-display"></div>
      <p class="footer">
        Created by
        <a href="https://www.pushkarniraula.com.np" target="_blank"
          >Pushkar Niraula</a
        >
        <span
          ><a href="https://github.com/puskar26"
            ><img src="images/github-mark-white.png" alt="github" width="35px"
          /></a>
        </span>
      </p>
    </div>
  </body>
  <script src="script.js"></script>
</html>
```

## CSS

```css
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Quicksand", serif;
  letter-spacing: 0.8px;
}
body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #121212;
  color: white;
  min-height: 100vh;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;
  margin-top: 1rem;
  width: 90%;
}
.form {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.get {
  margin-left: 1rem;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #0dcfda;
  color: #fbfbfb;
  cursor: pointer;
}
.info {
  display: none;
  margin: 1.5rem 0;
  background: linear-gradient(to right, #00b4db, #0083b0);
  padding: 5px 20px 20px 20px;
  border-radius: 5px;
  color: #edeced;
  width: 50%;
}
.forecast {
  margin: 1.5rem 0;
  width: 90%;
  display: flex;
  justify-content: space-between;
}
input {
  padding: 10px 20px;
  outline: none;
  border: none;
  font-size: 1rem;
  background-color: #554d56;
  text-align: center;
  color: #f7f7f7;
}
h1 {
  text-align: center;
}
input::placeholder {
  text-align: center;
  font-size: 1rem;
  color: #edeced;
}
.footer {
  margin-top: 1rem;
}
a {
  margin-right: 0.8rem;
  text-decoration: none;
  color: #0dcfda;
}
.border {
  border-bottom: 0.01rem solid rgb(219, 219, 219);
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
}
.forecast-item {
  background: linear-gradient(to right, #00b4db, #0083b0);
  width: 25%;
  padding: 10px;
  border-radius: 5px;
}
.title {
  margin-bottom: 2rem;
}
.end {
  font-weight: bold;
}
/* Media Queries */
@media (max-width: 935px) {
  .forecast {
    width: 100%;
  }
  .forecast-item {
    width: 33%;
  }
  .info {
    width: 90%;
  }
}
@media (max-width: 640px) {
  .container {
    width: 100%;
    padding: 10px;
    align-items: center;
    box-shadow: none;
  }

  input {
    width: 100%;
    padding: 12px 10px;
  }

  .get {
    width: 50%;
    padding: 12px 10px;
  }

  h1 {
    font-size: 1.5rem;
  }

  .info {
    font-size: 0.9rem;
    margin: 0.7rem 0;
    padding: 1rem 10px;
  }
  .forecast {
    flex-direction: column;
    align-items: center;
  }
  .forecast-item {
    margin-top: 1rem;
    padding: 10px 20px 2rem 20px;
    width: 80%;
  }
  .footer {
    font-size: 1rem;
  }
}
```

## JavaScript

```javascript
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
```
