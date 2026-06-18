import accessibleAutocomplete from 'accessible-autocomplete';

const dmDItems = [
  'Amoxicillin 250mg capsules',
  'Ibuprofen 200mg tablets',
  'Metformin 500mg tablets',
  'Omeprazole 20mg capsules',
  'Paracetamol 500mg tablets'
].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

let autocompleteCount = 0;

function initDmDAutocomplete(container, defaultValue = '') {
  if (!container) {
    return;
  }

  const id = 'prescription-autocomplete-' + autocompleteCount++;

  accessibleAutocomplete({
    element: container,  // ← use container directly, not getElementById
    id: id,
    name: 'prescriptionDetails',
    source: dmDItems,
    showAllValues: true,
    confirmOnBlur: false,
    displayMenu: 'inline',
    defaultValue: defaultValue
  });
}

function addAnotherItem() {
  const container = document.getElementById('prescription-items-container');

  if (!container) {
    return;
  }

  const row = document.createElement('div');
  row.className = 'prescription-item-row nhsuk-u-margin-top-3';
  row.innerHTML = '<div class="nhsuk-form-group"><label class="nhsuk-label">Enter the item from DM+d data list</label><div class="prescription-autocomplete-container nhsuk-u-width-full"></div></div>';

  container.appendChild(row);
  initDmDAutocomplete(row.querySelector('.prescription-autocomplete-container'));
}

function initRepeatableDmDItems() {
  const addLink = document.getElementById('add-another-item-link');

  if (addLink) {
    addLink.addEventListener('click', function (event) {
      event.preventDefault();
      addAnotherItem();
    });
  }

  const initialContainer = document.getElementById('prescription-autocomplete-container');
  const defaultValue = initialContainer ? initialContainer.dataset.defaultValue || '' : '';
  initDmDAutocomplete(initialContainer, defaultValue);
}

window.addEventListener('DOMContentLoaded', initRepeatableDmDItems);