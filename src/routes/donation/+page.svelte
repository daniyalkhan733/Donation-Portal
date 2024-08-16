<script>
	import Category from '$lib/components/Category.svelte';
	import Programs from '$lib/components/Programs.svelte';
	import Country from '$lib/components/Country.svelte';
	import { isCategoryLoaded , isProgramLoaded } from '$lib/stores.js';
  
	let categoryLoaded = false;
	let programLoaded = false;
  
	isCategoryLoaded.subscribe(value => {
	  categoryLoaded = value;
	});
	isProgramLoaded.subscribe(value => {
	  programLoaded = value;});
  </script>
  
  <div class="p-10">
	<h2 class="flex text-center text-black">Select Donation Category</h2>
	<Category />
  </div>
  <div class="p-10">
	<Programs/>
  </div>
  <div class="p-10">
  <Country/></div>
