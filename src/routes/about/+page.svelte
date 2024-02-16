<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ConfirmDialog from '$lib/ConfirmDialog.svelte';
	import { aboutURL, browseURL, tagURL } from '$lib/routes';
	import { variables } from '$lib/variables';
	import {
		Button,
		Collapse,
		Container,
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
		NavbarToggler,
		Table
	} from 'sveltestrap';
	import Toast from '$lib/Toast.svelte';

	let navbarToggleOpen = false;
	function handleUpdate(event: CustomEvent<boolean>) {
		navbarToggleOpen = event.detail;
	}

	export let version = '';
	let toast: Toast;
	let confirm: ConfirmDialog;

	function confirmRescanLibrary() {
		confirm.show(
			'Rescan Library',
			'The library will be Rescanned. This will take sometime. Do you still wants to perform?',
			rescanLibrary
		);
	}

	async function rescanLibrary() {
		const url = new URL('/api/browse/rescan_library', $page.url.origin);
		await fetch(url);
		toast.show(
			'Re-scan Library',
			'Library re-scanning in progress. Please refresh after a few minutes.'
		);
	}

	function confirmRecreateThumbnails() {
		confirm.show(
			'Recreate Thumbnails',
			'Thumbnails of every items will be recreated. This will take sometime. Do you still wants to perform?',
			recreateThumbnails
		);
	}

	async function recreateThumbnails() {
		const url = new URL('/api/browse/recreate_thumbnails', $page.url.origin);
		await fetch(url);
		toast.show(
			'Re-create thumbnail',
			'Thumbnails recreating in progress. Please refresh after a few minutes.'
		);
	}

	function confirmRecreateTagThumbnails() {
		confirm.show(
			'Recreate Tag Thumbnails',
			'Thumbnails of every tags will be recreated. This will take sometime. Do you still wants to perform?',
			recreateTagThumbnails
		);
	}

	async function recreateTagThumbnails() {
		const url = new URL('/api/tag/recreate_thumbnails', $page.url.origin);
		await fetch(url);
		toast.show(
			'Re-create thumbnail',
			'Thumbnails recreating in progress. Please refresh after a few minutes.'
		);
	}
</script>

<svelte:head>
	<title>About: Mangaweb 3</title>
</svelte:head>

<Navbar color="dark" dark expand="md" sticky={'top'}>
	<NavbarBrand href="/">About</NavbarBrand>
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
	</Collapse>
</Navbar>
<Container>
	<h1>MangaWeb 3</h1>

	<h6>Version {version}</h6>
	<p>&copy; Copyright 2021-2023 Wutipong Wongsakuldej.</p>
	<p>
		Permission is hereby granted, free of charge, to any person obtaining a copy of this software
		and associated documentation files (the “Software”), to deal in the Software without
		restriction, including without limitation the rights to use, copy, modify, merge, publish,
		distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
		Software is furnished to do so, subject to the following conditions:
	</p>

	<p>
		The above copyright notice and this permission notice shall be included in all copies or
		substantial portions of the Software.
	</p>

	<p>
		THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
		BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
		NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	</p>

	<h6>Using API server: {variables.basePath}</h6>

	<hr />
	<h3>Project Page</h3>
	<ul>
		<li>
			<a class="icon-link" href="https://github.com/wutipong/mangaweb3-frontend">
				<Icon name="github" />Frontend
			</a>
		</li>
		<li>
			<a class="icon-link" href="https://github.com/wutipong/mangaweb3-backtend">
				<Icon name="github" />Backend
			</a>
		</li>
	</ul>
	<hr />

	<h3>Maintenance</h3>

	<Table>
		<thead>
			<tr>
				<th colspan="2">
					Maintenance Operations
				</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="align-middle"> Rescan library. </td>
				<td>
					<Button color="danger" on:click={() => confirmRescanLibrary()}>
						<Icon name="play-circle" class="me-3" />Run
					</Button>
				</td>
			</tr>
			<tr>
				<td class="align-middle"> Populate thumbnails on every manga items. </td>
				<td>
					<Button color="danger" on:click={() => confirmRecreateThumbnails()}>
						<Icon name="play-circle" class="me-3" />Run
					</Button>
				</td>
			</tr>
			<tr>
				<td class="align-middle"> Populate thumbnails on every tag items. </td>
				<td>
					<Button color="danger" on:click={confirmRecreateTagThumbnails}>
						<Icon name="play-circle" class="me-3" />Run
					</Button>
				</td>
			</tr>
		</tbody>
	</Table>
</Container>

<ConfirmDialog bind:this={confirm} />

<Toast bind:this={toast} />
