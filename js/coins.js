let getCoinInfo = async (coin) => {
    let twentyFour = document.getElementById(coin + '-24hr');
    let coinPrice = document.getElementById(coin + '-price');
    let timestamp = document.getElementById(coin + '-time');
    let coinImg = document.getElementById(coin + '-img');
    let coinLink = document.getElementById(coin + '-link');
    let coinSupply = document.getElementById(coin + '-supply');
    let coinHigh = document.getElementById(coin + '-high');
    let coinLow = document.getElementById(coin + '-low');
    let priceSelect = document.getElementById('price-select').value;
    let highSVG = `<svg class="high" id="arrow" viewBox="0 0 24 24"><path d="M17.5 10.9L13.6 7c-.5-.5-.5-1.2 0-1.7s1.2-.5 1.7 0L22 12l-6.7 6.7c-.5.5-1.2.5-1.7 0s-.5-1.2 0-1.7l3.8-3.8H3.2c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2h14.3z"></path></svg>`
    let lowSVG = `<svg class="low" id="arrow" viewBox="0 0 24 24"><path d="M17.5 10.9L13.6 7c-.5-.5-.5-1.2 0-1.7s1.2-.5 1.7 0L22 12l-6.7 6.7c-.5.5-1.2.5-1.7 0s-.5-1.2 0-1.7l3.8-3.8H3.2c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2h14.3z"></path></svg>`
    await api.simpleAPICall('https://api.coingecko.com/api/v3/coins/' + coin);
    if(api.responseData != '' && api.responseData.error != 'Could not find coin with the given id'){
        twentyFour.innerHTML = `Last 24hr:`;
        coinPrice.innerHTML =  `Price: ` + `<span class="data-values">` + api.responseData.market_data.current_price[priceSelect] + ` ` + priceSelect.toUpperCase()  +`</span>`;
        coinSupply.innerHTML = `Circulating Supply:  <span class="data-values">` + api.responseData.market_data.circulating_supply + `</span>`;
        timestamp.innerHTML = `Last Updated:   <span class="data-values">` + api.responseData.last_updated + `</span>`;
        coinImg.src = api.responseData.image.small;
        coinLink.href = api.responseData.links.homepage[0];
        coinHigh.innerHTML = highSVG + `<span class="data-values">` + api.responseData.market_data.high_24h[priceSelect] + ` ` +priceSelect.toUpperCase() + `</span>`;
        coinLow.innerHTML = lowSVG + `<span class="data-values">` + api.responseData.market_data.low_24h[priceSelect] + ` ` +priceSelect.toUpperCase() + `</span>`;
    }
    else{
        alert('Coin does not exist');
    }
}

let addCoin = (coin) => {
    let elementExist = document.getElementById(coin);
    let coinContainer = document.getElementById('coins');
    let title = coin.charAt(0).toUpperCase() + coin.slice(1);
    if(typeof(elementExist) != 'undefined' && elementExist != null){
        alert(coin + ' has already been added!');
    } 
    else{
        let documentFragment = document.createRange().createContextualFragment(`
            <div id="`+ coin +`" class="coin-tile">
                <button class="remove-btn" type="button" onclick="return this.parentNode.remove();">X</button>
                <img id="`+ coin +`-img" src="imgs/loading.gif" alt="`+ coin +`">
                <h3><a id="`+ coin +`-link" class="coin-link" href="#" target="_blank">`+ title +`</a></h3>
                <p id="`+ coin +`-price"></p>
                <p id="`+ coin +`-supply"></p>
                <p id="`+ coin +`-time"></p>
                <p id="`+ coin +`-24hr"></p>
                <div class="row">
                    <div id="`+ coin +`-high" class="column text-center"></div>
                    <div id="`+ coin +`-low" class="column text-center"></div>
                </div>
            </div>
        `)
        coinContainer.appendChild(documentFragment)
        getCoinInfo(coin);
    }
}