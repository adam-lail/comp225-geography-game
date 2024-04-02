<script>

	import Map from './Map.svelte'

	import countriesHashMap from './country_codes.js'

	let countries = [];

	function displayUserCountry() {
		var country = document.getElementById("country").value;
		const countryid = countriesHashMap[country]
		if(countryid) {
			countries = [...countries, countryid];
			document.getElementById(countryid).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
		}
	};

</script>

<label for = "country"> Country: </label>
<input type="text" id="country" name="country" placeholder="Sudan">
<button type="button" on:click="{displayUserCountry}"> Submit </button>

<Map countries={countries} />




