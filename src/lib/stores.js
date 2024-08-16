import { writable } from 'svelte/store';

export const selectedCategoryId = writable('');
export const selectedCountryId = writable('');
export const isCategoryLoaded = writable(false);
export const isProgramLoaded = writable (false);
export const isCountryLoaded = writable(false);
export const selectedProgramId = writable('');
export const particepentRequired = writable('');

particepentRequired.subscribe((value) => {
  console.log(`Participant Required is: ${value}`);
});
console.log(selectedProgramId);
selectedProgramId.subscribe((value) => {
  console.log(`Program Id is: ${value}`);
});

selectedCategoryId.subscribe((value) => {
  console.log(`initial Id is: ${value}`);
});
