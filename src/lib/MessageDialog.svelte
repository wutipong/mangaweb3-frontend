<script lang="ts">
	import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@sveltestrap/sveltestrap';

	let open = $state(false);
	const toggle = () => (open = !open);

	let headerStr = $state('');
	
	let bodyStr = $state('');
	

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
		<Button color="primary" onclick={toggle}>OK</Button>
	</ModalFooter>
</Modal>
