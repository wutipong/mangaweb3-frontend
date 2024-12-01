<script lang="ts">
	import { page } from '$app/stores';
	import {
		Button,
		Icon,
		Input,
		InputGroup,
		Modal,
		ModalBody,
		ModalFooter,
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

	let first = $state(0);
	let last = $state(0);

	let customOpen = $state(false);
	let customPage = $state(currentPage);

	let pages: number[] = [];
	last = totalPage - 1;
	if (totalPage != 0) {
		const halfCount = Math.floor(pageToShow / 2);

		const startPage = currentPage - halfCount;
		const endPage = startPage + pageToShow;

		for (let i = startPage; i < endPage; i++) {
			if (i < 0 || i >= totalPage) continue;
			pages = [...pages, i];
		}
	}

	let pageNumbers = $derived(pages);

	function gotoPage(i: number) {
		goto(createLink(i));
	}

	function createLink(i: number): URL {
		let url = new URL($page.url);
		url.searchParams.set('page', i.toString());

		return url;
	}
</script>

<Pagination>
	<PaginationItem>
		<PaginationLink first href={createLink(first).toString()} />
	</PaginationItem>

	{#each pageNumbers as i}
		<PaginationItem active={i === currentPage}>
			<PaginationLink href={createLink(i).toString()}>
				{i}
			</PaginationLink>
		</PaginationItem>
	{/each}

	<PaginationItem>
		<PaginationLink onclick={() => (customOpen = true)}>
			<Icon name="hash"></Icon>
		</PaginationLink>
	</PaginationItem>

	<PaginationItem>
		<PaginationLink last href={createLink(last).toString()} />
	</PaginationItem>
</Pagination>

<Modal isOpen={customOpen} toggle={() => (customOpen = !customOpen)}>
	<div class="modal-header">
		<h5 class="modal-title">Go to page</h5>
	</div>
	<ModalBody>
		<InputGroup>
			<Button onclick={() => (customPage = 0)}>0</Button>
			<Input type="number" bind:value={customPage} placeholder="page #" max={totalPage - 1} min={0}
			></Input>
			<Button onclick={() => (customPage = totalPage - 1)}>{totalPage - 1}</Button>
		</InputGroup>
	</ModalBody>
	<ModalFooter>
		<Button onclick={() => gotoPage(customPage)}>
			<Icon name="box-arrow-right"></Icon>&nbsp;Go
		</Button>
	</ModalFooter>
</Modal>
