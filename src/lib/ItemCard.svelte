<script lang="ts">
	import { Card, CardBody, CardFooter, Icon } from '@sveltestrap/sveltestrap';

	import '$lib/custom.scss';

	interface Props {
		favorite?: boolean;
		isRead?: boolean;
		favoriteTag?: boolean;
		id?: string | number;
		name?: string;
		pageCount?: number;
		itemCount?: number;
		linkUrl?: string | URL;
		imageUrl?: string | URL;
		accessTime?: number | string | Date;
		placeholder?: boolean;
	}

	const ERROR_IMAGE = `data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" fill="yellow" class="bi bi-exclamation-triangle-fill" viewBox="-8 -8 32 32">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
    </svg>`;

	const PLACEHOLDER_IMAGE = `data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" fill="gray" class="bi bi-file-minus" viewBox="-8 -8 32 32">
        <path d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5"/>
        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
    </svg>
    `;

	let {
		favorite = false,
		isRead = false,
		favoriteTag = false,
		id = '',
		name = '',
		pageCount,
		itemCount,
		linkUrl,
		imageUrl = PLACEHOLDER_IMAGE,
		accessTime = '',
		placeholder
	}: Props = $props();

	let borderCls = $state('');

	if (placeholder) {
		borderCls = '';
	} else if (favorite) {
		borderCls = 'border border-2 border-pink';
	} else if (!isRead) {
		borderCls = 'border border-2 border-yellow';
	} else if (favoriteTag) {
		borderCls = 'border border-2 border-purple';
	} else {
		borderCls = '';
	}

	let img: HTMLImageElement | undefined = $state();
	function onImageError() {
		if (img) img.src = ERROR_IMAGE;
	}
</script>

<Card class="{borderCls} h-100" id={id.toString()}>
	{#if placeholder}
		<div aria-label={name} style="display:block; aspect-ratio: 1/1.414">
			<img
				bind:this={img}
				class="card-img-top h-100"
				alt={name}
				loading="lazy"
				src={imageUrl.toString()}
				style="object-fit: cover;"
				onerror={() => onImageError()}
			/>
		</div>
	{:else}
		<a href={linkUrl?.toString()} aria-label={name} style="display:block; aspect-ratio: 1/1.414">
			<img
				bind:this={img}
				class="card-img-top h-100"
				alt={name}
				loading="lazy"
				src={imageUrl.toString()}
				style="object-fit: cover;"
				onerror={() => onImageError()}
			/>
		</a>
	{/if}
	<CardBody style="height: 8em; overflow:hidden;">
		<a href={placeholder == true ? '' : linkUrl?.toString()}>{name}</a>
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
	<CardFooter style="height: 3em; overflow:hidden;">
		{#if !placeholder}
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
		{/if}
	</CardFooter>
</Card>
