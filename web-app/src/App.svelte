<script>
	import AutoComplete from 'simple-svelte-autocomplete'

	import Map from './Map.svelte'

	import countriesHashMap from './country_codes.js'

	import { chooseEndCountries } from './path_algorithm.js'

	import { bfs_with_user_countries } from './path_algorithm.js'
	
    import { contenteditable_truthy_values } from 'svelte/internal';

	import { bfs_shortest_path } from './path_algorithm'

	import Modal from './Modal.svelte';
    import NewGameButton from './NewGameButton.svelte';
	import GiveUpButton from './GiveUpButton.svelte';

	let showModal = false;

	let chooseEndCountriesFunction = new chooseEndCountries()

	let countries = [];

	let userSelectedCountry;

	var bfs = false;
	
	var isTherePath = false;

	var giveUpBool = false;

	var numGuesses = 0;
	
	var start1 = chooseEndCountriesFunction[0]
	
	var start2 = chooseEndCountriesFunction[1]
		
	countries.push(start1, start2)

	function addCountry() {
		const countryid = countriesHashMap[userSelectedCountry];
		if(countryid) {
			if (!(countries.includes(countryid))) {
				countries = [...countries, countryid];
				zoomIntoView(countryid);
				checkBFS()
			}
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
		giveUpBool = false;
		chooseEndCountriesFunction = new chooseEndCountries();
		start1 = chooseEndCountriesFunction[0];
		start2 = chooseEndCountriesFunction[1];
		countries = [];
		countries.push(start1, start2);
		isTherePath = false;
		const svg = document.getElementById("map");
		svg.setAttribute("viewBox", "0 0 2800 100000");
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

	//logic in progress
	function names_of_user_countries() {
		var names = ""
		for(const id of countries) {
			if (countries[countries.length - 1] != id) {
				names = names + getKeyByValue(countriesHashMap, id) + " --> "
			} else {
				names = names + getKeyByValue(countriesHashMap, id)
			}
		}
		return names
	}

	function giveUp() {
		isTherePath = true;
		giveUpBool = true;
		const shortestPath = bfs_shortest_path(start1, start2)
		for(const country of shortestPath) {
			if (!(countries.includes(country))) {
				countries = [...countries, country];
			}
		}
	}

	const button = document.getElementById('addButton');
  	document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' || event.key === 'Enter') {
      addCountry();
    }
  	});

</script>

{#if isTherePath}
	
	{#if numGuesses === 0}
		{numGuesses = countries.length}
	{/if}
	{@html "<style> .landxx {pointer-events: auto !important; } <\/style>"}	
	{#if giveUpBool}
		<div >
			<h1 style="font-size:170%; margin-left: 10px; color: green">You gave up. Better luck next time!</h1>
		</div>
		<div>
			<h1 style="font-size:90%; margin-left: 10px"> Possible shortest path: {names_of_shortest_path()}<h1>
		</div>
	{:else if numGuesses === bfs_shortest_path(start1, start2).length}
		{#if (numGuesses-2) === 1}
			<div >
				<h1 style="font-size:170%; margin-left: 10px; color: green">You made the shortest possible path! It took you {numGuesses - 2} guess. Congrats!</h1>
			</div>
		{:else}
			<div >
				<h1 style="font-size:170%; margin-left: 10px; color: green">You made the shortest possible path! It took you {numGuesses - 2} guesses. Congrats!</h1>
			</div>
		{/if}
		<!-- <div>
			<h1 style="font-size:90%; margin-left: 10px"> Your path: {names_of_user_countries()}<h1>
		</div> -->
	{:else if (numGuesses-2) === 1}
		<div >
			<h1 style="font-size:170%; margin-left: 10px; color: green">You made a path! It took you {numGuesses - 2} guess.</h1>
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
			<h1 style="font-size:170%; margin-left: 10px; color: green">You made a path! It took you {numGuesses - 2} guesses.</h1>
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
		<h1 style="font-size:170%; margin-left: 10px;">Try to connect <span style="color: blue">{getKeyByValue(countriesHashMap, start1)}</span> and <span style="color: blue">{getKeyByValue(countriesHashMap, start2)}</span> by their borders in the fewest countries!</h1>
	</div>
		
{/if}



<AutoComplete items={Object.keys(countriesHashMap)} bind:selectedItem={userSelectedCountry} placeholder="Add a country to your path" showClear=true/>

<button type="button" on:click="{addCountry}"> Add </button>



<NewGameButton on:reset={reset} />

<GiveUpButton on:giveUp={giveUp} />

<!-- <span style = "float: right; padding-right:5px">
	<button type="button" on:click="{giveUp}"> Give Up</button>
</span> -->

<span style = "padding-left:1px;"> 
	<!-- code modified from https://svelte.dev/examples/modal -->
	<button on:click={() => (showModal = true)} style = "border-radius: 50%; width: 35px; height: 35px;"> {@html "<b>?</b>"} </button>
</span>

<Modal bind:showModal>
	<h2 slot="header">
		Help Guide
	</h2>

	<ul class = "direction-list" style="line-height:100%">
		<h3>Usability</h3>
		<li>Hover over a colored country to see its name, or any country once the game is over</li>
		<li>All of your guesses do not need to be in your final path</li>
		<li>Scroll to zoom</li>
		<li>Click and hold to drag map</li>

		<h3>Geographical Conditions</h3>
		<li>Only UN-recognized countries are used</li>
		<li>Includes borders with a country's enclaves and exclaves, 
			with the exception of French Guiana
		</li>

		<h3>Color Key</h3>
		<li style="line-height:100%"><span style="color:blue">Blue:</span> The starting and ending countries.</li>
		<li style="line-height:100%"><span style="color:red">Red:</span> The countries that you have guessed.</li>
		<li style="line-height:100%"><span style="color:green">Green:</span> The countries that are part of the shortest final path.</li>
	</ul>

</Modal>


<Map countries={countries} />




