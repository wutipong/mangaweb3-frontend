<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { browseURL, aboutURL, tagURL, historyURL } from '$lib/routes';
	import {
		Button,
		Collapse,
		Container,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		FormGroup,
		Icon,
		Input,
		Label,
		Nav,
		Navbar,
		NavbarBrand,
		NavbarToggler,
		NavItem,
		NavLink
	} from '@sveltestrap/sveltestrap';

	import Cropper, { type CropArea, type OnCropCompleteEvent } from 'svelte-easy-crop';
	import MessageDialog from '$lib/MessageDialog.svelte';

	let navbarToggleOpen = $state(false);
	function handleUpdate(event: CustomEvent<boolean>) {
		navbarToggleOpen = event.detail;
	}

	function createImageUrl(name: string, page: number, base: string | URL): URL {
		const url = new URL('/view/page_image', base);
		if (name != null) {
			url.searchParams.append('name', name);
		}
		url.searchParams.set('i', page.toString());

		return url;
	}

	let { data } = $props();

	let name = $derived(data.name);
	let index = $state(0);
	const image = $derived(name != null ? createImageUrl(name, index, page.url).toString() : '');
	let pageCount = $derived(data.page_count);

	let crop = $state({ x: 0, y: 0 });
	let zoom = $state(1);
	let aspect = $state(127 / 180);

	let cropDetails: CropArea;

	function onCropComplete(e: OnCropCompleteEvent) {
		cropDetails = e.pixels;
	}

	let dialog: MessageDialog;
	async function updateCover() {
		const url = new URL('/view/update_cover', page.url.origin);

		url.searchParams.set('i', index.toString());
		url.searchParams.set('x', cropDetails.x.toString());
		url.searchParams.set('y', cropDetails.y.toString());
		url.searchParams.set('w', cropDetails.width.toString());
		url.searchParams.set('h', cropDetails.height.toString());
		url.searchParams.set('name', name ?? '');

		const resp = await fetch(url, { method: 'GET' });
		const json = await resp.json();

		if (json.success) {
			dialog.show('Update Cover', 'The cover image is updated successfully.');
		} else {
			dialog.show('Update Cover', 'The cover is not updated.');
		}
	}
</script>

<Navbar color="dark" dark expand="md" sticky={'top'}>
	<NavbarBrand href="/">Thumbnail Edit</NavbarBrand>
	<NavbarToggler onclick={() => (navbarToggleOpen = !navbarToggleOpen)} />
	<Collapse isOpen={navbarToggleOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav navbar>
			<Dropdown nav inNavbar>
				<DropdownToggle nav caret>Browse</DropdownToggle>
				<DropdownMenu>
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
			<NavItem>
				<NavLink onclick={() => goto(historyURL(page.url.origin))}>History</NavLink>
			</NavItem>
			<NavItem>
				<NavLink onclick={() => goto(aboutURL(page.url.origin))}>About</NavLink>
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
		<Cropper {image} bind:crop bind:zoom {aspect} oncropcomplete={onCropComplete} />
	</div>

	<FormGroup>
		<Label for="pageIndex">Page</Label>
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
	<Button onclick={() => updateCover()}>Save</Button>
</Container>

<MessageDialog bind:this={dialog}></MessageDialog>
