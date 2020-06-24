window.onload = function (){
    api = "https://api.sugarchain.org"

    function apiCall(call) {
        return Promise.resolve($.ajax({
            url: api + call,
            dataType: 'json',
            type: 'GET'
        }))
    }

    function getBlockHeight() {
        apiCall("/info").then(function(data) {
            var height = data.result.blocks
            $("#blockHeight").text(height)
        })
    }

    function getNetHash() {
        apiCall("/info").then(function(data) {
            var gethash = data.result.nethash
            var hash = gethash / 1000000
            $("#netHashrate").text(hash.toFixed(2) + " MH/s")
        })
    }

    function getSupply() {
        apiCall("/info").then(function(data) {
            var getsupply = data.result.supply
            var supply = getsupply / 100000000
            $("#circSupply").text(supply + " TR3B")
        })
    }

    function getPrice() {
        apiCall("/price").then(function(data) {
            var usd = data.result.usd
            var btc = Number(data.result.btc).toLocaleString(undefined, {minimumFractionDigits: 8, maximumFractionDigits: 8})
            $("#priceBTC").text(btc)
            $("#priceUSD").text(usd)
        })
    }

    setInterval(function() {
        getBlockHeight()
        getNetHash()
        getSupply()
        getPrice()
    }, 3000)
}