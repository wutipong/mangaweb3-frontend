<script lang="ts">
	import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Toast } from 'sveltestrap';

	let open = false;
	const toggle = () => (open = !open);

	$: headerStr = '';
	$: bodyStr = '';
	$: onOkFunc = (): void => {};

	function doPerform() {
		onOkFunc();
		toggle();
	}

	export function show(header: string, body: string, onOk: () =>void) {
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
