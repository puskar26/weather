# Source Code

## HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
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
      <p class="footer">
        Created by
        <a href="https://www.pushkarniraula.com.np" target="_blank"
          >Pushkar Niraula</a
        >
      </p>
    </div>
  </body>
  <script src="script.js"></script>
</html>
```

## CSS

```css
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  display: flex; /* Change to flex for better control */
  flex-direction: column;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  width: 100%;
}
.container {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  width: 70%;
  margin-top: 1rem;
  text-align: center;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
}
.get {
  margin-top: 10px;
  border: none;
  padding: 8px 20px;
  background-color: greenyellow;
  cursor: pointer;
}
.info {
  margin: 1.5rem 0;
}
input {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 15px 20px;
  outline: none;
  border: none;
  background-color: aliceblue;
  text-align: center;
}
h1,
h2,
h3 {
  text-align: center;
}
input::placeholder {
  text-align: center;
  font-size: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
a {
  background-color: greenyellow;
  padding: 10px;
  text-decoration: none;
  color: black;
}
/* Media Queries */

@media (max-width: 640px) {
  .container {
    width: 100%; /* Makes the container flexible for smaller screens */
    padding: 10px;
    align-items: center;
    box-shadow: none;
  }

  input {
    width: 100%; /* Full width for input on small screens */
    padding: 12px 10px; /* Adjust padding for better touch interaction */
  }

  .get {
    width: 50%; /* Full width for button */
    padding: 12px 10px; /* Increase padding for easier tap */
  }

  h1 {
    font-size: 1.5rem; /* Slightly smaller heading for mobile */
  }

  .info {
    font-size: 1rem; /* Adjust font size for better readability */
    margin: 0.7rem 0;
    padding: 0 10px;
  }
  .footer {
    font-size: 1rem;
  }
}
```

## JavaScript

```javascript
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
```
