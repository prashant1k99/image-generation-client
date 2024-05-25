<script lang="ts">
	import UpArrow from "../assets/icon/UpArrow.svelte"

  export let placeholder = 'Enter Image Generation Prompt'
  export let isProcessing:boolean = false

  let prompt: string = ''

  function cancelRequest() {
    console.log('Cancel Request')
    placeholder = 'Enter Image Generation Prompt'
    isProcessing = false
  } 

  function sendRequest() {
    isProcessing = true
    placeholder = 'Processing...'
    prompt = ''
    console.log('Make request')
    setTimeout(() => {
      isProcessing = false
    }, 20000000)
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
