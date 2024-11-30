<script lang="ts">
	import { Badge, Card, CardBody, CardFooter, CardImg, Icon } from '@sveltestrap/sveltestrap';
	import type { Tag } from '$lib/tag';
	import { page } from '$app/stores';

	interface Props {
		tag: Tag;
	}

	let { tag }: Props = $props();

	function createClassStr(fav: boolean) {
		if (fav) {
			return 'border border-pink';
		}
		return '';
	}

	function createBrowseURL(name: string) {
		const output = new URL('/browse', $page.url.origin);
		output.searchParams.append('tag', name);

		return output;
	}

	function createThumbnailUrl(name: string) {
		const output = new URL('/api/tag/thumbnail', $page.url.origin);
		output.searchParams.append('tag', name);

		return output;
	}
</script>

<Card class="{createClassStr(tag.favorite)} h-100">
	<a href={createBrowseURL(tag.name).toString()}>
		<CardImg top src={createThumbnailUrl(tag.name).toString()} />
	</a>
	<CardBody>
		<a href={createBrowseURL(tag.name).toString()}>{tag.name}</a>
	</CardBody>
	<CardFooter>
		{#if tag.favorite}
			<Badge class="bg-pink">
				<span><Icon name="star-fill" /> Favorite </span>
			</Badge>
		{:else}
			<Badge>
				<span><Icon name="tag" /> </span>
			</Badge>
		{/if}
		<Badge>
			<span><Icon name="journals"/> {tag.item_count}</span>
		</Badge>
	</CardFooter>
</Card>
