const populateCarTypes = async (selectId, apiUrl, useSelect2 = false) => {
    const selectElement = document.getElementById(selectId);

    if (!selectElement) {
        console.error(`Error: <select> element with ID '${selectId}' not found.`);
        return;
    }

    selectElement.innerHTML = '<option value="">Loading...</option>';
    selectElement.disabled = true;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        data.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));

        selectElement.innerHTML = '<option value="">เลือกประเภท</option>';

        data.forEach(vehicle => {
            const option = document.createElement('option');
            option.value = vehicle.id;
            option.textContent = vehicle.title.replace('->', '→');
            selectElement.appendChild(option);
        });

        selectElement.disabled = false;

        if (useSelect2) {
            if ($(selectElement).hasClass('select2-hidden-accessible')) {
                $(selectElement).select2('destroy');
            }
            $(selectElement).select2({
                width: '100%',
                placeholder: 'เลือกประเภท'
            });
        }

    } catch (error) {
        console.error('Failed to load or process vehicle types:', error);
        selectElement.innerHTML = '<option value="">Could not load data</option>';
        selectElement.disabled = true;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const currentOrigin = window.location.origin;
    // To use the basic dropdown:
    // populateCarTypes('carType1', `${currentOrigin}/wp-json/custom/v1/vehicle_type`);

    // To use the dropdown with Select2:
    populateCarTypes('carType1', `${currentOrigin}/wp-json/custom/v1/vehicle_type`, true);
});
