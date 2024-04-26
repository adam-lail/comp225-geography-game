<script>
    import Modal from './Modal.svelte';

    import { createEventDispatcher } from 'svelte';

    let showModal;
	let dialog;

	const dispatch = createEventDispatcher();

	function makeEvent() {
		dialog.close();
		dispatch("giveUp");
	}

</script>

<span style = "float: right; padding-right:5px">
	<button type="button" on:click={() => (showModal = true)}> Give Up </button>
</span>

<Modal bind:showModal bind:dialog>
	<h2> Are you sure you want to give up?</h2>
	<p> A possible shortest path will be highlighted.</p>
	<button type="button" on:click="{makeEvent}"> I'm sure </button>
</Modal>