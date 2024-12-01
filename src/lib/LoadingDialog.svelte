<script>
	import { Modal, ModalBody, Spinner } from "@sveltestrap/sveltestrap";
</script>

<Modal isOpen={true}>
    <div class="modal-header">
        <h5 class="modal-title">Loading</h5>
    </div>
    <ModalBody>
        <div class="d-flex align-items-center">
            <Spinner type="border" class="me-3" /> &nbsp;Please wait.
        </div>
    </ModalBody>
</Modal>