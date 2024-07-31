function keyBy(list, keyName, valueName) {
    let mapByKey = {};
    list.forEach((eachItem) => {
        mapByKey[eachItem[keyName]] = eachItem[valueName];
    });
    return mapByKey;
}
async function onSubmit() {
    var dest = document.getElementById("destination").value;
    var dep = document.getElementById("dep-date").value;
    var rtn = document.getElementById("rtn-date").value;
    await fetch(`https://rapidapi.com/aedbx-aedbx/api/aerodatabox/playground/apiendpoint_bfbaf556-4814-4b03-ba06-385525981cf0`, {
        methor: "GET",
        headers: {
            "x-rapidapi-key": "0f3c41288dmshc1538712862d6a9p10d474jsn449b163cc73",
            "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
        },
    })
        .then((response) => {
            console.log(response);
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then((data) => {
            loadData(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
function loadData(data) {
    const { Carriers, Quotes, Places } = data;
    const carriersByIdMap = keyBy(Carriers, "CarrierId", "Name");
    const placesByIdMap = keyBy(Places, "PlaceId", "Name");
    const topQuotes = Quotes.slice(0, 10);
    const html = topQuotes
        .map((eachQuote) => {
            return `
			<div class="f-details">
				<p>From: ${placesByIdMap[eachQuote.OutboundLeg.OriginId]}</p>
				<p>To: ${placesByIdMap[eachQuote.OutboundLeg.DestinationId]}</p>
				<p>Flight Name: ${carriersByIdMap[eachQuote.OutboundLeg.CarrierIds[0]]}</p>
				<p>Price: EUR ${eachQuote.MinPrice}</p>
				<p>Is Direct: ${eachQuote.Direct}</p>
				<p>Departure Date: ${eachQuote.OutboundLeg.DepartureDate}</p>
			</div>
		`;
        })
        .join("");
    localStorage.setItem("html", html);
    window.location.href = "flight.html";
}
