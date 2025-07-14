<script lang="ts">
	import { Container, Button } from '@sveltestrap/sveltestrap';
</script>

<svelte:head>
	<title>MangaWeb 4 Login</title>
</svelte:head>

<Container>
	<h1 class="text-center mt-5">MangaWeb 4</h1>
	<p class="fluid text-center mt-5">Login using OpenID Connect.</p>

	<div class="fluid text-center">
		<Button
			color="primary"
			size="lg"
			href="https://auth.sleepyhead.name/application/o/authorize/?response_type=code&scope=openid%20email%20offline_access&client_id=SZ87KOccOuVlpqUBmPYHk4G9OcbRfw3CXNFzS4v5&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Flogin%2Fcallback&audience=http%3A%2F%2Flocalhost%3A5173"
		>
			Login
		</Button>
	</div>
</Container>
