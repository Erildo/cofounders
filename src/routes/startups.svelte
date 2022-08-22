<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
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
	const getAllQ = supabase.from('companyview').select('*');
	const mineQ = supabase.from('companyview').select('*').filter('uid', 'eq', user.id);

	async function getCompanies(query) {
		try {
			let { data, error, status } = await query;
			if (error) throw error;
			if (data) {
				// getData(data)
				coArr = data;
				console.log(data);
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
	// async function getData(data) {
	// 	uid = data.id;
	// 	url = data.url;
	// 	created_at = data.created_at;
	// 	name = data.name;
	// 	category = data.category;
	// 	problem = data.problem;
	// 	solution = data.solution;
	// 	compesation = data.compesation;
	// 	teams = data.teams;
	// 	stage = data.stage;
	// 	pitchUrl = data.pitchUrl;
	// }
	async function getAll() {
		await getCompanies(getAllQ);
	}
	async function mine() {
		await getCompanies(mineQ);
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

<div class="mt-10" use:getAll>
	{#if coArr.length > 0}
		{#each coArr as dt}
			<div class="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mt-2">
				

				<div >
					<div class="flex flex-rows ">
						<span
							class="col-span-5 text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 "
							>{dt.name}</span
						>
						<span class="text-sm font-semibold px-4 py-1 text-gray-800 rounded-full bg-green-300 ml-20"
						>{dt.stage}</span>
						<span
						class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
						>{dt.category}</span
					>
					</div>

				<div class="flex flex-row">
					{#if dt.url}
						<a
							href={dt.url}
							class="inline-flex justify-center items-center p-2 text-base font-medium text-gray-500 bg-gray-50 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							<ion-icon class="h-7 w-7" name="link-outline" /><span class="ml-2 w-full"> Url</span>
						</a>
					{/if}
					<span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">
						<a href={dt.pitchUrl}>Pitch Deck</a></span>
					<span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">
					{dt.compesation}</span>
				</div>
					<textarea
					class="mt-1 text-gray-600 dark:text-gray-300 bg-gray-800"
					id="outputText"
					rows="3"
					style="resize:none"
					cols="80"
					wrap="on"
					readonly
					value={dt.solution}
				/>
					
				</div>

				<div class="flex items-center justify-between mt-1">
					<button
						class="px-2 py-1 bg-transparent outline-none border-2 
			border-indigo-300 rounded text-indigo-300 font-medium 
			active:scale-95 hover:bg-indigo-500 hover:text-white hover:border-transparent 
			focus:bg-indigo-500 focus:text-white focus:border-transparent focus:ring-2 
			focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400/80 
			disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
					>
						Join this team</button
					>

					<div class="flex items-center">
						<img
							class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
							src={dt.avatar}
							alt="avatar"
						/>
						<span class="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
							>{dt.full_name}</span
						>
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<Skeleton />
	{/if}
</div>
