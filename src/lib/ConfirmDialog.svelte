<script lang="ts">
	import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@sveltestrap/sveltestrap';

	let open = $state(false);
	const toggle = () => (open = !open);

	let headerStr = $state('');
	
	let bodyStr = $state('');
	
	let onOkFunc = $state((): void => {});
	

	function doPerform() {
		onOkFunc();
		toggle();
	}

	export function show(header: string, body: string, onOk: () => void) {
		headerStr = header;
		bodyStr = body;
		onOkFunc = onOk;
		open = true;
	}
</script>

<Modal isOpen={open} {toggle}>
	<ModalHeader {toggle}>{headerStr}</ModalHeader>
	<ModalBody>
		{bodyStr}
	</ModalBody>
	<ModalFooter>
		<Button color="primary" on:click={doPerform}>OK</Button>
		<Button color="secondary" on:click={toggle}>Cancel</Button>
	</ModalFooter>
</Modal>
