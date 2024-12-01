<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import FavoriteButton from '$lib/FavoriteButton.svelte';
	import Toast from '$lib/Toast.svelte';
	import { aboutURL, browseURL, historyURL } from '$lib/routes';

	import {
		Collapse,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Icon,
		Nav,
		NavItem,
		NavLink,
		Navbar,
		NavbarBrand,
		NavbarToggler
	} from '@sveltestrap/sveltestrap';
	
	import type { PageData } from './$types';
	import ImageViewer from './ImageViewer.svelte';
	import PageScroll from './PageScroll.svelte';

	let current = $state(0);
	let viewer: ImageViewer;
	let toast: Toast;

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let name = $derived(data.request.name);
	let pageCount = $derived(data.response.page_count);
	let tags = $derived(data.response.tags);
	let favorite = $state(data.response.favorite);

	function createImageUrls(name: string, pageCount: number): string[] {
		const url = new URL('/api/view/get_image', $page.url.origin);
		const output = [];

		url.searchParams.append('name', name);
		for (let i = 0; i < pageCount; i++) {
			url.searchParams.set('i', i.toString());
			output.push(url.toString());
		}

		return output;
	}

	function downloadManga() {
		const url = new URL('/api/view/download', $page.url.origin);
		url.searchParams.set('name', name);

		download(url.toString());
	}

	function downloadPage() {
		const url = new URL('/api/view/get_image', $page.url.origin);
		url.searchParams.set('name', name);
		url.searchParams.set('i', current.toString());

		download(url.toString());
	}

	async function toggleFavorite() {
		const req = {
			favorite: !favorite,
			name: name,
			user: data.request.user
		};

		const url = new URL('/api/view/set_favorite', $page.url.origin);

		const resp = await fetch(url, { method: 'POST', body: JSON.stringify(req) });
		const json = await resp.json();

		console.log(json)

		if (json.favorite) {
			toast.show('Favorite', 'The current manga is now your favorite.');
		} else {
			toast.show('Favorite', 'The current manga is no longer your favorite.');
		}

		favorite = json.favorite;
	}

	async function fixMetaData() {
		const url = new URL('/api/view/fix_meta', $page.url.origin);
		const req = {
			name: name
		};

		const resp = await fetch(url, { method: 'POST', body: JSON.stringify(req) });
		const json = await resp.json();
		if (json.success) {
			toast.show('Fix metadata', 'The metadata has been updated.');
			invalidateAll();
		} else {
			toast.show('Fix metadata', 'The metadata updates fails.');
		}
	}

	async function updateCover() {
		const url = new URL('/view/thumb_edit', $page.url.origin);
		url.searchParams.set('index', `${current}`);
		url.searchParams.set('name', name);

		goto(url);
	}

	function download(url: string) {
		let link = document.createElement('a');
		link.setAttribute('download', '');
		link.href = url;
		document.body.appendChild(link);

		link.click();
		link.remove();
	}

	function onIndexChange(i: number) {
		current = i;
	}

	function onValueChange(n: number) {
		viewer.advance(n);
	}

	let navbarToggleOpen = $state(false);
	function handleUpdate(event: CustomEvent<boolean>) {
		navbarToggleOpen = event.detail;
	}
</script>

<svelte:head>
	<title>View: {name}</title>
</svelte:head>

<PageScroll PageCount={pageCount} {onValueChange} Current={current} />

<div class="fullscreen" style="padding-top:80px;">
	<ImageViewer imageURLs={createImageUrls(name, pageCount)} {onIndexChange} bind:this={viewer} />
</div>

<Navbar color="dark" dark expand="md" sticky={'top'}>
	<NavbarBrand href="/">View</NavbarBrand>
	<NavbarToggler onclick={() => (navbarToggleOpen = !navbarToggleOpen)} />
	<Collapse isOpen={navbarToggleOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav navbar>
			<Dropdown nav inNavbar>
				<DropdownToggle nav caret>Browse</DropdownToggle>
				<DropdownMenu>
					<DropdownItem onclick={() => goto(browseURL($page.url.origin))}>
						<Icon name="list-ul" class="me-3" />
						All items
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem header>Tags</DropdownItem>
					{#each tags as tag}
						<DropdownItem onclick={() => goto(browseURL($page.url.origin, { tag: tag.name }))}>
							{#if tag.favorite}
								<Icon name="star-fill" class="me-3" />
							{:else}
								<Icon name="tag" class="me-3" />
							{/if}
							{tag.name}
						</DropdownItem>
					{/each}
				</DropdownMenu>
			</Dropdown>
			<Dropdown nav inNavbar>
				<DropdownToggle nav caret>Tools</DropdownToggle>
				<DropdownMenu>
					<DropdownItem header>Download</DropdownItem>
					<DropdownItem onclick={() => downloadPage()}>
						<Icon name="download" class="me-3" />
						Download Current Page
					</DropdownItem>
					<DropdownItem onclick={() => downloadManga()}>
						<Icon name="download" class="me-3" />
						Download Manga
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem header>Maintenance</DropdownItem>
					<DropdownItem onclick={() => updateCover()}>
						<Icon name="journal-arrow-up" class="me-3" />
						Replace Cover
					</DropdownItem>
					<DropdownItem onclick={() => fixMetaData()}>
						<Icon name="tools" class="me-3" />
						Fix the manga
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<NavItem>
				<NavLink onclick={() => goto(historyURL($page.url.origin))}>History</NavLink>
			</NavItem>
			<NavItem>
				<NavLink onclick={() => goto(aboutURL($page.url.origin))}>About</NavLink>
			</NavItem>
		</Nav>
		<Nav navbar class="ms-auto">
			<NavItem class="me-3 d-none d-md-block">
				<NavLink>{name.length > 40 ? `${name.substring(0, 35)}...` : name}</NavLink>
			</NavItem>
			<NavItem class="me-3">
				<FavoriteButton onclick={() => toggleFavorite()} isFavorite={favorite}>
					Favorite
				</FavoriteButton>
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>

<Toast bind:this={toast} />
