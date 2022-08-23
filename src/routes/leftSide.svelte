<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	import { supabase } from '$lib/supabaseClient';

	let tagsArr = [''];
	let avatarArr = [''];
	async function getTopTags() {
		try {
			let { data, error, status } = await supabase
				.from('toptags')
				.select('*');
				if (error) throw error;
			if (data) {
				tagsArr = data;
			}
		} catch (error) {
			// smth here
		}
	}

	async function getAvatars() {
		try {
			let { data, error, status } = await supabase
				.from('profiles')
				.select('avatar');
				if (error) throw error;
			if (data) {
				avatarArr = data;
			}
		} catch (error) {
			// smth here
		}
	}
</script>

<div class="w-[150px] mt-10 ">
	<div class="hidden md:block">
	  <p class="text-base font-semibold text-black"><ion-icon class="h-7 w-7" name="dice-outline"></ion-icon></p>
	  <div class="pb-1 mt-4 border-b">
		<span class="text-sm lg:text-base ">
			Startups are invented every 3 seconds, which leads to 11,000 per hour.
			Make it worthwhile! 
				</span>
		<div class="my-6 " use:getTopTags>
		  <a class="flex items-center mb-2 text-base font-semibold text-blue-600 hover:underline" href="./">
			<svg class="w-4 h-4 mr-2 text-gray-700" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
			Website.com/</a>

			<p class="text-base font-semibold text-black mt-2 ">Top Tags</p>

		  <div class="flex flex-wrap gap-2 my-4">

			{#each tagsArr as tags }	
		<a href="./" class="px-2 py-1 text-xs leading-none text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200">{tags.category}</a>

			{/each}
			
			</div>
		 
		</div>
	  </div>
	</div>
	<div class="px-6 py-6 -mx-10 border-b md:mx-0 md:px-0">
	  <p class="text-base font-semibold text-black">Latest release</p>
	  <div class="flex mt-4 text-sm font-semibold text-black">
		<svg class="w-4 h-4 mt-1 mr-2 text-green-600" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
		</svg>
		<div>
		  v1.0.0 <br>
		  <span class="text-xs text-gray-600">on August 2022</span>
		</div>
	  </div>
	</div>
	<div class="px-6 py-6 -mx-10 border-b md:mx-0 md:px-0">
	  <p class="text-base font-semibold text-black">Loved by
		<span class="w-4 h-4 px-2 py-1 ml-1 text-xs bg-gray-300 rounded-full">5,000 +</span>
	  </p>
	  <div class="flex items-center mt-4 overflow-hidden text-blue-600 cursor-pointer hover:underline" use:getAvatars>

		{#each avatarArr as avArr }	
		<img class="inline-block object-cover w-10 h-10 text-white border-2 border-gray-400 rounded-full shadow-sm" src={avArr.avatar} alt="img" />
		{/each}
		
	</div>
	</div>
	
	
  </div>
  
