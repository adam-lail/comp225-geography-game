<script>

	import Map from './Map.svelte'

	let countries = [];

	let countriesHashMap = {
		"Sudan": "sd",
		"El Salvador": "sv",
		"Mexico": "mx",
		"Bolivia": "bo",
	};

	console.log(countriesHashMap);

	function findCountryCode() {
		var country = document.getElementById("country").value;
		console.log(country)
		const countryid = countriesHashMap[country]
		if(countryid) {
			// countries.push(countriesHashMap[country]);
			// countries = countries 
			countries = [...countries, countryid];
			console.log("inside if");
		}
		console.log(countries)
	};

</script>

<label for = "country"> country:</label>
<input type="text" id="country" name="country" placeholder="Sudan">
<button type="button" on:click="{findCountryCode}"> Submit </button>

<p>
	The countries displayed are:
	<b>{countries}</b>
</p>

<Map countries={countries} />




