<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	let url,
		category = '',
		stage,
		problem,
		compesation,
		solution,
		name,
		teams,
		uid,
		pitchUrl;
	let i = 0;
	const user = supabase.auth.user();
	const getAllQ = supabase.from('company').select('*');
	const mineQ = supabase.from('company').select('*').filter('uid','eq',user.id);

	async function getCompanies(query) {
		try {
			let { data, error, status } = await query;
			if (error) throw error;
			if (data) {
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	}
	async function filter() {
		this['query' + i] = supabase.from('company').select('*').filter('category', 'eq', category);
		await getCompanies(this['query' + i]);
		i = i + 1;
	}
	async function getData(data) {
		uid = data.id;
		url = data.url;
		name = data.name;
		category = data.category;
		problem = data.problem;
		solution = data.solution;
		compesation = data.compesation;
		teams = data.teams;
		stage = data.stage;
		pitchUrl = data.pitchUrl;
	}
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

<div class="dark ml-20 mt-10">
	<nav class="flex" aria-label="Breadcrumb">
		<ol class="inline-flex items-center space-x-1 md:space-x-3">
			<li class="inline-flex items-center">
				<a on:click={getAll}
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
					<a on:click={mine}
						href="./"
						class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-800 dark:hover:text-white"
						>Mine</a
					>
				</div>
			</li>
			<li aria-current="page">
				<div class="flex items-center">
					<a
						href="#"
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

<div class="mt-10" use:getCompanies>
	<div class="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
		<div class="flex items-center justify-between">
			<span class="text-sm font-light text-gray-600 dark:text-gray-400">Mar 10, 2019</span>
			<a
				class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
				>Design</a
			>
		</div>

		<div class="mt-2">
			<a
				href="#"
				class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
				>Accessibility tools for designers and developers</a
			>
			<p class="mt-2 text-gray-600 dark:text-gray-300">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam
				aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus
				nihil quis facere in modi ratione libero!
			</p>
		</div>

		<div class="flex items-center justify-between mt-4">
			<div class="flex text-slate-500 cursor-pointer items-center transition hover:text-slate-600">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mr-1.5 h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
					/>
				</svg>
				<span>4</span>
			</div>
			<div class="flex items-center">
				<img
					class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
					src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
					alt="avatar"
				/>
				<a class="font-bold text-gray-700 cursor-pointer dark:text-gray-200">Khatab wedaa</a>
			</div>
		</div>
	</div>
</div>
