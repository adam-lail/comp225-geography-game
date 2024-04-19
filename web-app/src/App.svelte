<script>
	import AutoComplete from 'simple-svelte-autocomplete'

	import Map from './Map.svelte'

	import countriesHashMap from './country_codes.js'

	import { chooseEndCountries } from './path_algorithm.js'

	import { bfs_with_user_countries } from './path_algorithm.js'
    import { contenteditable_truthy_values } from 'svelte/internal';

	import { bfs_shortest_path } from './path_algorithm'

	let chooseEndCountriesFunction = new chooseEndCountries()

	let countries = [];

	let userSelectedCountry;

	var bfs = false;
	
	var isTherePath = false;
	
	var start1 = chooseEndCountriesFunction[0]
	
	var start2 = chooseEndCountriesFunction[1]
		
	countries.push(start1, start2)

	function addCountry() {
		const countryid = countriesHashMap[userSelectedCountry];
		if(countryid) {
			countries = [...countries, countryid];
			zoomIntoView(countryid);
			checkBFS()
		}
	};

	function zoomIntoView(countryCode) {
		var boundingBox = document.getElementById(countryCode).getBBox();
		var newView = `${boundingBox.x - (boundingBox.width * 4 / 2)} ${boundingBox.y - (boundingBox.height / 2)} ${boundingBox.width * 5} ${500000}`;
		const svg = document.getElementById("map");
		svg.setAttribute("viewBox", newView);
	};

	function checkBFS() {
		bfs = bfs_with_user_countries(start1, start2, countries)
		if (bfs == true) {
			isTherePath = true;
		}
	};

	function reset() {
		chooseEndCountriesFunction = new chooseEndCountries();
		start1 = chooseEndCountriesFunction[0];
		start2 = chooseEndCountriesFunction[1];
		countries = [];
		countries.push(start1, start2);
		isTherePath = false;
	};

	// copied from https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
	function getKeyByValue(object, value) {
  		return Object.keys(object).find(key => object[key] === value);
	};

	function names_of_shortest_path() {
		var names = ""
		var path = bfs_shortest_path(start1, start2)
		for(const id of path) {
			if (path[path.length - 1] != id) {
				names = names + getKeyByValue(countriesHashMap, id) + " --> "
			} else {
				names = names + getKeyByValue(countriesHashMap, id)
			}
		}
		return names
	}

</script>

{#if isTherePath}
	{@html "<style> .landxx {pointer-events: auto !important; } <\/style>"}	
	{#if (countries.length-2) === 1}
		<div >
			<h1 style="font-size:170%; margin-left: 10px; color: green">You made a path! It took you {countries.length - 2} guess.</h1>
		</div>
		{#if (bfs_shortest_path(start1, start2).length - 2) === 1}
			<div>
				<h1 style="font-size:90%; margin-left: 10px"> The shortest possible path is 1 country.<h1>
			</div>
		{:else}
			<div>
				<h1 style="font-size:90%; margin-left: 10px"> The shortest possible path is {bfs_shortest_path(start1, start2).length - 2} countries.<h1>
			</div>
		{/if}
		<div>
			<h1 style="font-size:90%; margin-left: 10px"> Possible shortest path: {names_of_shortest_path()}<h1>
		</div>
	{:else}
		<div >
			<h1 style="font-size:170%; margin-left: 10px; color: green">You made a path! It took you {countries.length - 2} guesses.</h1>
		</div>
		{#if (bfs_shortest_path(start1, start2).length - 2) === 1}
			<div>
				<h1 style="font-size:90%; margin-left: 10px"> The shortest possible path is 1 country.<h1>
			</div>
		{:else}
			<div>
				<h1 style="font-size:90%; margin-left: 10px"> The shortest possible path is {bfs_shortest_path(start1, start2).length - 2} countries.<h1>
			</div>
		{/if}
		<div>
			<h1 style="font-size:90%; margin-left: 10px"> Possible shortest path: {names_of_shortest_path()}<h1>
		</div>
	{/if}

{:else if !isTherePath}
	<div >
		<h1 style="font-size:170%; margin-left: 10px;">Make a path between {getKeyByValue(countriesHashMap, start1)} and {getKeyByValue(countriesHashMap, start2)}!</h1>
	</div>
		
{/if}

<AutoComplete items={Object.keys(countriesHashMap)} bind:selectedItem={userSelectedCountry} placeholder="Enter a country" showClear=true/>
<!-- {#if !isTherePath} -->
<button type="button" on:click="{addCountry}"> Add </button>
<!-- {/if} -->
<span style = "float: right;">
	<button type="button" on:click="{reset}"> New Game</button>
</span>

<Map countries={countries} />




