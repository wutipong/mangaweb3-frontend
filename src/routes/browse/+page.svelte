<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import FavoriteButton from '$lib/FavoriteButton.svelte';
	import MoveToTop from '$lib/MoveToTop.svelte';
	import Pagination from '$lib/Pagination.svelte';
	import Toast from '$lib/Toast.svelte';
	import { aboutURL, browseURL, historyURL, tagURL } from '$lib/routes';

	import {
		Button,
		Collapse,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Icon,
		Input,
		InputGroup,
		Nav,
		NavItem,
		NavLink,
		Navbar,
		NavbarBrand,
		NavbarToggler
	} from '@sveltestrap/sveltestrap';
	import type { PageData } from './$types';
	import Item from './Item.svelte';

	let toast: Toast;

	export let data: PageData;

	$: favoriteOnly = data.request.favorite_only;
	$: items = data.response.items;
	$: order = data.request.order;
	$: pageIndex = data.request.page;
	let search = data.request.search;
	$: sort = data.request.sort;
	$: tag = data.request.tag;
	$: tag_favorite = data.response.tag_favorite;
	$: totalPage = data.response.total_page;

	function createBrowseURL(options?: {
		favorite_only?: boolean;
		item_per_page?: number;
		order?: 'ascending' | 'descending';
		page?: number;
		search?: string;
		sort?: 'name' | 'createTime' | 'pageCount';
		tag?: string;
	}): URL {
		let callOptions = data.request;
		if (options != null) {
			const { favorite_only, item_per_page, order, page, search, sort, tag } = options;
			if (favorite_only != null) {
				callOptions.favorite_only = favorite_only;
			}
			if (item_per_page != null) {
				callOptions.item_per_page = item_per_page;
			}
			if (order != null) {
				callOptions.order = order;
			}
			if (page != null) {
				callOptions.page = page;
			}

			if (search != null) {
				callOptions.search = search;
			}

			if (sort != null) {
				callOptions.sort = sort;
			}
			if (tag != null) {
				callOptions.tag = tag;
			}
		}

		return browseURL($page.url.origin, callOptions);
	}

	function createSortBrowseURL(options: {
		favorite_only?: boolean;
		item_per_page?: number;
		order?: 'ascending' | 'descending';
		page?: number;
		search?: string;
		sort?: 'name' | 'createTime' | 'pageCount';
		tag?: string;
	}): URL {
		const sort = options.sort;
		switch (sort) {
			case 'name':
				options.order = 'ascending';
			case 'createTime':
				options.order = 'descending';
			case 'pageCount':
				options.order = 'descending'
		}

		return createBrowseURL(options);
	}

	async function onTagFavorite() {
		const req = {
			favorite: !tag_favorite,
			tag: tag
		};

		const url = new URL('/api/tag/set_favorite', $page.url.origin);

		const resp = await fetch(url, { method: 'POST', body: JSON.stringify(req) });
		const json = await resp.json();

		if (json.favorite) {
			toast.show('Favorite', `The tag "${tag}" is now your favorite.`);
		} else {
			toast.show('Favorite', `The tag "${tag}" is no longer your favorite.`);
		}

		tag_favorite = json.favorite;
	}

	let navbarToggleOpen = false;
	function handleUpdate(event: CustomEvent<boolean>) {
		navbarToggleOpen = event.detail;
	}
</script>

<svelte:head>
	<title>Browse: {tag}</title>
</svelte:head>

<Navbar color="dark" dark expand="md" sticky={'top'}>
	<NavbarBrand href="/">
		{data.request.tag == '' ? 'Browse' : `Browse: ${data.request.tag}`}
	</NavbarBrand>

	<NavbarToggler on:click={() => (navbarToggleOpen = !navbarToggleOpen)} />

	<Collapse isOpen={navbarToggleOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav navbar>
			<Dropdown nav inNavbar>
				<DropdownToggle nav caret>Browse</DropdownToggle>
				<DropdownMenu end>
					<DropdownItem on:click={() => goto(browseURL($page.url.origin))}>
						<Icon name="list-ul" class="me-3" />
						All items
					</DropdownItem>
					<DropdownItem on:click={() => goto(tagURL($page.url.origin))}>
						<Icon name="tags-fill" class="me-3" />
						Tag list
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Dropdown nav inNavbar>
				<DropdownToggle nav caret>Sort By</DropdownToggle>
				<DropdownMenu>
					<DropdownItem
						active={sort == 'name'}
						on:click={() => goto(createSortBrowseURL({ sort: 'name' }))}
					>
						<Icon name="type" class="me-3" /> Name
					</DropdownItem>
					<DropdownItem
						active={sort == 'createTime'}
						on:click={() => goto(createSortBrowseURL({ sort: 'createTime' }))}
					>
						<Icon name="clock" class="me-3" /> Create time
					</DropdownItem>
					<DropdownItem
						active={sort == 'pageCount'}
						on:click={() => goto(createSortBrowseURL({ sort: 'pageCount' }))}
					>
						<Icon name="file-earmark" class="me-3" /> Page count
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem
						active={order == 'ascending'}
						on:click={() => goto(createBrowseURL({ order: 'ascending' }))}
					>
						<Icon name="sort-down-alt" class="me-3" />Ascending
					</DropdownItem>
					<DropdownItem
						active={order == 'descending'}
						on:click={() => goto(createBrowseURL({ order: 'descending' }))}
					>
						<Icon name="sort-up-alt" class="me-3" /> Descending
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Dropdown nav inNavbar>
				<DropdownToggle nav caret>Filter</DropdownToggle>
				<DropdownMenu>
					<DropdownItem
						active={favoriteOnly}
						on:click={() => goto(createBrowseURL({ favorite_only: !favoriteOnly }))}
					>
						<Icon name="star" class="me-3" /> Favorite
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<NavItem>
				<NavLink on:click={() => goto(historyURL($page.url.origin))}>History</NavLink>
			</NavItem>
			<NavItem>
				<NavLink on:click={() => goto(aboutURL($page.url.origin))}>About</NavLink>
			</NavItem>
		</Nav>
		<Nav class="ms-auto me-3" navbar>
			<NavItem hidden={tag == '' ? true : undefined}>
				<FavoriteButton on:click={() => onTagFavorite()} isFavorite={tag_favorite}>
					Favorite tag
				</FavoriteButton>
			</NavItem>
		</Nav>
		<Nav navbar>
			<NavItem>
				<InputGroup>
					<Input
						type="text"
						bind:value={search}
						on:keyup={(e) => {
							if (e.key == 'Enter') {
								goto(browseURL($page.url.origin, { search: search }));
							}
						}}
					/>
					<Button on:click={() => (search = '')}><Icon name="x" /></Button>
					<Button on:click={() => goto(browseURL($page.url.origin, { search: search }))}>
						<div class="d-lg-none"><Icon name="search" class="me-3" /></div>
						<div class="d-none d-lg-block"><Icon name="search" class="me-3" />Search</div>
					</Button>
				</InputGroup>
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>

<div class="container-fluid" style="padding-top:30px;">
	<div class="grid-container">
		<div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-3">
			{#each items as item}
				<div class="col">
					<Item
						favorite={item.favorite}
						isRead={item.read}
						id={item.id.toString()}
						name={item.name}
						page_count={item.page_count}
						favoriteTag={item.tag_favorite}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>
<div style="height: 100px;" />

<div aria-label="Page navigation" class="position-fixed bottom-0 start-50 p-3 translate-middle-x">
	<Pagination currentPage={pageIndex} {totalPage} />
</div>

<Toast bind:this={toast} />

<MoveToTop />
