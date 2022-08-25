<script>
	import { goto } from '$app/navigation';

	// @ts-nocheck
	import { session } from '$app/stores';

	import { supabase } from '$lib/supabaseClient';
	let interests = ['Networking', 'Find work', 'Find a cofounder', 'Join Teams(soon)'];

	let error,
		message,
		url,co_roles,
		my_role = '',
		co_location = '',
		co_continent = [''],
		my_interest = [''];
	let loading = false;

	async function BeyBey() {
		const user = supabase.auth.user();
		try {
			const { data: user, error } = await supabase.auth.api.deleteUser(user.id);
			if (error) throw error;
			goto("./index");
		} catch (error) {
			alert(error.message);
		}
	}
	async function getProfile() {
		try {
			loading = true;
			const user = supabase.auth.user();

			let { data, error, status } = await supabase
				.from('profiles')
				.select('*')
				.eq('uid', user.id)
				.single();

			if (error && status !== 406) throw error;

			if (data) {
				my_role = data.my_role;

				message = data.message;
				url = data.url;
				co_location = data.co_location;
				co_continent = data.co_continent;
				my_interest = data.my_interest;
				co_roles = data.co_roles;
			}
		} catch (error) {
			// alert(error.message);
		} finally {
			loading = false;
		}
	}

	async function updateProfile() {
		try {
			loading = true;
			const user = supabase.auth.user();

			const updates = {
				uid: user.id,
				message,
				url,
				my_role,
				co_location,
				co_continent,
				my_interest,
				updated_at: new Date()
			};

			let { error } = await supabase.from('profiles').upsert(updates, {
				returning: 'minimal' // Don't return the value after inserting
			});

			if (error) throw error;
			goto("./dashboard");
		} catch (error) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}
</script>

<div class="mx-auto my-auto h-fit w-[700px] mt-10 light rounded-lg">
	<h1 class="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl ">
		Change your information
	</h1>
	<br />

	<form use:getProfile on:submit|preventDefault={updateProfile}>
		<div class="grid gap-6 mb-6 md:grid-cols-1">
			<div class="flex flex-col md:w-full ">
				<label
					for="last_name"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Role</label
				>
				<select
					bind:value={my_role}
					class="bg-gray-50   border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					<option selected value="">Choose role</option>
					<option value="Engineering">Engineering</option>
					<option value="Operations">Operations</option>
					<option value="Sales and marketing">Sales and marketing</option>
				</select>
			</div>
			<div class="dark">
				<label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
					>My Interests</label
				>

				<div class="grid grid-cols-4">
					{#each interests as interest}
						<div class="flex items-center pl-4 rounded border border-gray-900 dark:border-gray-700">
							<input
								type="checkbox"
								bind:group={my_interest}
								value={interest}
								class="w-4 h-4 text-black rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								for="bordered-checkbox-1"
								class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-900"
								>{interest}</label
							>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex">
				<div class="flex items-center mr-4">
					<input
						type="radio"
						bind:group={co_location}
						value="No Preference"
						name="inline-radio-group"
						class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label
						for="inline-radio"
						class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-900">No Preference</label
					>
				</div>
				<div class="flex items-center mr-4">
					<input
						type="radio"
						bind:group={co_location}
						value="In my country"
						name="inline-radio-group"
						class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label
						for="inline-2-radio"
						class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-900">In my country</label
					>
				</div>

				<div class="flex items-center mr-4">
					<select
						multiple
						bind:value={co_continent}
						id="countries_multiple"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option value="Asia">Asia</option>
						<option value="Africa">Africa</option>
						<option value="North America">North America</option>
						<option value="South America">South America</option>
						<option value="Antarctica">Antarctica</option>
						<option value="Europe">Europe</option>
						<option value="Australia">Australia</option>
					</select>
				</div>
			</div>
			<div>
				<label
					for="visitors"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Url</label
				>
				<input
					type="url"
					id="website"
					bind:value={url}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="flowbite.com"
					required=""
				/>
			</div>
		</div>
		<div>
			<label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
				>Description</label
			>
			<textarea
				id="message"
				rows="4"
				bind:value={message}
				class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Your message..."
			/>
		</div>

		<input
			type="submit"
			class="mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			value={loading ? 'Loading ...' : 'Update'}
			disabled={loading}
		/>
		<button
			type="button"
			on:click={BeyBey}
			class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
			>Delete Your Profile</button
		>
	</form>
</div>
