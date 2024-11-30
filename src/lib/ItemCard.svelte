<script lang="ts">
	import { Card, CardBody, CardFooter, CardImg, Icon, Image } from '@sveltestrap/sveltestrap';

	import '$lib/custom.scss';

	interface Props {
		favorite?: boolean;
		isRead?: boolean;
		favoriteTag?: boolean;
		id?: string | number;
		name?: string;
		pageCount?: number;
		itemCount?: number;
		linkUrl: string | URL;
		imageUrl: string | URL;
		accessTime?: number | string | Date;
	}

	let {
		favorite = false,
		isRead = false,
		favoriteTag = false,
		id = '',
		name = '',
		pageCount,
		itemCount,
		linkUrl,
		imageUrl,
		accessTime = ''
	}: Props = $props();

	let borderCls = $state('');

	$effect(() => {
		if (favorite) {
			borderCls = 'border border-2 border-pink';
		} else if (!isRead) {
			borderCls = 'border border-2 border-yellow';
		} else if (favoriteTag) {
			borderCls = 'border border-2 border-purple';
		} else {
			borderCls = '';
		}

		$inspect(imageUrl);
	});
</script>

<Card class="{borderCls} h-100" id={id.toString()}>
	<a href={linkUrl.toString()}>
		<Image
			class="card-img-top"
			loading="lazy"
			src={imageUrl.toString()}
			style="height: 300px; object-fit: cover;"
		></Image>
	</a>
	<CardBody style="height: 200px; overflow:hidden;">
		<a href={linkUrl.toString()}>{name}</a>
	</CardBody>
	{#if accessTime != ''}
		<CardFooter style="height: 4em; overflow:hidden;">
			{Intl.DateTimeFormat('en', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric',
				timeZoneName: 'short'
			}).format(new Date(accessTime))}
		</CardFooter>
	{/if}
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
		{#if pageCount}
			<span class="badge bg-blue">
				<span><Icon name="file-earmark-fill" /> {pageCount}p </span>
			</span>
		{/if}
		{#if itemCount}
			<span class="badge bg-blue">
				<span><Icon name="journals" /> {itemCount}</span>
			</span>
		{/if}
	</CardFooter>
</Card>
