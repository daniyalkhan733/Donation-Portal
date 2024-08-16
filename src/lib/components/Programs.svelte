<script>
  import { selectedCategoryId, isCategoryLoaded ,selectedProgramId} from '$lib/stores.js';
  import { env_vars } from '$lib/env.js';
  import { onDestroy } from 'svelte';
  import Input from './Input.svelte';

  let newId = '';
  let selectedProgram = null;
  let programs = [];
  let loading = true; // Loading state

  const unsubscribe = selectedCategoryId.subscribe((value) => {
    newId = value;  
    if (newId) {
      console.log(`New Category ID set: ${newId}`);
      fetchProgramData(); // Fetch data whenever newUrl is updated
    }
  });

  const fetchProgramData = async () => {
    // console.log(`Fetching data for Category ID: ${env_vars.icharmsUrl}program/${newId}`);
    if (!newId) {
      console.log('No new Category ID set yet.');
    
      let programId = id;
      selectedProgramId.set(programId); // Set the new URL in the store
    
      return;
    }

    loading = true; // Set loading to true before fetching data
    isCategoryLoaded.set(false); // Set loading state to false initially

    try {
      const response = await fetch(`${env_vars.icharmsUrl}program/${newId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${env_vars.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Program Data:', data);
      

      if (data && data.program && data.program.length > 0) {
        programs = data.program.map((program) => ({
          program_id: program.program_id,
          program_name: program.program_name,
          participant_required: program.participant_required

        }));
        console.log('Programs:', programs);
      } else {
        console.log('No program data found');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      loading = false; // Set loading to false after fetching data
      isCategoryLoaded.set(true); // Set loading state to true after fetching data
    }
  };

  onDestroy(() => {
    unsubscribe();
  });
  const handleButtonClick = (id) => {
    selectedProgram = id;
    selectedProgramId.set(id);
    console.log(`Selected program id: ${id}`);
  };
</script>

{#if loading}
  <div class="loading-screen">Loading...</div>
{:else}
  <ul class="grid w-full gap-6 md:grid-cols-3 grid-cols-2">
    {#each programs as program}
      <li key={program.program_id}>
        <Input
          id={'program-' + program.program_id}
          value={program.program_name}
          type="button"
          className={`inline-flex items-center justify-center w-full p-2 text-black border-2 border-black rounded-lg cursor-pointer text-lg font-semibold ${selectedProgram === program.program_id ? 'bg-green-600 text-white' : ''}`}
          onclick={() => handleButtonClick(program.program_id)}
        />
        <h2>{program.participant_required}</h2>
      </li>
    {/each}
  </ul>
{/if}



<style>
  .loading-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    font-size: 2rem;
  }
</style>
