<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	import { supabase } from '$lib/supabaseClient';
	import Messages from './messages.svelte';

	const user = supabase.auth.user();
	const frienship_status = '';
	let id,
		dataArr = [''],
		full_name,
		loading,
		fid = 0,
		friends_name = '',
		avatar;

	async function getFriends() {
		await getFriendship('friends');
	}
	async function getRequests() {
		await getFriendship('Request');
	}
	async function openMessages(id,name) {
		fid = id;
		friends_name = name;
	}
	let promise = openMessages(fid);

	async function getFriendship(frienship_status) {
		try {
			let { data, error, status } = await supabase
				.from('friendshipview')
				.select('*')
				.eq('status', frienship_status)
				.eq('AddresseeId', user.id);
			if (error) throw error;

			if (data) {
				dataArr = data;
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function updateStatus(AddresseeId, RequesterId) {
		try {
			loading = true;
			const updates = {
				AddresseeId: AddresseeId,
				RequesterId: RequesterId,
				status: 'friends',
				updated_at: new Date()
			};

			let { error } = await supabase.from('friendship').upsert(updates, {
				returning: 'minimal' // Don't return the value after inserting
			});

			if (error) throw error;
			await getFriends();
		} catch (error) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}
</script>

<!-- Messenger Clone -->
<div class="h-screen w-full flex antialiased text-gray-200 bg-gray-100 overflow-hidden">
	<div class="flex-1 flex flex-col">
		<div class="border-b-2 border-gray-100 p-2 flex flex-row z-20">
			<div class="bg-red-600 w-3 h-3 rounded-full mr-2" />
			<div class="bg-yellow-500 w-3 h-3 rounded-full mr-2" />
			<div class="bg-green-500 w-3 h-3 rounded-full mr-2" />
		</div>
		<main class="flex-grow flex flex-row min-h-0">
			<section
				class="flex flex-col flex-none overflow-auto w-24 hover:w-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out"
			>
				<div class="header p-4 flex flex-row justify-between items-center flex-none">
					<p class="text-md  text-black font-bold hidden md:block group-hover:block">Messages</p>
				</div>

				<div class="active-users flex flex-row p-2 overflow-auto w-0 min-w-full">
					<button
						on:click={getFriends}
						type="button"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>Connections</button
					>
					<button
						on:click={getRequests}
						type="button"
						class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
						>Requests</button
					>
				</div>
				<div class="contacts p-2 flex-1 overflow-y-scroll " use:getFriends>
					
					{#each dataArr as dt}
						<div
							class="flex justify-between items-center p-3 hover:bg-gray-200 rounded-lg relative"
						>
							<div class="w-16 h-16 relative flex flex-shrink-0">
								<img
									class="shadow-md rounded-full w-full h-full object-cover"
									src={dt.avatar}
									alt="avatar"
								/>
							</div>
							<div class="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block text-black">
								<p>
									<a href="./" on:click={(promise = openMessages(dt.fid,dt.full_name))} >{dt.full_name}</a>
									{#if dt.full_name == "Bot"}
									<p>anything interesting today?</p>
									{:else}
									<a href={dt.url} target="_blank">
										<ion-icon name="logo-linkedin" class="w-5 h-5" /></a
									>
									{/if}
									
									{#if dt.status == 'Request'}
										<button
											on:click={updateStatus(dt.AddresseeId, dt.RequesterId)}
											class="relative inline-flex items-center justify-center p-0.5  ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
										>
											<span
												class="relative px-1 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
											>
												Accept
											</span>
										</button>
									{/if}
								</p>
								<div class="flex items-center dark:text-sm text-gray-200 inline-items" />
							</div>
						</div>
					{/each}
				</div>
			</section>

			<Messages bind:fid bind:friends_name />
		</main>
	</div>
</div>

<!-- component -->
<style>
	/* can be configured in tailwind.config.js */
	.group:hover .group-hover\:block {
		display: block;
	}
	.hover\:w-64:hover {
		width: 45%;
	}

	/* NO NEED THIS CSS - just for custom scrollbar which can also be configured in tailwind.config.js*/
	::-webkit-scrollbar {
		width: 1px;
		height: 1px;
	}
	::-webkit-scrollbar-button {
		width: 0px;
		height: 0px;
	}
	::-webkit-scrollbar-thumb {
		background: transparent;
		border: 0px none #ffffff;
		border-radius: 50px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: transparent;
	}
	::-webkit-scrollbar-thumb:active {
		background: transparent;
	}
	::-webkit-scrollbar-track {
		background: transparent;
		border: 0px none #ffffff;
		border-radius: 50px;
	}
	::-webkit-scrollbar-track:hover {
		background: transparent;
	}
	::-webkit-scrollbar-track:active {
		background: transparent;
	}
	::-webkit-scrollbar-corner {
		background: transparent;
	}
</style>
