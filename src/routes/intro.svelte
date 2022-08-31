<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { PUBLIC_BOTID } from '$env/static/public';

	import { supabase } from '$lib/supabaseClient';
	let roles = ['Operations', 'Sales and marketing', 'Engineering', 'All'];
	let co_roles = [''];
	let my_interest = [''];
	let interests = ['Networking', 'Find work', 'Find a cofounder', 'Join Teams(soon)'];
	let idea = '';
	let error,
		nextPage = '',
		url,
		location,
		my_role,
		co_location = '',
		co_continent = [''],
		category,
		message,
		full_name,
		avatar,
		grad_year,
		loading;

	const user = supabase.auth.user();


	function showToast(msg) {
		error = msg.message;
            document.getElementById("myToast").classList.remove("hidden");
            setTimeout(function () {
                document.getElementById("myToast").classList.add("hidden");
            }, 5000);
        }
	async function friendsWithBot() {
		try {
			const { data, error } = await supabase.from('friendship').insert([
				{
					RequesterId: PUBLIC_BOTID,
					AddresseeId: user.id,
					status: 'friends'
				}
			]);
			if (error) throw error;
		} catch {
			// error to display
		}
	}
	async function letsgo() {
		try {
			loading = true;
			const session = supabase.auth.session();
			if (idea == 'Yes,I do') {
				nextPage = './addCompany';
			} else {
				nextPage = './dashboard';
			}
			full_name = session.user.user_metadata.full_name;
			avatar = session.user.user_metadata.avatar_url;
			const { data, error } = await supabase.from('profiles').insert([
				{
					uid: user.id,
					url: url,
					location: location,
					my_role: my_role,
					my_interest: my_interest,
					co_location: co_location,
					co_continent: co_continent,
					co_roles: co_roles,
					message: message,
					idea: idea,
					full_name: full_name,
					avatar: avatar,
					grad_year: grad_year,
					category: category
				}
			]);
			if (error) throw error;
			if (data) {
				await friendsWithBot();
				goto(nextPage);
			}
		} catch (error) {
			showToast(error)
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
	let countryList = [
		'Afghanistan',
		'Åland Islands',
		'Albania',
		'Algeria',
		'American Samoa',
		'Andorra',
		'Angola',
		'Anguilla',
		'Antarctica',
		'Antigua and Barbuda',
		'Argentina',
		'Armenia',
		'Aruba',
		'Australia',
		'Austria',
		'Azerbaijan',
		'Bahamas (the)',
		'Bahrain',
		'Bangladesh',
		'Barbados',
		'Belarus',
		'Belgium',
		'Belize',
		'Benin',
		'Bermuda',
		'Bhutan',
		'Bolivia (Plurinational State of)',
		'Bonaire, Sint Eustatius and Saba',
		'Bosnia and Herzegovina',
		'Botswana',
		'Bouvet Island',
		'Brazil',
		'British Indian Ocean Territory (the)',
		'Brunei Darussalam',
		'Bulgaria',
		'Burkina Faso',
		'Burundi',
		'Cabo Verde',
		'Cambodia',
		'Cameroon',
		'Canada',
		'Cayman Islands (the)',
		'Central African Republic (the)',
		'Chad',
		'Chile',
		'China',
		'Christmas Island',
		'Cocos (Keeling) Islands (the)',
		'Colombia',
		'Comoros (the)',
		'Congo (the Democratic Republic of the)',
		'Congo (the)',
		'Cook Islands (the)',
		'Costa Rica',
		'Croatia',
		'Cuba',
		'Curaçao',
		'Cyprus',
		'Czechia',
		"Côte d'Ivoire",
		'Denmark',
		'Djibouti',
		'Dominica',
		'Dominican Republic (the)',
		'Ecuador',
		'Egypt',
		'El Salvador',
		'Equatorial Guinea',
		'Eritrea',
		'Estonia',
		'Eswatini',
		'Ethiopia',
		'Falkland Islands (the) [Malvinas]',
		'Faroe Islands (the)',
		'Fiji',
		'Finland',
		'France',
		'French Guiana',
		'French Polynesia',
		'French Southern Territories (the)',
		'Gabon',
		'Gambia (the)',
		'Georgia',
		'Germany',
		'Ghana',
		'Gibraltar',
		'Greece',
		'Greenland',
		'Grenada',
		'Guadeloupe',
		'Guam',
		'Guatemala',
		'Guernsey',
		'Guinea',
		'Guinea-Bissau',
		'Guyana',
		'Haiti',
		'Heard Island and McDonald Islands',
		'Holy See (the)',
		'Honduras',
		'Hong Kong',
		'Hungary',
		'Iceland',
		'India',
		'Indonesia',
		'Iran (Islamic Republic of)',
		'Iraq',
		'Ireland',
		'Isle of Man',
		'Israel',
		'Italy',
		'Jamaica',
		'Japan',
		'Jersey',
		'Jordan',
		'Kazakhstan',
		'Kenya',
		'Kiribati',
		"Korea (the Democratic People's Republic of)",
		'Korea (the Republic of)',
		'Kosovo',
		'Kuwait',
		'Kyrgyzstan',
		"Lao People's Democratic Republic (the)",
		'Latvia',
		'Lebanon',
		'Lesotho',
		'Liberia',
		'Libya',
		'Liechtenstein',
		'Lithuania',
		'Luxembourg',
		'Macao',
		'Madagascar',
		'Malawi',
		'Malaysia',
		'Maldives',
		'Mali',
		'Malta',
		'Marshall Islands (the)',
		'Martinique',
		'Mauritania',
		'Mauritius',
		'Mayotte',
		'Mexico',
		'Micronesia (Federated States of)',
		'Moldova (the Republic of)',
		'Monaco',
		'Mongolia',
		'Montenegro',
		'Montserrat',
		'Morocco',
		'Mozambique',
		'Myanmar',
		'Namibia',
		'Nauru',
		'Nepal',
		'Netherlands (the)',
		'New Caledonia',
		'New Zealand',
		'Nicaragua',
		'Niger (the)',
		'Nigeria',
		'Niue',
		'Norfolk Island',
		'Northern Mariana Islands (the)',
		'Norway',
		'Oman',
		'Pakistan',
		'Palau',
		'Palestine, State of',
		'Panama',
		'Papua New Guinea',
		'Paraguay',
		'Peru',
		'Philippines (the)',
		'Pitcairn',
		'Poland',
		'Portugal',
		'Puerto Rico',
		'Qatar',
		'Republic of North Macedonia',
		'Romania',
		'Russian Federation (the)',
		'Rwanda',
		'Réunion',
		'Saint Barthélemy',
		'Saint Helena, Ascension and Tristan da Cunha',
		'Saint Kitts and Nevis',
		'Saint Lucia',
		'Saint Martin (French part)',
		'Saint Pierre and Miquelon',
		'Saint Vincent and the Grenadines',
		'Samoa',
		'San Marino',
		'Sao Tome and Principe',
		'Saudi Arabia',
		'Senegal',
		'Serbia',
		'Seychelles',
		'Sierra Leone',
		'Singapore',
		'Sint Maarten (Dutch part)',
		'Slovakia',
		'Slovenia',
		'Solomon Islands',
		'Somalia',
		'South Africa',
		'South Georgia and the South Sandwich Islands',
		'South Sudan',
		'Spain',
		'Sri Lanka',
		'Sudan (the)',
		'Suriname',
		'Svalbard and Jan Mayen',
		'Sweden',
		'Switzerland',
		'Syrian Arab Republic',
		'Taiwan (Province of China)',
		'Tajikistan',
		'Tanzania, United Republic of',
		'Thailand',
		'Timor-Leste',
		'Togo',
		'Tokelau',
		'Tonga',
		'Trinidad and Tobago',
		'Tunisia',
		'Turkey',
		'Turkmenistan',
		'Turks and Caicos Islands (the)',
		'Tuvalu',
		'Uganda',
		'Ukraine',
		'United Arab Emirates (the)',
		'United Kingdom of Great Britain and Northern Ireland (the)',
		'United States Minor Outlying Islands (the)',
		'United States of America (the)',
		'Uruguay',
		'Uzbekistan',
		'Vanuatu',
		'Venezuela (Bolivarian Republic of)',
		'Viet Nam',
		'Virgin Islands (British)',
		'Virgin Islands (U.S.)',
		'Wallis and Futuna',
		'Western Sahara',
		'Yemen',
		'Zambia',
		'Zimbabwe'
	];
</script>

<section class="bg-white dark:bg-gray-900 dark">
	<div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
		<h2 class="mb-4 text-4xl tracking-tight font-bold text-center text-gray-900 dark:text-white">
			Complete your profile
		</h2>
		<form on:submit|preventDefault={letsgo} class="space-y-8">
			<div>
				<label for="url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Your linkedin profile URL</label
				>
				<input
					type="url"
					id="url"
					bind:value={url}
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="https://www.linkedin.com/in/erildo-shuli/"
					required
				/>
				<label for="url" class="block mt-1 italic text-xs text-gray-900 dark:text-gray-300"
					>We need it to grab your experience</label
				>
			</div>
			<div>
				<label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Your graduation year</label
				>
				<input
					type="number"
					bind:value={grad_year}
					class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
					placeholder="2020"
					maxlength="4"
					oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
					required
				/>
			</div>

			<div>
				<label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Location</label
				>
				<select
					required
					bind:value={location}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					<option selected value="">Choose Country</option>
					{#each countryList as country}
						<option value={country}>{country}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Category</label
				>
				<select
					required
					bind:value={category}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					<option selected value="">Choose category</option>

					{#each categories as ct}
						<option value={ct}>{ct}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Which areas of a startup are you willing to take responsibility for?</label
				>
				<select
					required
					bind:value={my_role}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					<option selected value="">Choose role</option>
					<option value="Engineering">Engineering</option>
					<option value="Operations">Operations</option>
					<option value="Sales and marketing">Sales and marketing</option>
				</select>
			</div>

			<div>
				<label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>I am here for...</label
				>
				<div class="grid grid-cols-4" required>
					{#each interests as interest}
						<div class="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
							<input
								type="checkbox"
								bind:group={my_interest}
								value={interest}
								class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								for="bordered-checkbox-1"
								class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
								>{interest}</label
							>
						</div>
					{/each}
				</div>
			</div>
			<div>
				<label
					for="location"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Do you have a location preference for your co-founder?
				</label>

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
							class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No Preference</label
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
							class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">In my country</label
						>
					</div>

					<div class="flex items-center mr-4">
						<select
							required
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
			</div>
			<div>
				<label
					for="message"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
				>
					What are you looking for in the ideal co-founder?</label
				>

				<ul
					class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
				>
					{#each roles as role}
						<li
							class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
						>
							<div class="flex items-center pl-3">
								<input
									type="checkbox"
									bind:group={co_roles}
									value={role}
									class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
								/>
								<label
									for="vue-checkbox-list"
									class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									{role}</label
								>
							</div>
						</li>
					{/each}
				</ul>
			</div>
			<div class="sm:col-span-2">
				<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
					>Your message to your cofounder</label
				>
				<textarea
					required
					maxlength="200"
					id="message"
					rows="6"
					bind:value={message}
					class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
					placeholder="What are you looking for...please be specific(200 char max)"
				/>
			</div>
			<div>
				<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
					>Do you already have a startup or idea that you're set on?</label
				>

				<ul class="grid gap-6 w-full md:grid-cols-2">
					<li>
						<input
							type="radio"
							id="hosting-small"
							name="hosting"
							value="No idea"
							class="hidden peer"
							bind:group={idea}
							required
						/>
						<label
							for="hosting-small"
							class="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
						>
							<div class="block">
								<div class="w-full text-lg font-semibold">Nope</div>
								<div class="w-full">
									I could help a co-founder with their existing idea or explore new ideas together
								</div>
							</div>
							<svg
								aria-hidden="true"
								class="ml-3 w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/></svg
							>
						</label>
					</li>
					<li>
						<input
							type="radio"
							id="hosting-big"
							name="hosting"
							bind:group={idea}
							value="Yes,I do"
							class="hidden peer"
						/>
						<label
							for="hosting-big"
							class="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
						>
							<div class="block">
								<div class="w-full text-lg font-semibold">Yes,I do</div>
								<div class="w-full">
									Looking for people to help you build your own startup.Not open to new ideas...
								</div>
							</div>
							<svg
								aria-hidden="true"
								class="ml-3 w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/></svg
							>
						</label>
					</li>
				</ul>
			</div>
			<button
				type="submit"
				value={loading ? 'Loading' : 'Lets Go'}
				disabled={loading}
				class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>Lets Go</button
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