<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { Icon } from '@sveltestrap/sveltestrap';
	import './custom.scss';

	interface Props {
		isFavorite?: boolean;
		children?: import('svelte').Snippet;
	}

	let { isFavorite = false, children }: Props = $props();
</script>

<button class="btn" class:btn-pink={isFavorite} class:btn-outline-pink={!isFavorite} onclick={bubble('click')}>
	{#if isFavorite}
		<span><Icon name="star-fill" class="me-3" /> {@render children?.()}</span>
	{:else}
		<span><Icon name="star" class="me-3" /> {@render children?.()}</span>
	{/if}
</button>
