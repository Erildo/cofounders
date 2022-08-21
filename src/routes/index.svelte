<script>
	// @ts-nocheck
	import { user } from '$lib/sessionStore';
	import { supabase } from '$lib/supabaseClient';
	import Auth from './welcome.svelte';
	import Dashboard from './dashboard.svelte';

	user.set(supabase.auth.user());
	import { page } from '$app/stores';
	import Welcome from './welcome.svelte';

	supabase.auth.onAuthStateChange((state, session) => {
		if (state == 'SIGNED_IN') {
			user.set(session.user);
		} else {
			user.set(false);
		}
	});
</script>

<div class="container h-screen">
	{#if $user}
		<Dashboard />
	{:else}
		<Welcome />
	{/if}
</div>
