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
	<ModalHeader>{headerStr}</ModalHeader>
	<ModalBody>
		{bodyStr}
	</ModalBody>
	<ModalFooter>
		<Button color="primary" onclick={doPerform}>OK</Button>
		<Button color="secondary" onclick={toggle}>Cancel</Button>
	</ModalFooter>
</Modal>
