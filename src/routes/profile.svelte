<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let full_name = '';
	let avatar;
	let i = 0;
	let error,
		message,
		RequesterId,
		AddresseeId,
		url,
		data,
		location,
		my_role,
		co_location = '',
		co_continent = [''],
		idea,
		my_interest,
		grad_year,
		category,
		co_roles;
	const user = supabase.auth.user();

	async function getProfiles() {
		try {
			let { data, error, status } = await supabase
				.from('profiles')
				.select('*')
				.not('uid', 'eq', user.id);
			if (error) throw error;
			if (data) {
				AddresseeId = data.at(i).uid;

				// await filter(user.id, AddresseeId, data);
				// await filter(AddresseeId, user.id, data);
				await getData(data);
			}
		} catch (error) {
			error = error;
			full_name = null;
			console.log(error);
		}
	}

	async function filter(user1, user2, arr) {
		try {
			let { data, error, status } = await supabase
				.from('friendship')
				.select('*')
				.eq('RequesterId', user1)
				.eq('AddresseeId', user2);
			if (error) throw error;

			if (data.length > 0) {
				const arr1 = arr.filter((item) => item.uid !== user2);
				arr = arr1;
				await getData(arr);
			}
		} catch (error) {
			console.log(error);
		}
	}
	async function getData(data) {
		if (data.length > 0) {
			full_name = data.at(i).full_name;
			avatar = data.at(i).avatar;
			message = data.at(i).message;
			url = data.at(i).url;
			location = data.at(i).location;
			co_location = data.at(i).co_location;
			co_location = data.at(i).co_location;
			co_continent = data.at(i).co_continent;
			idea = data.at(i).idea;
			my_interest = data.at(i).my_interest;
			co_roles = data.at(i).co_roles;
			my_role = data.at(i).my_role;
			grad_year = data.at(i).grad_year;
			category = data.at(i).category;
		}
	}
	async function next() {
		i = i + 1;
		await getProfiles();
	}
	async function connect() {
		try {
			const { data, error } = await supabase.from('friendship').insert([
				{
					RequesterId: user.id,
					AddresseeId: AddresseeId,
					status: 'Request'
				}
			]);
			if (error) throw error;
			next();
		} catch {
			alert(error.message);
		}
	}
</script>

<div use:getProfiles>
	{#if full_name}
		<div
			class="relative mt-4 max-w-md  md:max-w-2xl  min-w-0 break-words mx-auto bg-gray-50 shadow-lg rounded-xl "
		>
			<div class="px-6">
				<div class="flex flex-wrap justify-center">
					<div class="w-full flex justify-center">
						<div class="relative mt-4">
							<img src={avatar} class="w-50 h-50 rounded " alt="" />
						</div>
					</div>
					<div class="w-full text-center ">
						<div class="flex justify-center lg:pt-4 pt-2 pb-0">
							<div class=" text-center">
								<a href={url} target="_blank">
									<ion-icon name="logo-linkedin" class="w-5 h-5" />

									<span class=" text-slate-900 font-semibold ">Linkedin</span></a
								>
							</div>

							<div class="p-3 text-center">
								<span class="text-xl font-bold block uppercase tracking-wide text-slate-700" />
								<span class="text-sm text-slate-400" />
							</div>
						</div>
					</div>
				</div>
				<div class="text-center mt-2">
					<h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">{full_name}</h3>
					<div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
						<i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75" />{location},{grad_year}
					</div>
					<button
						on:click={connect}
						class="w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-2 inline-flex items-center"
					>
						<span class="mx-auto">Connect</span>
					</button>

					<button
						on:click={next}
						class="w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-2 inline-flex items-center"
					>
						<span class="mx-auto">Next</span>
					</button>
				</div>
				<div class="mt-6 py-6 border-t border-slate-200 ">
					<div class="flex flex-wrap px-4">
						<div name="left">
							<ul class="leading-relaxed text-slate-900 mb-4">
								<li>
									<span class="font-semibold">Responsibilities:</span>
									<span
										class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"
									>
										{my_role}
									</span>
									<span class="font-semibold">Category:</span>
									<span
										class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"
										>{category}</span
									>
								</li>
								<li>
									<span class="font-semibold">I am looking for:</span>
									<span
										class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"
									>
										{my_interest},
									</span>
								</li>
								<li>
									<span class="font-semibold">{idea}</span> <ion-icon name="rocket-outline" /> have an
									idea
								</li>
							</ul>
						</div>

						<div class="w-full leading-relaxed text-slate-900 mb-4 ">
							<h3 class="font-bold">Co-Founder Preferences:</h3>
							<div class="flex mb-2">
								<p class="font-semibold">Co-responsibilities:</p>
								<span
									class="ml-2 bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"
								>
									{co_roles}</span
								>
							</div>
							<div class="flex mb-2">
								<p class="font-semibold">Location:</p>
								<span
									class="ml-2 bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"
									>{co_location}</span
								>
								<span
									class="ml-2 bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"
									>{co_continent}</span
								>
							</div>

							<textarea
								class="bg-gray-50"
								id="outputText"
								rows="3"
								style="resize:none"
								cols="80"
								wrap="on"
								readonly
								value={message}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div role="status" class="mt-20 space-y-2.5 animate-pulse max-w-lg mx-auto">
			<div class="flex items-center space-x-2 w-full">
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
			</div>
			<div class="flex items-center w-full space-x-2 max-w-[480px]">
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
			</div>
			<div class="flex items-center w-full space-x-2 max-w-[400px]">
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
			</div>
			<div class="flex items-center w-full space-x-2 max-w-[480px]">
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
			</div>
			<div class="flex items-center w-full space-x-2 max-w-[440px]">
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
			</div>
			<div class="flex items-center w-full space-x-2 max-w-[360px]">
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
			</div>
			<div class="flex items-center w-full space-x-2 max-w-[360px]">
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
			</div>
			<div class="flex items-center w-full space-x-2 max-w-[360px]">
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
			</div>
			<div class="flex items-center w-full space-x-2 max-w-[480px]">
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
			</div>
			<div class="flex items-center w-full space-x-2 max-w-[400px]">
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
			</div>
			<div class="flex items-center w-full space-x-2 max-w-[480px]">
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
			</div>
			<div class="flex items-center w-full space-x-2 max-w-[360px]">
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
			</div>
			<div class="flex items-center w-full space-x-2 max-w-[480px]">
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
			</div>
			<div class="flex items-center w-full space-x-2 max-w-[400px]">
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
			</div>
			<div class="flex items-center w-full space-x-2 max-w-[480px]">
				<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
			</div>
			<span class="sr-only">Loading...</span>
		</div>
	{/if}
</div>
