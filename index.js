// Chrome Extension 

// Background Image Api 

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then( res => res.json())
    .then( data => {
        const backgroundImage = data.urls.full
        document.body.style.backgroundImage = `url(${backgroundImage})`
        document.getElementById('description').textContent = data.alt_description
    })

    .catch( err =>  {
        document.body.style.backgroundImage = `url(./images/pexels-nathan-tran-16776159.jpg)`
    })


// Crypo Api 

fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
    .then( res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json() 
    })
    .then( data => {
       document.getElementById('crypto-top').innerHTML = `
       <img src="${data.image.small}" alt="">
       <span>${data.name}</span>
       `


       document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
   `
    })

    .catch( error => {
        console.error(error);
    })

    // res.ok 
    // res.status 

    // Current Time

    function getCurrentTime() {
        const date = new Date()
        document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
    }
    
    setInterval(getCurrentTime, 1000)

    // Weather App 

    navigator.geolocation.getCurrentPosition(position => {
        fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
            .then(res => {
                if (!res.ok) {
                    throw Error("Weather data not available")
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

                const temperatureCelsius = data.main.temp;
                const temperatureFahrenheit = temperatureCelsius / 4
      

                document.getElementById('weather').innerHTML = `
                    <img src=${iconUrl} />
                    <p class="weather-temp">${Math.round(temperatureFahrenheit)}°C</p>
                    <p class="weather-city">${data.name}</p>
                `
            })

            .catch(err => console.log(err))
    });
    
