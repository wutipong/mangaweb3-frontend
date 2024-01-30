<script lang="ts">
	export let alt: string;
	export let src: URL;

	let img: HTMLImageElement;
	let loading: 'lazy' | 'eager' = 'lazy';
	let retry = 0;

	export function forceLoad() {
		loading = 'eager';
	}

	function onImageEror() {
		setTimeout(() => {
			let url = new URL(src);
			url.searchParams.append('retry', retry.toString());

			img.src = url.toString();
			retry++;
		}, 500);
	}
</script>

<img
	class="ms-auto me-auto"
	{loading}
	{alt}
	src={src.toString()}
	style="object-fit:contain;max-width:100%;max-height:100%"
	on:error={() => onImageEror()}
	bind:this={img}
/>
