<script lang="ts">
	import { variables } from '$lib/variables';
	import FavoriteButton from '$lib/FavoriteButton.svelte';
	import ImageViewer from './ImageViewer.svelte';
	import PageScroll from './PageScroll.svelte';
	import Toast from '$lib/Toast.svelte';
	import { onMount } from 'svelte';
	import {
		Icon,
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem,
		Button
	} from 'sveltestrap';
	import { page } from '$app/stores';
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { aboutURL, browseURL } from '$lib/routes';
	import type { Tag } from '$lib/tag';

	let current = 0;
	let viewer: ImageViewer;
	let toast: Toast;

	interface Request {
		name: string;
	}

	interface Response {
		browse_url: string;
		favorite: boolean;
		page_count: number;
		tags: Tag[];
	}

	let request: Request = {
		name: ''
	};

	let response: Response = {
		browse_url: '',
		favorite: false,
		page_count: 0,
		tags: []
	};

	onMount(async () => {
		const params = $page.url.searchParams;
		if (params.has('name')) {
			request.name = params.get('name') as string;
		}

		const url = new URL('/view', variables.basePath);
		const resp = await fetch(url, { method: 'POST', body: JSON.stringify(request) });
		response = await resp.json();
	});

	function createImageUrls(name: string, pageCount: number): string[] {
		const url = new URL('/view/get_image', variables.basePath);
		const output = [];

		url.searchParams.append('name', name);
		for (let i = 0; i < pageCount; i++) {
			url.searchParams.set('i', i.toString());
			output.push(url.toString());
		}

		return output;
	}

	function downloadManga() {
		const url = new URL('/view/download', variables.basePath);
		url.searchParams.set('name', request.name);

		download(url.toString());
	}

	function downloadPage() {
		const url = new URL('/view/get_image', variables.basePath);
		url.searchParams.set('name', request.name);
		url.searchParams.set('i', current.toString());

		download(url.toString());
	}

	async function toggleFavorite() {
		const req = {
			favorite: !response.favorite,
			name: request.name
		};

		const url = new URL('/view/set_favorite', variables.basePath);

		const resp = await fetch(url, { method: 'POST', body: JSON.stringify(req) });
		const json = await resp.json();

		if (json.favorite) {
			toast.show('Favorite', 'The current manga is now your favorite.');
		} else {
			toast.show('Favorite', 'The current manga is no longer your favorite.');
		}

		response.favorite = json.favorite;
	}

	async function updateCover() {
		const url = new URL('/view/update_cover', variables.basePath);
		const req = {
			index: current,
			name: request.name
		};

		const resp = await fetch(url, { method: 'POST', body: JSON.stringify(req) });
		const json = await resp.json();
		if (json.success) {
			toast.show('Update Cover', 'The cover image is updated successfully.');
		} else {
			toast.show('Update Cover', 'The cover is not updated.');
		}
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

	let navbarToggleOpen = false;
	function handleUpdate(event: CustomEvent<boolean>) {
		navbarToggleOpen = event.detail;
	}

	let previousPage: string = base;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
</script>

<PageScroll PageCount={response.page_count} {onValueChange} Current={current} />

<div class="fullscreen" style="padding-top:80px;">
	<ImageViewer
		imageURLs={createImageUrls(request.name, response.page_count)}
		{onIndexChange}
		bind:this={viewer}
	/>
</div>

<Navbar color="dark" dark expand="md" sticky={'top'}>
	<NavbarBrand href="/">{`View ${request.name}`}</NavbarBrand>
	<NavbarToggler on:click={() => (navbarToggleOpen = !navbarToggleOpen)} />
	<Collapse isOpen={navbarToggleOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav navbar>
			<Dropdown nav inNavbar>
				<DropdownToggle nav caret>Browse</DropdownToggle>
				<DropdownMenu>
					<DropdownItem on:click={() => goto(browseURL($page.url.origin))}>
						<Icon name="list-ul" class="me-3" />
						All items
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem header>Tags</DropdownItem>
					{#each response.tags as tag}
						<DropdownItem on:click={() => goto(browseURL($page.url.origin, { tag: tag.name }))}>
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
					<DropdownItem on:click={() => downloadPage()}>
						<Icon name="download" class="me-3" />
						Download Current Page
					</DropdownItem>
					<DropdownItem on:click={() => downloadManga()}>
						<Icon name="download" class="me-3" />
						Download Manga
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem on:click={() => updateCover()}>
						<Icon name="journal-arrow-up" class="me-3" />
						Replace Cover
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<NavItem>
				<NavLink on:click={() => goto(aboutURL($page.url.origin))}>About</NavLink>
			</NavItem>
		</Nav>
		<Nav class="ms-auto" navbar>
			<NavItem class="me-3">
				<FavoriteButton on:click={() => toggleFavorite()} isFavorite={response.favorite}>
					Favorite
				</FavoriteButton>
			</NavItem>
			<NavItem>
				<Button on:click={() => goto(previousPage)} color="danger">
					<Icon name="x-circle" class=" me-3" /> Close
				</Button>
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>

<Toast bind:this={toast} />
