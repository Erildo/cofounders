<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';

	import { supabase } from '$lib/supabaseClient';
	import Dashboard from './dashboard.svelte';

	let offers = ['Salary', 'Shares', 'Options', 'All'];
	let compesation = [''];
	let error,
		url,
		category,
		stage = '',
		problem,
		solution,
		name,
		teams = false,
		loading,
		pitchUrl;

	function showToast(msg) {
		error = msg.message;
		document.getElementById('myToast').classList.remove('hidden');
		setTimeout(function () {
			document.getElementById('myToast').classList.add('hidden');
		}, 5000);
	}
	async function addCompany() {
		try {
			loading = true;
			const user = supabase.auth.user();
			const { data, error } = await supabase.from('company').insert([
				{
					uid: user.id,
					url: url,
					name: name,
					category: category,
					problem: problem,
					solution: solution,
					compesation: compesation,
					teams: teams,
					stage: stage,
					pitchUrl: pitchUrl
				}
			]);
			if (error) throw error;
			goto('./dashboard');
		} catch (error) {
			showToast(error);
		} finally {
			loading = false;
		}
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

<section class="bg-white dark:bg-gray-900">
	<div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
		<h2 class="mb-4 text-4xl tracking-tight font-bold text-center text-gray-900 dark:text-white">
			Add your startup
		</h2>
		<form on:submit|preventDefault={addCompany} class="space-y-8">
			<div>
				<label for="url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Name</label
				>
				<input
					type="text"
					bind:value={name}
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="Skypiea"
					required
				/>
			</div>
			<div class="flex  space-x-4">
				<label for="url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>What stage is your startup? <a
						href="https://inc42.com/resources/what-are-the-different-stages-of-a-startup/#:~:text=Indian%20startup%20ecosystem-,A%20typical%20startup%20journey%20has%20three%20stages%20%E2%80%94%20ideation%2C%20growth%2C,one%20stage%20to%20the%20other."
					>
						<ion-icon name="book-outline" />
					</a></label
				>
				<div class="flex items-center mr-4">
					<input
						type="radio"
						bind:group={stage}
						value="Idea"
						name="inline-radio-group"
						class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label
						for="inline-radio"
						class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Idea</label
					>
				</div>
				<div class="flex items-center mr-4">
					<input
						type="radio"
						bind:group={stage}
						value="MVP"
						name="inline-radio-group"
						class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label
						for="inline-2-radio"
						class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">MVP</label
					>
				</div>
				<div class="flex items-center mr-4">
					<input
						type="radio"
						bind:group={stage}
						value="Seed"
						name="inline-radio-group"
						class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label
						for="inline-2-radio"
						class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Seed</label
					>
				</div>
				<div class="flex items-center mr-4">
					<input
						type="radio"
						bind:group={stage}
						value="Growth"
						name="inline-radio-group"
						class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label
						for="inline-2-radio"
						class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Growth</label
					>
				</div>
			</div>
			<div>
				<label for="url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Company URL</label
				>
				<input
					type="url"
					bind:value={url}
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="https://..."
				/>
			</div>
			<div>
				<label for="url" class="block  text-sm font-medium text-gray-900 dark:text-gray-300">
					Pitch Deck Url</label
				>
				<p class="font-sm mb-2 text-gray-400">
					You can create a super pitch deck within 1 min here: https://www.deck.rocks/ &#129304;
				</p>

				<input
					type="url"
					bind:value={pitchUrl}
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="https://..."
				/>
			</div>
			<div>
				<label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Category</label
				>
				<select
					required
					bind:value={category}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					><option selected value="">Choose category</option>
					{#each categories as ct}
						<option value={ct}>{ct}</option>
					{/each}
				</select>
			</div>

			<div class="space-y-4">
				<label
					for="subject"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Describe your start-up(in this order)</label
				>
				<textarea
					maxlength="120"
					required
					id="message"
					rows="3"
					bind:value={problem}
					class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="What problem are you solving?...[150 chars max]"
				/>
				<textarea
					maxlength="120"
					required
					id="message"
					rows="3"
					bind:value={solution}
					class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="How is your solution different?...[150 chars max]"
				/>
			</div>

			<div>
				<label
					for="message"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
				>
					What is your compesation for those who join?</label
				>

				<ul
					class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
				>
					{#each offers as offer}
						<li
							class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
						>
							<div class="flex items-center pl-3">
								<input
									type="checkbox"
									bind:group={compesation}
									value={offer}
									class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
								/>
								<label
									for="vue-checkbox-list"
									class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									{offer}</label
								>
							</div>
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<div class="flex">
					<div class="flex items-center h-5">
						<input
							id="helper-checkbox"
							aria-describedby="helper-checkbox-text"
							type="checkbox"
							bind:checked={teams}
							class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						/>
					</div>
					<div class="ml-2 text-sm">
						<label for="helper-checkbox" class="font-medium text-gray-900 dark:text-gray-300"
							>Allow us to build you the team(coming soon)</label
						>
						<p
							id="helper-checkbox-text"
							class="text-xs font-normal text-gray-500 dark:text-gray-300"
						>
							Our philosophy will be explained in more details later,we will let you know when we
							will be ready.
						</p>
					</div>
				</div>
			</div>

			<button
				type="submit"
				value={loading ? 'Loading' : 'Add'}
				disabled={loading}
				class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>Add</button
			>
		</form>
	</div>
</section>
<div id="myToast" class="flex p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800 hidden fixed right-10 bottom-10" role="alert">
	<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
	<span class="sr-only">Info</span>
	<div>
	  <span class="font-medium">!</span> {error}
	</div>
  </div>