<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	import { supabase } from '$lib/supabaseClient';
	import { PUBLIC_NAME } from '$env/static/public';

	import Index from './index.svelte';
	import Profile from './profile.svelte';
	import LeftSide from './leftSide.svelte';
	import Settings from './settings.svelte';
	import Startups from './startups.svelte';
	import NotFound from './404.svelte';

	let full_name, avatar;
	let elements = [
		{ icon: 'compass-sharp', name: 'Dashboard', page: 'Profile' },
		{ icon: 'people-sharp', name: 'Connections', page: 'Connections' },
		{ icon: 'flask-sharp', name: 'Start-Ups', page: 'Startups' },
		{ icon: 'settings-sharp', name: 'Settings', page: 'Settings' }
	];
	let rightPage = 'Profile';

	async function signout() {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
			goto('./');
		} catch (error) {
			// console.log(error);
		}
	}

	const user = supabase.auth.user();

	async function getProfile() {
		try {
			// const session = supabase.auth.session();

			let { data, error, status } = await supabase
				.from('profiles')
				.select('*')
				.eq('uid', user.id)
				.single();

			if (error) throw error;
			if (data) {
				full_name = data.full_name;
				avatar = data.avatar;
			}
		} catch (error) {
			goto('./intro');
		}
	}
</script>

<div class="grid grid-cols-6">
	<div
		use:getProfile
		class="flex flex-col w-64 h-screen px-4 py-4 bg-white border-r dark:bg-gray-800 dark:border-gray-600"
	>
		<h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
			<ion-icon name="rocket-sharp"></ion-icon>			{PUBLIC_NAME}
		</h2>

		<div class="flex flex-col justify-between flex-1 mt-6">
			<nav>
				{#each elements as { icon, name, page }, i}
					<a
						value={elements.page}
						on:click={() => {
							rightPage = page;
						}}
						class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
						href="#"
					>
						<ion-icon name={icon} />
						<span class="mx-4 font-medium">{name}</span>
					</a>
					{#if i == 2}
						<hr class="my-6 border-gray-200 dark:border-gray-600" />
						<a
							on:click={signout}
							class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
							href="#"
						>
							<ion-icon name="log-in-sharp" />
							<span class="mx-4 font-medium">Sign Out</span>
						</a>
					{/if}
				{/each}

				<!-- <a
					on:click={signout}
					class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
					href="#"
				>
					<ion-icon name="log-in-sharp" />

					<span class="mx-4 font-medium">Sign Out</span>
				</a> -->
			</nav>
			<div id="dropdown-cta" class="p-4 mt-6 bg-blue-50 rounded-lg dark:bg-blue-900" role="alert">
				<div class="flex items-center mb-3">
					<span
						class="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-green-900"
						>Alpha</span
					>
					
				</div>
				<p class="mb-3 text-sm text-blue-900 dark:text-blue-400">
					Let's make this the best startups platform out
					there.<br>Its open-source.<br>
					Smth missing? Create it
				</p>
				<a
					class="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
					href="#">Github</a
				>
				<a
					class="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
					href="#">Discord</a
				>
			</div>

			<div class="flex items-center px-4 -mx-2">
				<img class="w-10 h-10 rounded-full" src={avatar} alt="avatar" />

				<h4 class="mx-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
					{full_name}
				</h4>
			</div>
		</div>
	</div>
	<div name="main" class="col-span-4 bg-gray-100 ">
		{#if rightPage == 'Profile'}
			<Profile />
		{:else if rightPage == 'Settings'}
			<Settings />
		{:else if rightPage == 'Startups'}
			<Startups />
		{:else}
			<NotFound />
		{/if}
	</div>
	<div name="left" class=" bg-gray-100">
		<LeftSide />
	</div>
</div>
