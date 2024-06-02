<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import MoveToTop from '$lib/MoveToTop.svelte';
	import Pagination from '$lib/Pagination.svelte';
	import Toast from '$lib/Toast.svelte';
	import { aboutURL, browseURL, historyURL, tagURL } from '$lib/routes';

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
	import Item from './Item.svelte';

	let toast: Toast;

	export let data: PageData;

	$: items = data.response.items;
	$: pageIndex = data.request.page;
	$: totalPage = data.response.total_page;

	let navbarToggleOpen = false;
	function handleUpdate(event: CustomEvent<boolean>) {
		navbarToggleOpen = event.detail;
	}
</script>

<svelte:head>
	<title>History</title>
</svelte:head>

<Navbar color="dark" dark expand="md" sticky={'top'}>
	<NavbarBrand href="/">History</NavbarBrand>

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

			<NavItem>
				<NavLink on:click={() => goto(historyURL($page.url.origin))}>History</NavLink>
			</NavItem>

			<NavItem>
				<NavLink on:click={() => goto(aboutURL($page.url.origin))}>About</NavLink>
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
						access_time={item.access_time}
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
