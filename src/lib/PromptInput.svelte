<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

	import UpArrow from "../assets/icon/UpArrow.svelte"

  export let placeholder: string
  export let isProcessing:boolean

  let prompt: string

  function cancelRequest() {
    if (!isProcessing) return
    dispatch('cancelRequest')
  } 

  function sendRequest() {
    if (prompt.trim() == '') return
    dispatch('makeRequest', {
      value: prompt
    })
    prompt = ''
  }
</script>

<div class="border border-gray-400 bg-transparent text-white py-4 px-6 rounded-xl flex flex-row">
  <input bind:value={prompt} class="focus:bg-transparent focus:outline-none w-full h-full bg-transparent" placeholder={placeholder} disabled={isProcessing} on:keydown={(e) => e.key === 'Enter' && sendRequest()} />
  {#if isProcessing}
  <button class="h-3 w-3 border-2 p-2 rounded-md" on:click={cancelRequest} />
  {:else}
  <button class="h-3 w-3" on:click={sendRequest}>
    <UpArrow  />
  </button>
  {/if}
</div>
