<script>
	import AutoComplete from 'simple-svelte-autocomplete'

	import Map from './Map.svelte'

	import countriesHashMap from './country_codes.js'

	import { chooseEndCountries } from './path_algorithm.js'

	import { bfs_with_user_countries } from './path_algorithm.js'

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
	
	var autoBool = true;

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
		autoBool = false;
		numGuesses = 0;
		chooseEndCountriesFunction = new chooseEndCountries();
		start1 = chooseEndCountriesFunction[0];
		start2 = chooseEndCountriesFunction[1];
		countries = [];
		countries.push(start1, start2);
		isTherePath = false;
		const svg = document.getElementById("map");
		let viewboxY = window.innerHeight / window.innerWidth;
		if (viewboxY < 0.5) {
			viewboxY *= 50;
		} else if (viewboxY > 0.8) {
			viewboxY *= 600;
		}
		else {
			viewboxY *= 250;
		}
		svg.setAttribute("viewBox", "-300 -" + viewboxY + " 3400 100000");
		
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
				names = names + getKeyByValue(countriesHashMap, id) + " \u2192 "
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

	function updateNumGuesses() {
		numGuesses = countries.length;
	}

	function updateAutoBool() {
		autoBool = true;
	}

</script>

{#if isTherePath}
	
	{#if numGuesses === 0}
		{updateNumGuesses()}
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

{#if autoBool}
	<AutoComplete items={Object.keys(countriesHashMap)} bind:selectedItem={userSelectedCountry} placeholder="Add a country to your path" showClear=true/>
{:else}
	{userSelectedCountry = ""}
	<AutoComplete items={Object.keys(countriesHashMap)} bind:selectedItem={userSelectedCountry} placeholder="Add a country to your path" showClear=true/>
	{updateAutoBool()}
{/if}

<button type="button" on:click="{addCountry}"> Add </button>

<NewGameButton on:reset={reset} />

<GiveUpButton on:giveUp={giveUp} />

<span style = "padding-left:1px;"> 
	<!-- code modified from https://svelte.dev/examples/modal -->
	<button on:click={() => (showModal = true)} style = "border-radius: 50%; width: 35px; height: 35px;"> {@html "<b>?</b>"} </button>
</span>

<Modal bind:showModal>
	<h2 slot="header">
		Help Guide
	</h2>

	<ul class = "direction-list" style="line-height:100%">
		<h3>How to Play</h3>
		<li style="line-height: 130%">Try to make the shortest path, but if you cannot do so still try to make any path
			connecting the two starting countries.</li>
		<li style="line-height: 130%">Enter your guesses from the dropdown menu.</li>
		<li style="line-height: 130%">All of your guesses do not need to be in your final path.</li>
		<li style="line-height: 130%">Hover over a colored country to see its name, or any country once a path has been made.</li>
		<li style="line-height: 130%">Scroll to zoom.</li>
		<li style="line-height: 130%">Click and hold to drag the map.</li>

		<h3>Geographical Conditions</h3>
		<li style="line-height: 130%">Only UN-recognized countries are used.</li>
		<li style="line-height: 130%">Includes borders with a country's enclaves and exclaves, 
			with the exception of French Guiana.
		</li>

		<h3>Color Key</h3>
		<li style="line-height:130%"><span style="color:blue">Blue:</span> The countries that you are trying to connect.</li>
		<li style="line-height:130%"><span style="color:red">Red:</span> The countries that you have guessed.</li>
		<li style="line-height:130%"><span style="color:green">Green:</span> The countries that are part of your shortest final path.</li>
	</ul>

</Modal>


<Map countries={countries} />




