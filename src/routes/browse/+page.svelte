<script lang="ts">
	import { afterNavigate, beforeNavigate, goto, onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import FavoriteButton from '$lib/FavoriteButton.svelte';
	import MoveToTop from '$lib/MoveToTop.svelte';
	import Pagination from '$lib/Pagination.svelte';
	import Toast from '$lib/Toast.svelte';
	import { aboutURL, browseURL, historyURL, tagURL, viewURL } from '$lib/routes';

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
	import ItemCard from '$lib/ItemCard.svelte';
	import { ITEM_PER_PAGE } from '$lib/constants';
	import PlaceholderCard from '$lib/PlaceholderCard.svelte';
	import LoadingDialog from '$lib/LoadingDialog.svelte';

	let toast: Toast;

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let filter = $derived(data.request.filter);
	let items = $derived(data.response.items);
	let order = $derived(data.request.order);
	let pageIndex = $derived(data.request.page);
	let search = $state(data.request.search);
	let sort = $derived(data.request.sort);
	let tag = $derived(data.request.tag);
	let tag_favorite = $state(data.response.tag_favorite);

	let totalPage = $derived(data.response.total_page);

	let updated = $state(false);

	beforeNavigate(() => (updated = false));
	afterNavigate(() => (updated = true));

	function createBrowseURL(options?: {
		filter?: '' | 'favorite' | 'tag';
		item_per_page?: number;
		order?: 'ascending' | 'descending';
		page?: number;
		search?: string;
		sort?: 'name' | 'createTime' | 'pageCount';
		tag?: string;
	}): URL {
		let callOptions = data.request;
		if (options != null) {
			const { filter, item_per_page, order, page, search, sort, tag } = options;
			if (filter != null) {
				callOptions.filter = filter;
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

		return browseURL(page.url.origin, callOptions);
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
				options.order = 'descending';
		}

		return createBrowseURL(options);
	}

	async function onTagFavorite() {
		const req = {
			user: data.request.user,
			favorite: !tag_favorite,
			tag: tag
		};

		const url = new URL('/api/tag/set_favorite', page.url.origin);

		const resp = await fetch(url, { method: 'POST', body: JSON.stringify(req) });
		const json = await resp.json();

		if (json.favorite) {
			toast.show('Favorite', `The tag "${tag}" is now your favorite.`);
		} else {
			toast.show('Favorite', `The tag "${tag}" is no longer your favorite.`);
		}

		tag_favorite = json.favorite;
	}

	let navbarToggleOpen = $state(false);
	function handleUpdate(event: CustomEvent<boolean>) {
		navbarToggleOpen = event.detail;
	}

	function createThumbnailUrl(name: string): URL {
		const u = new URL('/browse/thumbnail', page.url);
		u.searchParams.set('name', name);

		return u;
	}
</script>

<svelte:head>
	<title>Browse: {tag}</title>
</svelte:head>

<Navbar color="dark" dark expand="md" sticky={'top'}>
	<NavbarBrand href="/">
		{data.request.tag == '' ? 'Browse' : `Browse: ${data.request.tag}`}
	</NavbarBrand>

	<NavbarToggler onclick={() => (navbarToggleOpen = !navbarToggleOpen)} />

	<Collapse isOpen={navbarToggleOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav navbar>
			<Dropdown nav inNavbar>
				<DropdownToggle nav caret>Browse</DropdownToggle>
				<DropdownMenu end>
					<DropdownItem onclick={() => goto(browseURL(page.url.origin))}>
						<Icon name="list-ul" class="me-3" />
						All items
					</DropdownItem>
					<DropdownItem onclick={() => goto(tagURL(page.url.origin))}>
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
						onclick={() => goto(createSortBrowseURL({ sort: 'name' }))}
					>
						<Icon name="type" class="me-3" /> Name
					</DropdownItem>
					<DropdownItem
						active={sort == 'createTime'}
						onclick={() => goto(createSortBrowseURL({ sort: 'createTime' }))}
					>
						<Icon name="clock" class="me-3" /> Create time
					</DropdownItem>
					<DropdownItem
						active={sort == 'pageCount'}
						onclick={() => goto(createSortBrowseURL({ sort: 'pageCount' }))}
					>
						<Icon name="file-earmark" class="me-3" /> Page count
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem
						active={order == 'ascending'}
						onclick={() => goto(createBrowseURL({ order: 'ascending' }))}
					>
						<Icon name="sort-down-alt" class="me-3" />Ascending
					</DropdownItem>
					<DropdownItem
						active={order == 'descending'}
						onclick={() => goto(createBrowseURL({ order: 'descending' }))}
					>
						<Icon name="sort-up-alt" class="me-3" /> Descending
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Dropdown nav inNavbar>
				<DropdownToggle nav caret>
					{#if filter != ''}
						<Icon name="check" class="me-1" />
					{:else}
						<Icon name="funnel" class="me-1" />
					{/if} Filter
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem
						active={filter == 'favorite'}
						onclick={() => goto(createBrowseURL({ filter: 'favorite' }))}
					>
						<Icon name="star" class="me-3" /> Favorite items
					</DropdownItem>
					<DropdownItem
						active={filter == 'tag'}
						disabled={tag != ''}
						onclick={() => goto(createBrowseURL({ filter: 'tag' }))}
					>
						<Icon name="tag-fill" class="me-3" /> Items with favorite Tags
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem onclick={() => goto(createBrowseURL({ filter: '' }))}
						><Icon name="x-circle-fill" class="me-3" /> Clear</DropdownItem
					>
				</DropdownMenu>
			</Dropdown>
			<NavItem>
				<NavLink onclick={() => goto(historyURL(page.url.origin))}>History</NavLink>
			</NavItem>
			<NavItem>
				<NavLink onclick={() => goto(aboutURL(page.url.origin))}>About</NavLink>
			</NavItem>
		</Nav>
		<Nav class="ms-auto me-3" navbar>
			<NavItem hidden={tag == '' ? true : undefined}>
				<FavoriteButton onclick={() => onTagFavorite()} isFavorite={tag_favorite}>
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
						onkeyup={(e) => {
							if (e.key == 'Enter') {
								goto(browseURL(page.url.origin, { search: search }));
							}
						}}
					/>
					<Button onclick={() => (search = '')}><Icon name="x" /></Button>
					<Button onclick={() => goto(browseURL(page.url.origin, { search: search }))}>
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
			{#if !updated}
				{#each { length: ITEM_PER_PAGE } as _}
					<div class="col">
						<PlaceholderCard />
					</div>
				{/each}
			{:else}
				{#each items as item}
					<div class="col">
						<ItemCard
							favorite={item.favorite}
							isRead={item.read}
							id={item.id}
							name={item.name}
							pageCount={item.page_count}
							favoriteTag={item.tag_favorite}
							imageUrl={createThumbnailUrl(item.name)}
							linkUrl={viewURL(page.url, item.name)}
						/>
					</div>
				{/each}
				{#each { length: ITEM_PER_PAGE - items.length } as _, i}
					<div class="col">
						<ItemCard placeholder={true} />
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

{#if !updated}
	<LoadingDialog />
{/if}

<div style="height: 100px;"></div>

<div aria-label="Page navigation" class="position-fixed bottom-0 start-50 p-3 translate-middle-x">
	<Pagination currentPage={pageIndex} {totalPage} />
</div>

<Toast bind:this={toast} />

<MoveToTop />
