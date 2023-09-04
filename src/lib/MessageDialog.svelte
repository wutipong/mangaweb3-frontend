<script lang="ts">
	import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Toast } from 'sveltestrap';

	let open = false;
	const toggle = () => (open = !open);

	$: headerStr = '';
	$: bodyStr = '';

	export function show(header: string, body: string) {
        headerStr = header;
        bodyStr = body;
		open = true;
	}
</script>

<Modal isOpen={open} {toggle}>
	<ModalHeader {toggle}>{headerStr}</ModalHeader>
	<ModalBody>
		{bodyStr}
	</ModalBody>
	<ModalFooter>
		<Button color="primary" on:click={toggle}>OK</Button>
	</ModalFooter>
</Modal>
