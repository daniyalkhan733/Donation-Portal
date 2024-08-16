<script>
  import { env_vars } from '$lib/env.js';
  import { selectedCategoryId } from '$lib/stores.js';
  import { onMount } from 'svelte';
  import Input from './Input.svelte';

  let category = [];
  let selectedCategory = null;

  const fetchCategoryData = async (id = null) => {
    let url = `${env_vars.icharmsUrl}category`;
    if (id) {
      let newId = id;
      selectedCategoryId.set(newId); // Set the new ID in the store
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${env_vars.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data && data.length > 0) {
        category = data.map((category) => ({
          category_id: category.category_id,
          category_name: category.category_name,
        }));
      } else {
        console.log('No category data found');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Fetch initial category data
  onMount(() => {
    fetchCategoryData();
  });

  // Watch for changes in the selectedCategoryId and fetch new data when it changes
  $: if ($selectedCategoryId) {
    fetchCategoryData($selectedCategoryId);
  }

  // Handle button click
  const handleButtonClick = (id) => {
    selectedCategory = id;
    selectedCategoryId.set(id);
    console.log(`Selected Category id: ${id}`);
  };
</script>

<ul class="grid w-full gap-6 md:grid-cols-3 grid-cols-2">
  {#each category as category}
    <li key={category.category_id}>
      <Input
        id={'category-' + category.category_id}
        value={category.category_name}
        type="button"
        className={`inline-flex items-center justify-center w-full p-2 text-black border-2 border-black rounded-lg cursor-pointer text-lg font-semibold ${selectedCategory === category.category_id ? 'bg-green-600 text-white' : ''}`}
        onclick={() => handleButtonClick(category.category_id)}
      />
    </li>
  {/each}
</ul>
