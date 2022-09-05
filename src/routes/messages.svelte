<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { PUBLIC_BOTID } from '$env/static/public';

	import { supabase } from '$lib/supabaseClient';
	const user = supabase.auth.user();

	export let fid;
	export let friends_name = '';
	let temp_id = 0;
	let text = '';
	let loading;

	let msgArr = [''];

	async function getMessage() {
		try {
			let { data, error, status } = await supabase
				.from('messages')
				.select('*')
				.eq('ffid', fid)
				.order('sent_at', { ascending: true });

			if (error) throw error;

			if (data) {
				msgArr = data;
			}
		} catch (error) {
			// console.log(error);
		}
	}

	async function sendMessage() {
		if (text) {
			temp_id = user.id;

			if (friends_name === 'Bot') {
				temp_id = PUBLIC_BOTID;
			}

			try {
				loading = true;

				const { data, error } = await supabase.from('messages').insert([
					{
						suid: temp_id,
						reply: text,
						ffid: fid
					}
				]);
				if (error) throw error;
				// console.log("success")
			} catch (error) {
				errors = error;
				console.log(error);
			} finally {
				loading = false;
			}
		}

		text = '';
		await getMessage();
	}
</script>

<section class="flex flex-col flex-auto border-l border-gray-300">
	<div class="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
		<div class="flex">
			<div class="text-sm">
				<p class="font-bold text-black">{ friends_name == '' ? 'Chats' : 'Chating with'}  {friends_name}</p>
			</div>
		</div>

		<div class="flex">
			<a href="./" class="block rounded-full hover:bg-gray-200 bg-gray-100 w-10 h-10 p-2">
				<svg viewBox="0 0 20 20" class="w-full h-full fill-current text-blue-500">
					<path
						d="M11.1735916,16.8264084 C7.57463481,15.3079672 4.69203285,12.4253652 3.17359164,8.82640836 L5.29408795,6.70591205 C5.68612671,6.31387329 6,5.55641359 6,5.00922203 L6,0.990777969 C6,0.45097518 5.55237094,3.33066907e-16 5.00019251,3.33066907e-16 L1.65110039,3.33066907e-16 L1.00214643,8.96910337e-16 C0.448676237,1.13735153e-15 -1.05725384e-09,0.445916468 -7.33736e-10,1.00108627 C-7.33736e-10,1.00108627 -3.44283713e-14,1.97634814 -3.44283713e-14,3 C-3.44283713e-14,12.3888407 7.61115925,20 17,20 C18.0236519,20 18.9989137,20 18.9989137,20 C19.5517984,20 20,19.5565264 20,18.9978536 L20,18.3488996 L20,14.9998075 C20,14.4476291 19.5490248,14 19.009222,14 L14.990778,14 C14.4435864,14 13.6861267,14.3138733 13.2940879,14.7059121 L11.1735916,16.8264084 Z"
					/>
				</svg>
			</a>

			<a href="./" class="block rounded-full hover:bg-gray-200 bg-gray-100 w-10 h-10 p-2">
				<svg viewBox="0 0 20 20" class="w-full h-full fill-current text-blue-500">
					<path
						d="M2.92893219,17.0710678 C6.83417511,20.9763107 13.1658249,20.9763107 17.0710678,17.0710678 C20.9763107,13.1658249 20.9763107,6.83417511 17.0710678,2.92893219 C13.1658249,-0.976310729 6.83417511,-0.976310729 2.92893219,2.92893219 C-0.976310729,6.83417511 -0.976310729,13.1658249 2.92893219,17.0710678 Z M9,11 L9,10.5 L9,9 L11,9 L11,15 L9,15 L9,11 Z M9,5 L11,5 L11,7 L9,7 L9,5 Z"
					/>
				</svg>
			</a>
		</div>
	</div>
	<div class="chat-body p-4 flex-1 overflow-y-scroll">
		{#if fid}
			<span use:getMessage />
			{#each msgArr as arr}
				{#if arr.suid == user.id}
					<!-- second msg -->
					<div class="flex flex-row justify-end">
						<div class="messages text-sm text-white grid grid-flow-row gap-2">
							<div class="flex items-center flex-row-reverse group">
								<p class="px-6 py-3 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">
									{arr.reply}
								</p>
							</div>
						</div>
						<p class="p-4 text-center text-sm text-gray-400">{arr.sent_at}</p>
					</div>	
				
				{:else}
				<!-- first msg -->
				<div class="flex flex-row justify-start">
					<div class="messages text-sm text-gray-800 grid grid-flow-row gap-2">
						<div class="flex items-center group">
							<p
								class="px-6 py-3 rounded-t-full rounded-r-full bg-gray-500 max-w-xs lg:max-w-md text-gray-200"
							>
								{arr.reply}
							</p>
						</div>
					</div>
					<p class="p-4 text-center text-sm text-gray-400">{arr.sent_at}</p>
				</div>
				{/if}
			{/each}
		{:else}
			<div
				class="flex p-4 mx-auto mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
				role="alert"
			>
				<svg
					aria-hidden="true"
					class="flex-shrink-0 inline w-5 h-5 mr-3"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/></svg
				>
				<span class="sr-only">Info</span>
				<div>
					<span class="font-medium">No messages yet!</span> Choose one conversation!
				</div>
			</div>
		{/if}
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
						class="rounded-full py-2 pl-3 pr-10 w-full border border-gray-100 focus:border-gray-200 bg-gray-200 focus:bg-gray-250 focus:outline-none text-gray-900 focus:shadow-md transition duration-300 ease-in"
						type="text"
						bind:value={text}
						placeholder="Aa"
						maxlength="50"

					/>
				</label>
			</div>
			<form on:submit|preventDefault={sendMessage}>
				<button
					value={loading ? 'Loading' : ''}
					disabled={loading}
					type="submit"
					class="flex flex-shrink-0 focus:outline-none mx-2 block text-gray-900 text-semibold hover:text-blue-800 w-6 h-6"
				>
					Send
				</button>
			</form>
		</div>
	</div>
</section>

<!-- component -->
<style>
	/* can be configured in tailwind.config.js */
	/* .group:hover .group-hover\:block {
		display: block;
	}
	.hover\:w-64:hover {
		width: 45%;
	} */

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
