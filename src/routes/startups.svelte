<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	import { supabase } from '$lib/supabaseClient';

	import Skeleton from './skeleton.svelte';
	let url,
		category = '',
		stage,
		problem,
		compesation,
		solution,
		name,
		teams,
		uid,
		created_at,
		pitchUrl;

	let coArr = [''];
	let i = 0;
	const user = supabase.auth.user();
	const mineQ = supabase.from('companyview').select('*').filter('uid', 'eq', user.id);
	const getAllQ = supabase.from('companyview').select('*');

	async function getCompanies(query) {
		try {
			let { data, error, status } = await query;
			if (error) throw error;
			if (data) {
				coArr = data;
			}
		} catch (error) {
			console.log(error);
		}
	}
	async function filter() {
		this['query' + i] = supabase.from('companyview').select('*').filter('category', 'eq', category);
		await getCompanies(this['query' + i]);
		i = i + 1;
	}
	async function askToJoin(coid) {
		try {
			const { data, error } = await supabase.from('coRequests').insert([
				{
					cor_uid: user.id,
					co_id:coid
				}
			]);
			if (error) throw error;
			console.log('success');
		} catch (error) {
			console.log(error);
		}
	}
	async function getAll() {
		await getCompanies(getAllQ);
		category = "";
	}
	async function mine() {
		await getCompanies(mineQ);
		category = "";
	}
	const categories = [
		'Agriculture Agtech',
		'Artificial Intelligence',
		'Augmented Reality',
		'B2B',
		'Biomedical',
		'Biotech',
		'Blockchain',
		'Community',
		'Consumer',
		'Crowdfunding',
		'Developer Tools',
		'Diversity',
		'Drones',
		'E-commerce',
		'Education',
		'Energy',
		'Enterprise',
		'Entertainment',
		'Esports/ Online Gaming',
		'Financial / Banking',
		'Government',
		'Hardware',
		'Healthcare',
		'International Market',
		'Jobs',
		'Marketplace',
		'Media / Advertising',
		'Moonshots / Hard Tech',
		'Nonprofit',
		'Other',
		'Robotics',
		'Science',
		'Security',
		'Sport / Fitness',
		'Transportation',
		'TravelVirtual Reality'
	];
</script>

<div class="dark ml-10 mt-10">
	<nav class="flex" aria-label="Breadcrumb">
		<ol class="inline-flex items-center space-x-1 md:space-x-3">
			<li class="inline-flex items-center">
				<a
					on:click={getAll}
					href="./"
					class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-800 dark:hover:text-white"
				>
					<svg
						class="w-4 h-4 mr-2"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
						/></svg
					>
					All Startups
				</a>
			</li>
			<li>
				<div class="flex items-center">
					<a
						on:click={mine}
						href="./"
						class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-800 dark:hover:text-white"
						>Mine</a
					>
				</div>
			</li>
			<li aria-current="page">
				<div class="flex items-center">
					<a
						href="./addCompany"
						class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-800 dark:hover:text-white"
						>Add</a
					>
				</div>
			</li>
			<li>
				<select
					required
					bind:value={category}
					on:change={filter}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					><option selected value="">Choose category</option>
					{#each categories as ct}
						<option value={ct}>{ct}</option>
					{/each}
				</select>
			</li>
		</ol>
	</nav>
</div>

<div class="mt-4" use:getAll>
	{#if coArr.length > 0}
		{#each coArr as dt}
			<!-- component -->

			<span
				class="relative block p-6 overflow-hidden border bg-white border-slate-100 rounded-lg ml-6 mr-6 mt-2"
				href="./"
			>
				<span
					class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
				/>

				<div class="justify-between sm:flex">
					<div>
						<h5 class="text-xl font-bold text-slate-900">
							{dt.name}
							<span
								class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"
							>
								{dt.compesation}</span
							>
						</h5>
						<p class="mt-1 text-xs font-medium text-slate-600">By {dt.full_name}</p>
					</div>

					<div class="flex-shrink-0 hidden ml-3 sm:block">
						<img class="object-cover w-16 h-16 rounded-lg shadow-sm" src={dt.avatar} alt="" />
					</div>
				</div>

				<div class="mt-4 sm:pr-8 sm:flex">
					<p class="text-sm text-slate-500">
						{dt.solution}
					</p>
				</div>

				<div class="md:flex flex-row sm:flex-col md:flex-row lg:flex-col xl:flex-row mt-4 ">
					<div class="flex flex-col-reverse">
						<button
							id={dt.id}
							on:click={askToJoin(dt.id)}
							class="w-[150px] px-2 py-1 bg-transparent outline-none border-2 
										border-indigo-300 rounded text-indigo-300 font-medium 
										active:scale-95 hover:bg-indigo-500 hover:text-white hover:border-transparent 
										focus:bg-indigo-500 focus:text-white focus:border-transparent focus:ring-2 
										focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400/80 
										disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
						>
							Join this team</button
						>
					</div>

					<div class="flex flex-col-reverse ml-3 sm:ml-6">
						<span
							style="
						display:inline-block;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						max-width: 11ch;"
							class="text-xs font-medium text-slate-500">{dt.created_at}</span
						>
						<dt class="text-sm  text-slate-600">Created</dt>
					</div>

					<div class="flex flex-col-reverse ml-3 sm:ml-6">
						<dd class="text-xs font-medium text-slate-500">{dt.stage}</dd>
						<dt class="text-sm  text-slate-600">Stage</dt>
					</div>
					<div class="flex flex-col-reverse ml-3 sm:ml-6">
						<dd class="text-xs font-medium text-slate-500">{dt.category}</dd>
						<dt class="text-sm  text-slate-600">Category</dt>
					</div>
					{#if dt.url}
						<div class="flex flex-col-reverse ml-3 sm:ml-6">
							<dt class="text-xs font-medium text-slate-600">
								<a href={dt.url} target="_black">Site</a>
							</dt>
						</div>
					{/if}
					{#if dt.pitchUrl}
						<div class="flex flex-col-reverse ml-3 sm:ml-6">
							<dt class="text-xs font-medium text-slate-600">
								<a href={dt.pitchUrl} target="_black">Pitch Deck</a>
							</dt>
						</div>
					{/if}
				</div>
			</span>
		{/each}
	{:else}
		<Skeleton />
	{/if}
</div>
