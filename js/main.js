var updateTimer;
let api = {
  responseData: [],
  simpleAPICall: async function(url){
      const apiResponse = await fetch(url)
      const data = await apiResponse.json();
      return this.responseData = data;
  },
  getData: function(){
    return this.responseData;
  }
}

function selectTab(e, tabTitle) {
  var i, tabcontent, tabSelect;
  tabcontent = document.getElementsByClassName("tab-content");
  tabSelect = document.getElementsByClassName("tab-select");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active-tab-content");
  }
  for (i = 0; i < tabSelect.length; i++) {
    tabSelect[i].className = tabSelect[i].className.replace(" selected", "");
  }
  document.getElementById(tabTitle).classList.add("active-tab-content");
  e.currentTarget.className += " selected";
}

function coinSearch(){
  let searchBox = document.getElementById('coin-search').value;
  searchBox != '' ? addCoin(searchBox) : alert('Can not perform empty search');
}

function update(){
  let coin = document.querySelectorAll('.coin-link');
  if(typeof(coin) != 'undefined' && coin != null){
    for(var i = 0; i < coin.length; i++){
      let coinName = coin[i].innerText.toLowerCase();
      getCoinInfo(coinName);
    }
  }
  updateTimer = setTimeout(function(){update()}, 60000);
}

let autoUpdate = document.getElementById('auto-update');
autoUpdate.addEventListener('change', function() {
  if (this.checked) {
    update();
  }else {
    window.clearTimeout(updateTimer);
  }
});
