<script>

	import Map from './Map.svelte'

	import countriesHashMap from './country_codes.js'

	let countries = [];

	function displayUserCountry() {
		var country = document.getElementById("country").value;
		const countryid = countriesHashMap[country]
		if(countryid) {
			countries = [...countries, countryid];
			// scrollIntoView kinda works, should find alternative.
			// document.getElementById(countryid).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
			zoomIntoView(countryid);
		}
	};

	function zoomIntoView(countryCode) {
		var boundingBox = document.getElementById(countryCode).getBBox();
		var newView = `${boundingBox.x} ${boundingBox.y} ${boundingBox.width} ${boundingBox.height}`;
		const svg = document.getElementById("map");
		svg.setAttribute("viewBox", newView);
	}

</script>

<label for = "country"> Country: </label>
<input type="text" id="country" name="country" placeholder="Sudan">
<button type="button" on:click="{displayUserCountry}"> Submit </button>

<Map countries={countries} />




