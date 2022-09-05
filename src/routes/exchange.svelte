<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	import { supabase } from '$lib/supabaseClient';
	const user = supabase.auth.user();

	let msgArr = [''];
	let rArr = [''];

	let loading;
    let page = false;
	let hours, text,secondText;
	let firstText = 'Hello 👋, I am willing to exchange';

	async function getXchanges() {
		try {
			let { data, error, status } = await supabase.from('xchangeview').select('*');

			if (error) throw error;

			if (data) {
				msgArr = data;
			}
		} catch (error) {
			// console.log(error);
		}
	}
    function changePage(){
        page = !page;
    }

    async function SendRequest(eId) {
		try {

			const { data, error } = await supabase.from('xrequests').insert([
				{
					rid: user.id,
					xmid: eId
				}
			]);
			if (error) throw error;
                alert("The person will be alerted")
        } catch (error) {
			console.log(error);
		} 

	}

    async function getXRequests() {
		try {
			let { data, error, status } = await supabase.from('xrequestsview')
            .select('*')
            .eq("xuid",user.id );

			if (error) throw error;

			if (data) {
				rArr = data;
                console.log(data)
			}
		} catch (error) {
			// console.log(error);
		}
	}
	async function sendMessage() {
		let fullText = `${firstText} ${hours} hours of ${secondText}  for ${text}`;

		try {
			loading = true;

			const { data, error } = await supabase.from('xmessages').insert([
				{
					xuid: user.id,
					xmessage: fullText
				}
			]);
			if (error) throw error;
                await getXchanges()
        } catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	}
</script>


  
<div class="flex flex-col flex-auto h-full p-6">
   
{#if page == false}
	<div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">

		<div class="flex flex-col h-full overflow-x-auto mb-4">
			<div class="flex flex-col h-full" use:getXchanges>
				<div class="grid grid-cols-12 gap-y-2">
					<div class="col-start-1 col-end-8 p-3 rounded-lg">
						<div class="flex flex-row items-center">
							<div
								class="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 flex-shrink-0 text-white"
							>
								Cogit
							</div>
							<div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
								<div>Hey How are you today?</div>
							</div>
						</div>
					</div>

					<div class="col-start-1 col-end-8 p-3 rounded-lg">
						<div class="flex flex-row items-center">
							<div
								class="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 flex-shrink-0 text-white"
							>
								Cogit
							</div>
							<div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
								<div>
									If someone will accept your request,please head over to chat for a more
									personalized conversation! Also check  <a href="./" on:click={changePage} class="font-medium text-red-600 underline dark:text-red-500 hover:no-underline">here</a> for your requests
								</div>
							</div>
						</div>
					</div>

                    {#each msgArr as arr}
                    {#if arr.xuid == user.id}
                    <div class="col-start-1 col-end-8 p-3 rounded-lg">
                        <div class="flex flex-row items-center">
                            <div
                                class="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 flex-shrink-0 text-white"
                            >
                                Me
                            </div>
                            <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                <div>{arr.xmessage}</div>
                            </div>
                        </div>
                    </div>
                    {:else}
					<!-- //second message -->
					<div class="col-start-6 col-end-13 p-3 rounded-lg">
						<div class="flex items-center justify-start flex-row-reverse">
							<div class="relative">
								<img
									class = "w-10 h-10 rounded"
									src ={arr.avatar}
									alt =""
								/>
								<a
									href={arr.url}
									target="_blank"
									class="absolute top-0 left-8 transform -translate-y-1/2 w-3.5 h-3.5"
								>
									<ion-icon name="logo-linkedin" />
								</a>
							</div>
							<div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
								<div> {arr.xmessage} </div>
							</div>
							<button on:click={SendRequest(arr.id)} class="text-blue-800 mr-2 opacity-20 hover:opacity-100">Accept</button>
						</div>
                       
                    </div> 
                    {/if} 
                    {/each}
				</div>
               
			</div>
           
		</div>
		<form on:submit|preventDefault={sendMessage}>
			<div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
				<div>Hello 👋, I am willing to exchange:</div>

				<div class="flex-grow ml-2">
					<div class="relative w-full">
						<input
							type="number"
							bind:value={hours}
							class="flex w-20 border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
							placeholder="hours?"
							required
						/>
					</div>
				</div>
                <div class="ml-1 flex-grow">of</div>
                <div class="flex-grow ml-2">
					<div class="relative w-full">
						<input
							type="text"
							bind:value={secondText}
							class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
							placeholder="what u do best"
							maxlength="20"
                            size="10"
							required
						/>
					</div>
				</div>

				<div class="ml-2">for</div>
				<div class="flex-grow ml-2">
					<div class="relative w-full">
						<input
							type="text"
							bind:value={text}
							class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
							placeholder="what do you want in exchange?"
							maxlength="50"
							required
						/>
					</div>
				</div>
				<div class="ml-4">
					<button
						value={loading ? 'Loading' : ''}
						disabled={loading}
						type="submit"
						class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
					>
						<span>Send</span>
						<span class="ml-2">
							<svg
								class="w-4 h-4 transform rotate-45 -mt-px"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
								/>
							</svg>
						</span>
					</button>
				</div>
			</div>
		</form>
	</div>
    {:else}

        <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div class="flex flex-col h-full overflow-x-auto mb-4">
                <div class="flex flex-col h-full" use:getXRequests>
                Go Back <a href="./" on:click={changePage} class="font-medium text-red-600 underline dark:text-red-500 hover:no-underline">here</a>
                </div>
                {#each rArr as ra}
                <div
				class="mt-8 flex px-4 py-4 justify-between bg-white
				dark:bg-gray-600 shadow-xl rounded-lg cursor-pointer">
				<!-- Card -->

				<div class="flex justify-between">
					<!-- Left side -->

					<img
						class="h-12 w-12 rounded-full object-cover"
						src={ra.avatar}
						alt="" />

					<div
						class="ml-4 flex flex-col capitalize text-gray-600
						dark:text-gray-400">
						<span>Name</span>
						<span class="mt-2 text-black dark:text-gray-200">
							{ra.full_name}
						</span>
					</div>

					<div
						class="ml-12 flex flex-col capitalize text-gray-600
						dark:text-gray-400">
						<span>Url</span>
						<span class="mt-2 text-black dark:text-gray-200">
						<a href={ra.url} >Linkedin</a>
						</span>

					</div>

				</div>

				<div class="flex">
					<!-- Rigt side -->

				

					<div
						class="mr-16 flex flex-col capitalize text-gray-600
						dark:text-gray-400">
						<span>role</span>
						<span class="mt-2 text-black dark:text-gray-200">
							{ra.my_role}
						</span>
					</div>

					<!-- <div
						class="mr-16 flex flex-col capitalize text-gray-600
						dark:text-gray-400">
						<span>status</span>
						<span class="mt-2 text-yellow-600 dark:text-yellow-400">
							in work
						</span>
					</div> -->

					<div
						class="mr-8 flex flex-col capitalize text-gray-600
						dark:text-gray-400">
						<span>Requested Date</span>
						<span class="mt-2 text-green-400 dark:text-green-200
                        "style="
                        display:inline-block;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 11ch;">
							{ra.rxcreated_at}
						</span>
					</div>

				</div>

			</div>
                
                {/each}
            </div>
        </div>
  
    
    {/if}
</div>
