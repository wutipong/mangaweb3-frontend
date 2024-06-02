<script lang="ts">
	import { page } from '$app/stores';
	import { Badge, Card, CardBody, CardFooter, CardImg, Icon } from '@sveltestrap/sveltestrap';

	import '$lib/custom.scss';

	export let favorite = false;
	export let isRead = false;
	export let favoriteTag = false;
	export let id = '';
	export let name = '';
	export let page_count = 0;
	export let access_time = '';

	let thumbnailURL = '';
	let viewURL = '';

	let borderCls = '';

	$: {
		let u = new URL('/api/browse/thumbnail', $page.url.origin);
		u.searchParams.append('name', name);
		thumbnailURL = u.toString();

		u = new URL('/view', $page.url.origin);
		u.searchParams.append('name', name);
		viewURL = u.toString();

		if (favorite || favoriteTag) {
			borderCls = 'border border-2 border-pink';
		} else if (!isRead) {
			borderCls = 'border border-2 border-yellow';
		} else {
			borderCls = '';
		}
	}
</script>

<Card class="{borderCls} h-100" {id}>
	<a href={viewURL}>
		<CardImg top src={thumbnailURL} />
	</a>
	<CardBody>
		<a href={viewURL}>{name}</a>
	</CardBody>
	<CardFooter>
		{Intl.DateTimeFormat('en', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			timeZoneName: 'short'
		}).format(new Date(access_time))}
	</CardFooter>
	<CardFooter>
		{#if favorite}
			<Badge class="bg-pink">
				<span><Icon name="star-fill" /> Favorite </span>
			</Badge>
		{/if}

		{#if favoriteTag}
			<Badge class="bg-pink">
				<span><Icon name="tag" /> Favorite Tag</span>
			</Badge>
		{/if}

		{#if !isRead}
			<Badge class="bg-yellow">
				<span><Icon name="lightning-fill" /> New </span>
			</Badge>
		{:else}
			<Badge>
				<span><Icon name="check" /> Read </span>
			</Badge>
		{/if}
		<Badge class="bg-blue">
			<span><Icon name="file-earmark-fill" /> {page_count}p </span>
		</Badge>
	</CardFooter>
</Card>
