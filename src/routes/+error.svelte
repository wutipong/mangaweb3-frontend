<script lang="ts">
import { page } from '$app/state'
import { goto } from '$app/navigation';
import {
    Alert,
		Collapse,
    Container,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Icon,
		Modal,
		Nav,
		NavItem,
		NavLink,
		Navbar,
		NavbarBrand,
		NavbarToggler,
		Table
	} from '@sveltestrap/sveltestrap';
  import { aboutURL, browseURL, historyURL, tagURL, viewURL } from '$lib/routes';

  let navbarToggleOpen = $state(false);
	function handleUpdate(event: CustomEvent<boolean>) {
		navbarToggleOpen = event.detail;
	}

</script>


<Navbar color="dark" dark expand="md" sticky={'top'}>
	<NavbarBrand>Error</NavbarBrand>
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
				<NavLink onclick={()=>window.location.reload()}><Icon name="arrow-clockwise"/>&nbsp;Reload</NavLink>
			</NavItem>
			<NavItem>
				<NavLink onclick={() => goto(aboutURL(page.url.origin))}>About</NavLink>
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>
<Container class="mt-3">
<Alert color="danger" heading="Something went wrong">
    <b>Status {page.status}</b>
    {page.error.message??""}
</Alert>
</Container>