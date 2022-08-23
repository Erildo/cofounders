<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
import { PUBLIC_BOTID } from '$env/static/public';

	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import Skeleton from './skeleton.svelte';

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
				.not('uid', 'eq', user.id)
				.not('uid', 'eq', PUBLIC_BOTID);
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
				<div class="flex flex-wrap justify-center mt-20">
					<div class="w-full flex justify-center">
						<div class="relative">
							<img
								src={avatar}
								alt=""
								class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 min-w-[150px]"
							/>
						</div>
					</div>
					<div class="w-full text-center mt-20">
						<a href={url} target="_blank">
							<ion-icon name="logo-linkedin" class="w-5 h-5 mt-4" />

							<span class=" text-slate-900 font-semibold ">Linkedin</span></a
						>
						<div class="flex justify-center lg:pt-4 pt-8 pb-0 font-semibold">
							<div class="p-3 text-center ">
								<span class="text-sm text-slate-400">{my_role}</span>
							</div>
							<div class="p-3 text-center">
								<span class="text-sm text-slate-400">{category}</span>
							</div>

							<div class="p-3 text-center">
								<span class="text-sm text-slate-400">{my_interest}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="text-center mt-2">
					<h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">{full_name}</h3>
					<div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
						<i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75" />{location}, {grad_year}
					</div>
					<span class="font-semibold">{idea}</span> <ion-icon name="rocket-outline" /> 
				</div>
				<div class="mt-6 py-6 border-t border-slate-200 ">
					<div class="flex flex-wrap px-4">
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
						<div class="w-full px-4 text-center">

						<a href="./" on:click={connect} class="font-normal text-slate-700 hover:text-slate-400">Connect</a> /
						<a href="./" on:click={next} class="font-normal text-slate-700 hover:text-slate-400">Next</a>
					</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<Skeleton />
	{/if}
</div>
