<script>
	import PromptInput from "./lib/PromptInput.svelte"

</script>
<div class="bg-gray-800 w-full h-screen overflow-hidden py-4">
  <div class="w-[95%] sm:w-[90%] md:w-[70%] xl:w-[50%] 2xl:w-[40%] 3xl:w-[30%] m-auto flex flex-col">
    <!-- Visible field -->
    <div class="grow">
      <div class="bg-gray-900 p-4 rounded-lg">
        <p class="text-white">Hello, world!</p>
      </div>
    </div>
    <PromptInput />
  </div>
</div>