<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	import { supabase } from '$lib/supabaseClient';

	const user = supabase.auth.user();
    const frienship_status = '';
	let id,
		dataArr = [''],
		full_name,
		loading,
		avatar;

	async function getFriends() {
		await getFriendship("friends");
	}
	async function getRequests() {
		await getFriendship("Request");
	}
	async function getFriendship(frienship_status) {
		try {
			let { data, error, status } = await supabase
				.from('friendshipview')
				.select('*')
				.eq('status', frienship_status);
			// .eq('AddresseeId', user.id);
			if (error) throw error;

			if (data) {
				console.log(data);
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
<div class="h-screen w-full flex antialiased text-gray-200 bg-gray-800 overflow-hidden">
	<div class="flex-1 flex flex-col">
		<div class="border-b-2 border-gray-800 p-2 flex flex-row z-20">
			<div class="bg-red-600 w-3 h-3 rounded-full mr-2" />
			<div class="bg-yellow-500 w-3 h-3 rounded-full mr-2" />
			<div class="bg-green-500 w-3 h-3 rounded-full mr-2" />
		</div>
		<main class="flex-grow flex flex-row min-h-0">
			<section
				class="flex flex-col flex-none overflow-auto w-24 hover:w-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out"
			>
				<div class="header p-4 flex flex-row justify-between items-center flex-none">
					<p class="text-md font-bold hidden md:block group-hover:block">Messages</p>
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
							class="flex justify-between items-center p-3 hover:bg-gray-600 rounded-lg relative"
						>
							<div class="w-16 h-16 relative flex flex-shrink-0">
								<img
									class="shadow-md rounded-full w-full h-full object-cover"
									src={dt.avatar}
									alt=""
								/>
							</div>
							<div class="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
								<p>
									{dt.full_name}
									<a href="./" target="_blank">
										<ion-icon name="logo-linkedin" class="w-5 h-5" /></a
									>
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
			<section class="flex flex-col flex-auto border-l border-gray-800">
				<div
					class="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow"
				>
					<div class="flex">
						<!-- <div class="w-12 h-12 mr-4 relative flex flex-shrink-0">
							<img
								class="shadow-md rounded-full w-full h-full object-cover"
								src="https://randomuser.me/api/portraits/women/33.jpg"
								alt=""
							/>
						</div> -->
						<div class="text-sm">
							<p class="font-bold">Scarlett Johansson</p>
						</div>
					</div>

					<div class="flex">
						<a href="./" class="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2">
							<svg viewBox="0 0 20 20" class="w-full h-full fill-current text-blue-500">
								<path
									d="M11.1735916,16.8264084 C7.57463481,15.3079672 4.69203285,12.4253652 3.17359164,8.82640836 L5.29408795,6.70591205 C5.68612671,6.31387329 6,5.55641359 6,5.00922203 L6,0.990777969 C6,0.45097518 5.55237094,3.33066907e-16 5.00019251,3.33066907e-16 L1.65110039,3.33066907e-16 L1.00214643,8.96910337e-16 C0.448676237,1.13735153e-15 -1.05725384e-09,0.445916468 -7.33736e-10,1.00108627 C-7.33736e-10,1.00108627 -3.44283713e-14,1.97634814 -3.44283713e-14,3 C-3.44283713e-14,12.3888407 7.61115925,20 17,20 C18.0236519,20 18.9989137,20 18.9989137,20 C19.5517984,20 20,19.5565264 20,18.9978536 L20,18.3488996 L20,14.9998075 C20,14.4476291 19.5490248,14 19.009222,14 L14.990778,14 C14.4435864,14 13.6861267,14.3138733 13.2940879,14.7059121 L11.1735916,16.8264084 Z"
								/>
							</svg>
						</a>

						<a
							href="./"
							class="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 ml-4"
						>
							<svg viewBox="0 0 20 20" class="w-full h-full fill-current text-blue-500">
								<path
									d="M2.92893219,17.0710678 C6.83417511,20.9763107 13.1658249,20.9763107 17.0710678,17.0710678 C20.9763107,13.1658249 20.9763107,6.83417511 17.0710678,2.92893219 C13.1658249,-0.976310729 6.83417511,-0.976310729 2.92893219,2.92893219 C-0.976310729,6.83417511 -0.976310729,13.1658249 2.92893219,17.0710678 Z M9,11 L9,10.5 L9,9 L11,9 L11,15 L9,15 L9,11 Z M9,5 L11,5 L11,7 L9,7 L9,5 Z"
								/>
							</svg>
						</a>
					</div>
				</div>
				<div class="chat-body p-4 flex-1 overflow-y-scroll">
					<div class="flex flex-row justify-start">
						<div class="messages text-sm text-gray-700 grid grid-flow-row gap-2">
							<div class="flex items-center group">
								<p
									class="px-6 py-3 rounded-t-full rounded-r-full bg-gray-500 max-w-xs lg:max-w-md text-gray-200"
								>
									Hey! How are you?
								</p>
							</div>
						</div>
						<p class="p-4 text-center text-sm text-gray-500">12:40 PM</p>
					</div>

					<!-- second msg -->
					<div class="flex flex-row justify-end">
						<div class="messages text-sm text-white grid grid-flow-row gap-2">
							<div class="flex items-center flex-row-reverse group">
								<p class="px-6 py-3 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">
									Hey! How are you?
								</p>
							</div>
						</div>
						<p class="p-4 text-center text-sm text-gray-500">12:40 PM</p>
					</div>
				</div>
				<div class="chat-footer flex-none">
					<div class="flex flex-row items-center p-4">
						<button
							type="button"
							class="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
						>
							<svg viewBox="0 0 20 20" class="w-full h-full fill-current">
								<path
									d="M10,1.6c-4.639,0-8.4,3.761-8.4,8.4s3.761,8.4,8.4,8.4s8.4-3.761,8.4-8.4S14.639,1.6,10,1.6z M15,11h-4v4H9  v-4H5V9h4V5h2v4h4V11z"
								/>
							</svg>
						</button>

						<div class="relative flex-grow">
							<label>
								<input
									class="rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
									type="text"
									value=""
									placeholder="Aa"
								/>
							</label>
						</div>
						<button
							type="button"
							class="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-500 hover:text-blue-700 w-6 h-6"
						>
							<svg
								class="w-full h-full"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/></svg
							>
						</button>
					</div>
				</div>
			</section>
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
		width: 2px;
		height: 2px;
	}
	::-webkit-scrollbar-button {
		width: 0px;
		height: 0px;
	}
	::-webkit-scrollbar-thumb {
		background: #2d3748;
		border: 0px none #ffffff;
		border-radius: 50px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #2b6cb0;
	}
	::-webkit-scrollbar-thumb:active {
		background: #000000;
	}
	::-webkit-scrollbar-track {
		background: #1a202c;
		border: 0px none #ffffff;
		border-radius: 50px;
	}
	::-webkit-scrollbar-track:hover {
		background: #666666;
	}
	::-webkit-scrollbar-track:active {
		background: #333333;
	}
	::-webkit-scrollbar-corner {
		background: transparent;
	}
</style>
