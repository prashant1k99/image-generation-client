<script>
	import PromptInput from "./lib/PromptInput.svelte"

</script>
<div class="bg-gray-800 w-full h-screen overflow-hidden py-4">
  <div class="w-[95%] sm:w-[90%] md:w-[70%] xl:w-[50%] 2xl:w-[40%] 3xl:w-[30%] m-auto flex flex-col h-full">
    <div class="w-full overflow-y-auto grow p-2 flex flex-col">
      <div class="rounded-lg flex items-center h-full">
        <div class="text-white bg-gray-900 rounded-xl p-4 w-full">Insert Custom text here. Give option to upload and modify image or generate image</div>
      </div>
    </div>
    <PromptInput />
  </div>
</div>