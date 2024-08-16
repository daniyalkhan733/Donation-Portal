<script>
    import { env_vars } from '$lib/env.js';
    import { selectedProgramId, isProgramLoaded, isCountryLoaded } from '$lib/stores.js';
    import { onDestroy } from 'svelte';
    import Input from './Input.svelte';
  
    let programId = '';
    let countrydata = []; // Renamed to countrydata for clarity
    let loading = true;
  
    const unsubscribe = selectedProgramId.subscribe((value) => {
      programId = value;
      if (programId) {
        console.log(`New ID set: ${programId}`);
        fetchCountryData(); // Fetch data whenever programId is updated
      }
    });
  
    const fetchCountryData = async () => {
    //   console.log(`Fetching data for Category ID: ${env_vars.icharmsUrl}country/${programId}`);
      if (!programId) {
        console.log('No new Category ID set yet.');
        return;
      }
  
      loading = true; // Set loading to true before fetching data
      isProgramLoaded.set(false); // Set program loaded state to false initially
  
      try {
        const response = await fetch(`${env_vars.icharmsUrl}country/${programId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${env_vars.apiKey}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log('Country Data:', data);
  
        if (data && data.country && data.country.length > 0) {
          countrydata = data.country.map((country) => ({
            country_id: country.country_id,
            country_name: country.country_name,
            program_rate_id: country.program_rate_id
          }));
          console.log('Mapped Country Data:', countrydata);
        } else {
          console.log('No country data found');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        loading = false; // Set loading to false after fetching data
        isProgramLoaded.set(true);
        
        isCountryLoaded.set(false) ;// Set program loaded state to true after fetching data
      }
    };
  
    onDestroy(() => {
      unsubscribe();
    });
  </script>
  
  {#if loading}
    <div class="loading-screen">Loading...</div>
  {:else}
    <ul class="grid w-full gap-6 md:grid-cols-3 grid-cols-2">
      {#each countrydata as country}
        <li key={country.country_id}>
          <Input
            id={'program-' + country.country_id}
            value={country.country_name}
            type="button"
            className="inline-flex items-center justify-center w-full p-2 text-black border-2 border-black rounded-lg cursor-pointer text-lg font-semibold"
            onclick={() => console.log(`Selected Country id: ${country.country_id}`)}
          />
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
  