<script lang="ts">
	import UpArrow from "../assets/icon/UpArrow.svelte"

  export let isProcessing:boolean = false
</script>

<div class="border border-gray-400 bg-transparent text-white py-4 px-6 rounded-xl flex flex-row">
  <input class="focus:bg-transparent focus:outline-none w-full h-full bg-transparent" disabled={isProcessing} />
  <div class="h-3 w-3 border-2 p-2 rounded-md">
    <!-- <UpArrow  /> -->
  </div>
</div>
