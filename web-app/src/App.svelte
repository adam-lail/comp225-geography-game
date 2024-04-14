<script>
	import AutoComplete from 'simple-svelte-autocomplete'

	import Map from './Map.svelte'

	import countriesHashMap from './country_codes.js'

	import { chooseEndCountries } from './path_algorithm.js'

	import { bfs_with_user_countries } from './path_algorithm.js'

	let chooseEndCountriesFunction = new chooseEndCountries()

	let countries = [];
	let selectedCountries;

	var bfs = false;
	
	var isTherePath = false;

	// var homeScreen = true;
	
	const start1 = chooseEndCountriesFunction[0]
	
	const start2 = chooseEndCountriesFunction[1]
		
	countries.push(start1, start2)

	function displayUserCountry() {
		var country = document.getElementById("country").value;
		const countryid = countriesHashMap[country]
		if(countryid) {
			countries = [...countries, countryid];

			// scrollIntoView kinda works, should find alternative.
			// document.getElementById(countryid).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
			zoomIntoView(countryid);
			checkBFS()
		}
	};

	function zoomIntoView(countryCode) {
		var boundingBox = document.getElementById(countryCode).getBBox();
		var newView = `${boundingBox.x} ${boundingBox.y} ${boundingBox.width} ${boundingBox.height}`;
		const svg = document.getElementById("map");
		svg.setAttribute("viewBox", newView);
	}

	function checkBFS() {
		bfs = bfs_with_user_countries(start1, start2, countries)
		if (bfs == true) {
			isTherePath = true;
		}
	}

	function reset() {
		chooseEndCountriesFunction = new chooseEndCountries();
		const start1 = chooseEndCountriesFunction[0];
		const start2 = chooseEndCountriesFunction[1];
		countries = [];
		countries.push(start1, start2);
	}

</script>

<!-- {#if homeScreen}
	<label for = "title"> Geography Game </label>
	<button type="button" on:click={() => homeScreen=false}> Start </button>
{/if} -->

<label for = "country"> Country: </label>
<input type="text" id="country" name="country" placeholder="Sudan">
<button type="button" on:click="{displayUserCountry}"> Submit </button>
<button type="button" on:click="{reset}"> Reset</button>

<AutoComplete items={Object.keys(countriesHashMap)}/>

{#if isTherePath}
	<p>You made a path!</p>
{:else if !isTherePath}
	<p>Keep trying to make a path!</p>
{/if}

<Map countries={countries} />




