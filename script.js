(function weatherStart() {
    const param = {
        "url": "https://api.openweathermap.org/data/2.5/",
        "appid": "f4ca27e4b8677fd3b76b54bdf91cc6d9"
    }

    let weatherCard = document.querySelector('.weather');
    weatherCard.style.borderRadius = '16px';

    let weatherInner = document.querySelector('.weather__inner');

    let cityName = document.createElement('span');
    cityName.classList.add('city');
    weatherInner.appendChild(cityName);

    let tempDegree = document.createElement('span');
    tempDegree.classList.add('temperature');
    weatherInner.appendChild(tempDegree);

    let weatherDescr = document.createElement('span');
    weatherDescr.classList.add('descr');
    weatherInner.appendChild(weatherDescr);

    let weatherImg = document.createElement('img');
    weatherImg.classList.add('weather-img');
    weatherInner.appendChild(weatherImg);

    let windSpeed = document.createElement('span');
    windSpeed.classList.add('wind-speed');
    weatherInner.appendChild(windSpeed);

    let feelsLike = document.createElement('span');
    feelsLike.classList.add('feels');
    weatherInner.appendChild(feelsLike);

    let select = document.createElement('select');
    select.classList.add('select');
    weatherInner.appendChild(select);

    const cityId = {
        704147: "Kremenchuk",
        5391959: "San Francisco",
        3081368: "Wrocław"
    }

    function getWeather() {
        const selectValue = document.querySelector('.select').value;
        fetch(`${param.url}weather?id=${selectValue}&units=metric&APPID=${param.appid}`)
            .then(weather => {
                return weather.json()
            })
            .then(showWeather);
    }

    function showWeather(data) {
        console.log(data);
        cityName.textContent = data.name;
        tempDegree.innerHTML = Math.round(data.main.temp) + '&deg;';
        weatherDescr.textContent = data.weather[0]['description'];
        weatherImg.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`);
        windSpeed.textContent = 'Wind speed: ' + data.wind.speed;
        feelsLike.innerHTML = 'Feels like: ' + Math.round(data.main.feels_like) + '&deg;' + 'C';
    }

    function addOption() {
        for (let key in cityId) {
            let option = document.createElement('option');
            option.value = key;
            option.innerHTML = cityId[key];
            select.append(option);
        }
    }

    addOption()
    getWeather();
    select.onchange = getWeather;
})();