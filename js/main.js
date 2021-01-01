import Hello from './Hello.svelte';

const app = new Hello({
	target: document.getElementById('clocks'),
	props: {
		// we'll learn about props later
		answer: 42
	}
});
