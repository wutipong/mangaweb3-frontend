<script lang="ts">
	import { Modal, ModalBody, ModalFooter, Button } from '@sveltestrap/sveltestrap';

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
	<div class="modal-header">
		<h5 class="modal-title">{headerStr}</h5>
	</div>
	<ModalBody>
		{bodyStr}
	</ModalBody>
	<ModalFooter>
		<Button color="primary" onclick={doPerform}>OK</Button>
		<Button color="secondary" onclick={toggle}>Cancel</Button>
	</ModalFooter>
</Modal>
