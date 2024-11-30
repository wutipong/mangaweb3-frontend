<script lang="ts">
	import { run } from 'svelte/legacy';

	import { page } from '$app/stores';
	import { Badge, Card, CardBody, CardFooter, CardImg, Icon } from '@sveltestrap/sveltestrap';

	import '$lib/custom.scss';

	interface Props {
		favorite?: boolean;
		isRead?: boolean;
		favoriteTag?: boolean;
		id?: string;
		name?: string;
		page_count?: number;
		access_time?: string;
	}

	let {
		favorite = false,
		isRead = false,
		favoriteTag = false,
		id = '',
		name = '',
		page_count = 0,
		access_time = ''
	}: Props = $props();

	let thumbnailURL = $state('');
	let viewURL = $state('');

	let borderCls = $state('');

	run(() => {
		let u = new URL('/api/browse/thumbnail', $page.url.origin);
		u.searchParams.append('name', name);
		thumbnailURL = u.toString();

		u = new URL('/view', $page.url.origin);
		u.searchParams.append('name', name);
		viewURL = u.toString();

		if (favorite) {
			borderCls = 'border border-2 border-pink';
		} else if (favoriteTag) {
			borderCls = 'border border-2 border-purple';
		} else if (!isRead) {
			borderCls = 'border border-2 border-yellow';
		} else {
			borderCls = '';
		}
	});
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
			<Badge class="bg-purple">
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
