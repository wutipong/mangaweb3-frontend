<script lang="ts">
	import { page } from '$app/stores';
	import Item from './Item.svelte';
	import type { PageData } from './$types';
	import MoveToTop from '$lib/MoveToTop.svelte';
	import {
		Container,
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
		DropdownItem
	} from 'sveltestrap';
	import Pagination from '$lib/Pagination.svelte';
	import { goto } from '$app/navigation';
	import { aboutURL, tagURL, browseURL } from '$lib/routes';

	export let data: PageData;

	$: current_page = data.page;
	$: tags = data.tags;
	$: total_page = data.total_page;

	$: favoriteOnly = data.request.favorite_only;
	let navbarToggleOpen = false;

	function handleUpdate(event: CustomEvent<boolean>) {
		navbarToggleOpen = event.detail;
	}
</script>

<svelte:head>
	<title>Tag List</title>
</svelte:head>

<Navbar color="dark" dark expand="md" sticky={'top'}>
	<NavbarBrand href="/">{`Tag list`}</NavbarBrand>
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
				<DropdownToggle nav caret>Filter</DropdownToggle>
				<DropdownMenu>
					<DropdownItem
						active={favoriteOnly}
						on:click={() => goto(tagURL($page.url, { favorite_only: !favoriteOnly }))}
					>
						<Icon name="star" class="me-3" />
						Favorite
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<NavItem>
				<NavLink on:click={() => goto(aboutURL($page.url.origin))}>About</NavLink>
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>

<Container fluid style="padding-top:30px;">
	<div class="grid-container">
		<div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-3">
			{#each tags as tag}
				{#if !favoriteOnly || (favoriteOnly && tag.favorite)}
					<div class="col">
						<Item {tag} />
					</div>
				{/if}
			{/each}
		</div>
	</div>
</Container>

<div aria-label="Page navigation" class="position-fixed bottom-0 start-50 p-3 translate-middle-x">
	<Pagination bind:currentPage={current_page} bind:totalPage={total_page} />
</div>

<MoveToTop />
