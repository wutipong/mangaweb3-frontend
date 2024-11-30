<script lang="ts">
	import { run } from 'svelte/legacy';

	import { page } from '$app/stores';
	import {
		Button,
		Icon, Input, InputGroup,
		Modal, ModalBody, ModalFooter,
		ModalHeader,
		Pagination,
		PaginationItem,
		PaginationLink
	} from '@sveltestrap/sveltestrap';
	import { goto } from '$app/navigation';

	interface Props {
		currentPage?: number;
		totalPage?: number;
		pageToShow?: number;
	}

	let { currentPage = 0, totalPage = 1, pageToShow = 5 }: Props = $props();

	interface Page {
		url: URL;
		index: number;
	}

	let numberUrls: Page[] = $state([]);
	let firstUrl: URL = $state();
	let lastUrl: URL = $state();

	let customOpen = $state(false);
	let customPage = $state(currentPage);

	run(() => {
		if (totalPage != 0) {
			firstUrl = new URL($page.url);
			firstUrl.searchParams.set('page', '0');

			lastUrl = new URL($page.url);
			lastUrl.searchParams.set('page', (totalPage - 1).toString());

			let halfCount = Math.floor(pageToShow / 2);

			const startPage = currentPage - halfCount;
			const endPage = startPage + pageToShow;

			let items: Page[] = [];
			for (let i = startPage; i < endPage; i++) {
				if (i < 0 || i >= totalPage) continue;

				const url = new URL($page.url);
				url.searchParams.set('page', `${i}`);

				items = [
					...items,
					{
						url: url,
						index: i
					}
				];
			}
			numberUrls = items;
		}
	});

	function gotoPage(i: number) {
		let url = new URL($page.url);
		url.searchParams.set('page', i.toString());

		goto(url);
	}
</script>

<Pagination>
	<PaginationItem>
		<PaginationLink first href={firstUrl?.toString()} />
	</PaginationItem>

	{#each numberUrls as u}
		<PaginationItem active={u.index === currentPage}>
			<PaginationLink href={u.url.toString()}>
				{u.index}
			</PaginationLink>
		</PaginationItem>
	{/each}

	<PaginationItem>
		<PaginationLink on:click={()=>customOpen=true}>
			<Icon name="hash"></Icon>
		</PaginationLink>
	</PaginationItem>

	<PaginationItem>
		<PaginationLink last href={lastUrl?.toString()} />
	</PaginationItem>
</Pagination>

<Modal isOpen={customOpen} toggle={()=>customOpen = !customOpen}>
	<ModalHeader>Go to page</ModalHeader>
	<ModalBody>
		<InputGroup>
			<Button on:click={()=>customPage=0}>0</Button>
			<Input type="number" bind:value={customPage} placeholder="page #" max={totalPage - 1} min="0"></Input>
			<Button on:click={()=>customPage=(totalPage-1)}>{totalPage - 1}</Button>
		</InputGroup>
	</ModalBody>
	<ModalFooter>
		<Button on:click={()=>gotoPage(customPage)}>
			<Icon name="box-arrow-right"></Icon>&nbsp;Go
		</Button>
	</ModalFooter>
</Modal>
