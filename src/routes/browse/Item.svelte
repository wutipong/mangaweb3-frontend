<script lang="ts">
	import { Badge, Card, CardBody, CardFooter, CardImg, Icon } from '@sveltestrap/sveltestrap';

	import '$lib/custom.scss';

	interface Props {
		favorite?: boolean;
		isRead?: boolean;
		favoriteTag?: boolean;
		id?: string;
		name?: string;
		page_count?: number;
	}

	let {
		favorite = false,
		isRead = false,
		favoriteTag = false,
		id = '',
		name = '',
		page_count = 0
	}: Props = $props();

	let thumbnailURL = $state('');
	let viewURL = $state('');

	let borderCls = $state('');

	$effect(() => {
		let search = new URLSearchParams({'name': name})
		thumbnailURL = `/api/browse/thumbnail?${search}`
		viewURL = `/view?${search}`

		if (favorite) {
			borderCls = 'border border-2 border-pink';
		} else if (!isRead) {
			borderCls = 'border border-2 border-yellow';
		} else if (favoriteTag) {
			borderCls = 'border border-2 border-purple';
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
		{#if favorite}
			<span class="badge bg-pink">
				<span><Icon name="star-fill" /> Favorite </span>
			</span>
		{/if}

		{#if favoriteTag}
			<span class="badge bg-purple">
				<span><Icon name="tag" /> Favorite Tag</span>
			</span>
		{/if}

		{#if !isRead}
			<span class="badge bg-yellow">
				<span><Icon name="lightning-fill" /> New </span>
			</span>
		{:else}
			<span class="badge"> 
				<span><Icon name="check" /> Read </span>
			</span>
		{/if}
		<span class="badge bg-blue">
			<span><Icon name="file-earmark-fill" /> {page_count}p </span>
		</span>
	</CardFooter>
</Card>
