<script lang="ts">
	import { page } from '$app/stores';
	import { variables } from '$lib/variables';
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
	import { goto } from '$app/navigation';
	import { aboutURL, tagURL, browseURL } from '$lib/routes';

	let navbarToggleOpen = false;
	function handleUpdate(event: CustomEvent<boolean>) {
		navbarToggleOpen = event.detail;
	}

	export let version = '';
</script>

<Navbar color="dark" dark expand="md" sticky={'top'}>
	<NavbarBrand href="/">About</NavbarBrand>
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
				<NavLink on:click={() => goto(aboutURL($page.url.origin))}>About</NavLink>
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>

<h1>MangaWeb 3</h1>

<h6>Version {version}</h6>
<p>&copy; Copyright 2021-2023 Wutipong Wongsakuldej.</p>
<p>
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
	associated documentation files (the “Software”), to deal in the Software without restriction,
	including without limitation the rights to use, copy, modify, merge, publish, distribute,
	sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
</p>

<p>
	The above copyright notice and this permission notice shall be included in all copies or
	substantial portions of the Software.
</p>

<p>
	THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
	NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
	OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</p>

<h6>Using API server: {variables.basePath}</h6>

<hr />
<h2>Project Page</h2>
<ul>
	<li>
		<a href="https://github.com/wutipong/mangaweb3-frontend"
			><Icon name="github" />&nbsp; Frontend</a
		>
	</li>
	<li>
		<a href="https://github.com/wutipong/mangaweb3-backtend"><Icon name="github" />&nbsp; Backend</a
		>
	</li>
</ul>
