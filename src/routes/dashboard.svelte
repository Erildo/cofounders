<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	import { supabase } from '$lib/supabaseClient';
	import { PUBLIC_NAME, PUBLIC_DISCORD_URL, PUBLIC_GITHUB_URL } from '$env/static/public';

	import Profile from './profile.svelte';
	import LeftSide from './leftSide.svelte';
	import Settings from './settings.svelte';
	import Startups from './startups.svelte';
	import Connections from './connections.svelte';
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

	let showMenu = false;
	function toggle() {
		showMenu = !showMenu;
	}
</script>

<div class="grid md:grid-cols-6 ">
	<div class="flex items-center md:hidden">
		<div class="relative inline-block  ">
			<button
				on:click={toggle}
				class="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-black focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-100 focus:outline-none"
			>
				<svg
					class="w-5 h-5 text-gray-800 dark:text-black"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
			<!-- mobile menu -->
			{#if showMenu == true}
				<div
					class="absolute left-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-100"
				>
				{#each elements as { icon, name, page }, i}
					<a
						value={elements.page}
						on:click={() => {
							rightPage = page;
						}}
					
						href="./"
						class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-100 dark:hover:text-black"
					><ion-icon name={icon} />
					<span class="mx-2">{name}</span>	
				
				</a>
				{/each}
					<a on:click={signout}

						href="./"
						class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-100 dark:hover:text-black"
					>
					<ion-icon name="log-in-sharp" />
					<span class="mx-2">Sign Out</span>
					</a>
				</div>
			{/if}
		</div>
	</div>

	<div
		use:getProfile
		class="hidden md:flex flex flex-col w-64 h-screen px-4 py-4 bg-white border-r dark:bg-gray-800 dark:border-gray-600"
	>
		<h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
			<ion-icon name="rocket-sharp" /> <span>{PUBLIC_NAME}</span>
		</h2>

		<div class="flex flex-col justify-between flex-1 mt-6">
			<nav>
				{#each elements as { icon, name, page }, i}
					<a
						value={elements.page}
						on:click={() => {
							rightPage = page;
						}}
						class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 "
						href="./"
					>
						<ion-icon name={icon} />
						<span class="mx-4 font-medium ">{name}</span>
					</a>
					{#if i == 2}
						<hr class="my-6 border-gray-200 dark:border-gray-600" />
						<a
							on:click={signout}
							class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
							href="./"
						>
							<ion-icon name="log-in-sharp" />
							<span class="mx-4 font-medium hidden md:block">Sign Out</span>
						</a>
					{/if}
				{/each}
			</nav>
			<div id="dropdown-cta" class="p-4 mt-6 bg-blue-50 rounded-lg dark:bg-blue-900 hidden md:block"
				role="alert"
			>
				<div class="flex items-center mb-3">
					<span
						class="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-green-900"
						>Alpha</span
					>
				</div>
				<p class="mb-3 text-sm text-blue-900 dark:text-blue-400 ">
					Let's make this the best startups platform out there.<br />Its open-source.<br />
					Smth missing? Create it
				</p>
				<a
					target="_blank"
					class="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
					href={PUBLIC_GITHUB_URL}>Github</a
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
		{:else if rightPage == 'Connections'}
			<Connections />
		{:else}
			<NotFound />
		{/if}
	</div>
	<div name="left" class="bg-gray-100  flex flex-col hidden md:block">
		<LeftSide />
	</div>
</div>
