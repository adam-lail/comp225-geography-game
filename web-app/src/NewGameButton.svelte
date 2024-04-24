<script>
    import Modal from './Modal.svelte';

    import { createEventDispatcher } from 'svelte';

    let showModal;
	let dialog;

	const dispatch = createEventDispatcher();

	function makeEvent() {
		dialog.close();
		dispatch("reset");
	}

</script>

<span style = "float: right;">
	<button type="button" on:click={() => (showModal = true)}> New Game </button>
</span>

<Modal bind:showModal bind:dialog>
	<h2> Are you sure you want to start a new game?</h2>
	<p> All your progress will be reset.</p>
	<button type="button" on:click="{makeEvent}"> I'm sure </button>
</Modal>