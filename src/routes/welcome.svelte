<script>
	// @ts-nocheck
	import { supabase } from '$lib/supabaseClient';
	import { PUBLIC_NAME, PUBLIC_DISCORD_URL, PUBLIC_GITHUB_URL } from '$env/static/public';

	let loading = false;
	let error;

	async function signInWithLinkedIn() {
		try {
			loading = true;
			const { user, session, error } = await supabase.auth.signIn({
				provider: 'LinkedIn'
			});

			if (error) throw error;
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	}

	let showMenu = false;
	function toggle() {
		showMenu = !showMenu;
	}
	let screenWidth;
</script>

<svelte:window bind:innerWidth={screenWidth} />

<head>
	<!-- Place this tag in your head or just before your close body tag. -->
	<script async defer src="https://buttons.github.io/buttons.js"></script>
</head>
<body class="dark">
	<section class="bg-white dark:bg-gray-800">
		<nav class="container p-6 mx-auto lg:flex lg:justify-between lg:items-center">
			<div class="flex items-center justify-between">
				<div>
					<a
						class="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
						href="./"
					>
						<ion-icon name="rocket-sharp" />
						{PUBLIC_NAME}
					</a>
				</div>

				<div class="flex lg:hidden">
					<button
						type="button"
						on:click={toggle}
						class="text-gray-500 hover:text-gray-300 focus:outline-none focus:text-gray-300"
						aria-label="toggle menu"
					>
						<svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
							<path
								fill-rule="evenodd"
								d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
							/>
						</svg>
					</button>
				</div>
			</div>
			{#if showMenu == true || screenWidth > 1002}
				<div class="flex flex-col mt-4  space-y-2 lg:mt-0 lg:flex-row lg:-mx- lg:space-y-0">
					<a
						class="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
						href="#home">Home</a
					>
					<a
						class="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
						href="#teams">Teams</a
					>
					<a
						class="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
						href="#tools">Tools</a
					>
					<a
						class="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
						href="#footer">About Us</a
					>
				</div>

				<form on:submit|preventDefault={signInWithLinkedIn}>
					<button
						value={loading ? 'Loading' : 'Sign in with LinkedIn'}
						disabled={loading}
						type="submit"
						class="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
					>
						<ion-icon class="mr-3" name="logo-linkedin" /> Get in with LinkedIn
					</button>
				</form>
			{/if}
		</nav>

		<div class="container px-6 py-16 mx-auto text-center" id="home">
			<div class="max-w-lg mx-auto">
				<h1 class="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
					Open-source platform for finding the best co-founders
				</h1>

				<p class="mt-6 text-gray-500 dark:text-gray-300">
					Match with co-founders based on your preferences. We are here to be the best platform out
					there.
				</p>

				<div class="mt-10 sm:ml-14 md:ml-36 lg:ml-36 xl:ml-36 ">
					<a 
						href="https://www.producthunt.com/posts/cogit?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-cogit"
						target="_blank"
						><img
							src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=357982&theme=light"
							alt="CoGit - Open&#0045;source&#0032;cofounders&#0032;platform&#0032;for&#0032;startups | Product Hunt"
							
							
						/></a
					>
				</div>
			</div>
		</div>

		<div class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
			<a
				href={PUBLIC_GITHUB_URL}
				target="_blank"
				class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
			>
				<ion-icon class="w-7 h-7 mr-3" name="logo-github" />
				<div class="text-left">
					<div class="mb-1 text-xs">Find us</div>
					<div class="-mt-1 font-sans text-sm font-semibold">on Github</div>
				</div>
			</a>
			<a
				href={PUBLIC_DISCORD_URL}
				class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
			>
				<ion-icon class="mr-3 w-7 h-7" name="logo-discord" />
				<div class="text-left">
					<div class="mb-1 text-xs">Join us also</div>
					<div class="-mt-1 font-sans text-sm font-semibold">on Discord</div>
				</div>
			</a>
		</div>
	</section>
	<section class="bg-white dark:bg-gray-800">
		<div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
			<div class="mr-auto place-self-center lg:col-span-7">
				<h2 class="mb-4 text-3xl tracking-tight font-bold text-gray-900 dark:text-white">
					We care about results!
				</h2>
				<p
					class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
				>
					Networking,Find a job or a Co-founder? We will match you what best fits you based on what
					you’re looking for.
				</p>
			</div>
			<div class="lg:w-[520px] md:w-[520px] sm:w-[100px]">
				<img
					src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
					alt="team"
				/>
				<div class="caption text-gray-400">
					Photo by <a
						href="https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
						>Annie Spratt</a
					>
					on
					<a
						href="https://unsplash.com/s/photos/teamwork?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
						>Unsplash</a
					>
				</div>
			</div>
		</div>
	</section>

	<section id="teams" class="bg-white dark:bg-gray-800 ">
		<div
			class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6 grid grid-cols-2"
		>
			<div>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					class="w-full hidden dark:block"
					src="https://github.com/Erildo/cofounders/blob/main/src/images/t.jpg?raw=true"
					alt="dashboard image"
				/>
				<div class="caption text-gray-400">
					Photo by <a
						href="https://unsplash.com/@jannerboy62?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
						>Nick Fewings</a
					>
					on
					<a
						href="https://unsplash.com/s/photos/teambuilding?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
						>Unsplash</a
					>
				</div>
			</div>
			<div class="mt-4 md:mt-0">
				<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
					Build teams fast.
				</h2>
				<p class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
					We use a flat hierarchy organizational structure with few or no levels of middle
					management.
				</p>
				<p class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
					You can vote! Just like on a board where you approve decisions, here you too can vote!
					Everything transparent!
				</p>
			</div>
		</div>
	</section>

	<footer id="footer" class="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
		<div class="mx-auto max-w-screen-xl text-center">
			<a
				href="./"
				class="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
			>
				<ion-icon name="rocket-sharp" />
				{PUBLIC_NAME}
			</a>
			<p class="my-6 text-gray-500 dark:text-gray-400">
				Open-source matching platform built to find co-founders,jobs and increase your networking
				circle.
			</p>
			<ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
				<li>
					<a href="./" class="mr-4 hover:underline md:mr-6 ">About</a>
				</li>
				<li>
					<a href={PUBLIC_GITHUB_URL} class="mr-4 hover:underline md:mr-6 ">Github</a>
				</li>

				<li>
					<a
						href="https://github.com/Erildo/cofounders/discussions"
						target="_blank"
						class="mr-4 hover:underline md:mr-6">Discussions</a
					>
				</li>
				<li>
					<a
						class="github-button sm:w-auto sm:mx-auto sm:justify-center sm:px-4 sm:py-2.5"
						href="https://github.com/erildo/cofounders"
						target="_blank"
						data-color-scheme="no-preference: light_high_contrast; light: light_high_contrast; dark: dark_high_contrast;"
						data-icon="octicon-star"
						data-size="large"
						data-show-count="true"
						aria-label="Star erildo/cofounders on GitHub">Star Us</a
					>
				</li>
			</ul>
			<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
				>© 2022 {PUBLIC_NAME} All Rights Reserved.</span
			>
		</div>
	</footer>
</body>
