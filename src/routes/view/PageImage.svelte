<script lang="ts">
	interface Props {
		alt: string;
		src: URL;
	}

	let { alt, src }: Props = $props();

	let img: HTMLImageElement;
	let loading: 'lazy' | 'eager' = $state('lazy');
	let retry = 0;

	export function forceLoad() {
		loading = 'eager';
	}

	function onImageError() {
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
	onerror={() => onImageError()}
	bind:this={img}
/>
