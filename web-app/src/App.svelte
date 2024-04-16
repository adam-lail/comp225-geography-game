<script>
	import AutoComplete from 'simple-svelte-autocomplete'

	import Map from './Map.svelte'

	//import { Button, Modal } from 'flowbite-svelte'
	//npm i -D flowbite-svelte flowbite

	import countriesHashMap from './country_codes.js'

	import { chooseEndCountries } from './path_algorithm.js'

	import { bfs_with_user_countries } from './path_algorithm.js'
    import { contenteditable_truthy_values } from 'svelte/internal';

	let chooseEndCountriesFunction = new chooseEndCountries()

	let countries = [];

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
			zoomIntoView(countryid);
			checkBFS()
		}
	};

	function zoomIntoView(countryCode) {
		var currentBBox = document.getElementById("map").getBBox();
		console.log(currentBBox);
		var boundingBox = document.getElementById(countryCode).getBBox();
		// var centerPoint = new Object();
		// centerPoint.x = boundingBox.x + (boundingBox.width / 2);
		// centerPoint.y = boundingBox.y + (boundingBox.height / 2);
		// console.log(centerPoint);
		var newView = `${boundingBox.x - (boundingBox.width * 3 / 2)} ${boundingBox.y - (boundingBox.height / 2)} ${boundingBox.width * 4} ${500000}`;
		console.log(newView);
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
		isTherePath = false;
	}

	// copied from https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
	function getKeyByValue(object, value) {
  		return Object.keys(object).find(key => object[key] === value);
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
	{#if (countries.length-2) === 1}
		<div >
			<h1 style="font-size:170%; margin-left: 10px; color: green">You made a path! It took you {countries.length - 2} guess.</h1>
		</div>
	{:else}
		<div >
			<h1 style="font-size:170%; margin-left: 10px; color: green">You made a path! It took you {countries.length - 2} guesses.</h1>
		</div>
	{/if}

{:else if !isTherePath}
	<div >
		<h1 style="font-size:170%; margin-left: 10px;">Make a path between {getKeyByValue(countriesHashMap, start1)} and {getKeyByValue(countriesHashMap, start2)}!</h1>
	</div>
		
{/if}

<Map countries={countries} />




