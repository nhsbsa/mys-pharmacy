import accessibleAutocomplete from 'accessible-autocomplete';

const dmDItems = [
  'Amoxicillin 250mg capsules',
  'Ibuprofen 200mg tablets',
  'Metformin 500mg tablets',
  'Omeprazole 20mg capsules',
  'Paracetamol 500mg tablets'
].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

function initDmDAutocomplete(container, defaultValue = '') {
  if (!container) {
    return;
  }

  accessibleAutocomplete({
    element: container,
    id: 'prescription-autocomplete-' + Math.random().toString(36).slice(2, 8),
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
  row.innerHTML = '<div class="nhsuk-form-group"><label class="nhsuk-label" for="prescription-autocomplete">Enter the item from DM+d data list</label><div class="prescription-autocomplete-container nhsuk-u-width-full"></div></div>';

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

  const initialContainer = document.querySelector('.prescription-autocomplete-container');
  const defaultValue = initialContainer ? initialContainer.dataset.defaultValue || '' : '';
  initDmDAutocomplete(initialContainer, defaultValue);
}

window.addEventListener('DOMContentLoaded', initRepeatableDmDItems);