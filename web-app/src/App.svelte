<script>

	import Map from './Map.svelte'

	let countries = [];

	let countriesHashMap = {
		"Sudan": "sd",
		"El Salvador": "sv",
		"Mexico": "mx",
		"Bolivia": "bo",
	};

	function displayUserCountry() {
		var country = document.getElementById("country").value;
		const countryid = countriesHashMap[country]
		if(countryid) {
			countries = [...countries, countryid];
		}
	};

</script>

<label for = "country"> Country: </label>
<input type="text" id="country" name="country" placeholder="Sudan">
<button type="button" on:click="{displayUserCountry}"> Submit </button>

<Map countries={countries} />




