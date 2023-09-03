<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { browseURL, aboutURL, tagURL } from '$lib/routes';
	import {
		Navbar,
		NavbarBrand,
		NavbarToggler,
		Collapse,
		Nav,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem,
		Icon,
		NavItem,
		NavLink,
		Container,
		Label,
		FormGroup,
		Input,
		Button
	} from 'sveltestrap';
	import type { PageData } from './$types';
	import { variables } from '$lib/variables';
	import Cropper from 'svelte-easy-crop';

	let navbarToggleOpen = false;
	function handleUpdate(event: CustomEvent<boolean>) {
		navbarToggleOpen = event.detail;
	}

	function createImageUrl(name: string, page: number): URL {
		const url = new URL('/view/get_image', variables.basePath);
		if (name != null) {
			url.searchParams.append('name', name);
		}
		url.searchParams.set('i', page.toString());

		return url;
	}

	export let data: PageData;

	$: name = data.name;
	$: index = 0;
	$: image = name != null ? createImageUrl(name, index).toString() : '';
	$: pageCount = data.page_count;

	let crop = { x: 0, y: 0 };
	let zoom = 1;
	let aspect = 148 / 210;

	interface CropDetails {
		x: number;
		y: number;
		width: number;
		height: number;
	}

	interface CropperEvent {
		pixels: CropDetails;
	}

	let cropDetails: CropDetails;

	function onCropComplete(e: CustomEvent<CropperEvent>) {
		cropDetails = e.detail.pixels;
		console.log(cropDetails);
	}
</script>

<Navbar color="dark" dark expand="md" sticky={'top'}>
	<NavbarBrand href="/">Thumbnail Edit</NavbarBrand>
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
					<DropdownItem on:click={() => goto(tagURL($page.url.origin))}>
						<Icon name="tags-fill" class="me-3" />
						Tag list
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>

			<NavItem>
				<NavLink on:click={() => goto(aboutURL($page.url.origin))}>About</NavLink>
			</NavItem>
		</Nav>
		<Nav navbar class="ms-auto">
			<NavItem class="me-3 d-none d-md-block">
				<NavLink>
					{#if name != null}
						{name?.length > 40 ? `${name.substring(0, 35)}...` : name}
					{/if}
				</NavLink>
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>

<Container>
	<div class="my-5" style="position: relative; width:100%; height:500px;">
		<Cropper {image} bind:crop bind:zoom bind:aspect on:cropcomplete={onCropComplete} />
	</div>

	<FormGroup>
		<Label for="pageIndex">Image Index</Label>
		<Input
			type="number"
			name="number"
			id="pageIndex"
			placeholder="pageIndex"
			bind:value={index}
			min="0"
			max={pageCount}
		/>
	</FormGroup>
	<Button>Save</Button>
</Container>
