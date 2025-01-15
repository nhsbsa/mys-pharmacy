import '/accessible-autocomplete.min.js';

document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.querySelector('#council');
  
    if (selectElement) {
      accessibleAutocomplete.enhanceSelectElement({
        selectElement: selectElement,
        showAllValues: true, // Show all options on focus
      });
    }
  });
  