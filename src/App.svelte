<script lang="ts">
	import PromptInput from "./lib/PromptInput.svelte"

  let isProcessing = false
  let image: string | null = null
  let prompt: string = ''
  let placeholder: string = 'Enter Image Generation Prompt'

  let controller: AbortController | null = null
  
  function makeRequest(event: { detail: { value: any } }) {
    // Cancel previous request
    if (controller) {
      controller.abort()
    }

    // Create new controller
    controller = new AbortController()
    isProcessing = true
    prompt = event.detail.value
    placeholder = 'Generating Image...'
    const url = new URL('https://image-generator.prashant-trials-cloudflare.workers.dev/generate')
    url.searchParams.append('q', prompt)
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal
    }).then((value) => {
      if (value.ok) {
        return value.blob()
      } else {
        throw new Error('Failed to fetch')
      }
    }).then((blob) => {
      image = URL.createObjectURL(blob)
    }).catch((error) => {
      console.error(error)
    }).finally(() => {
      console.log('Request Completed')
      placeholder = 'Enter Image Generation Prompt'
      isProcessing = false
      controller = null
    })
  }

  function cancelRequest() {
    if (controller) {
      console.log('Canceling Request')
      controller.abort()
    }
  }
</script>
<div class="bg-gray-800 w-full h-screen overflow-hidden py-4">
  <div class="w-[95%] sm:w-[90%] md:w-[70%] xl:w-[50%] 2xl:w-[40%] 3xl:w-[30%] m-auto flex flex-col h-full">
    <div class="w-full overflow-y-auto grow p-2 flex flex-col">
      <div class="rounded-lg flex items-center h-full">
        {#if image}
        <img src={image} alt={prompt} class="rounded-lg w-full h-full" />
        {:else}
        <div class="text-gray-500 h-full flex justify-center items-center bg-gray-900 rounded-xl p-4 w-full border-dashed border">
         Upload an image to get started or enter a prompt to generate an image 
        </div>
        {/if}
      </div>
    </div>
    <PromptInput placeholder={placeholder} isProcessing={isProcessing} on:makeRequest="{makeRequest}" on:cancelRequest="{cancelRequest}"/>
  </div>
</div>