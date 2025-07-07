const populateCarTypes = async (selectId, apiUrl) => {
        const selectElement = document.getElementById(selectId);

        if (!selectElement) {
            // console.error(`Error: <select> element with ID '${selectId}' not found.`);
            return;
        }

        // Set initial loading state and disable the select element
        selectElement.innerHTML = '<option value="">Loading...</option>';
        selectElement.disabled = true;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Sort data by vehicle title in ascending order (case-insensitive)
            data.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));

            // Clear existing options and add a default option
            selectElement.innerHTML = '<option value="">เลือกประเภท</option>';

            // Populate the select element with sorted options
            data.forEach(vehicle => {
                const option = document.createElement('option');
                option.value = vehicle.id;
                option.textContent = vehicle.title.replace('->', '→');
                selectElement.appendChild(option);
            });

            selectElement.disabled = false; // Re-enable the select element

        } catch (error) {
            console.error('Failed to load or process vehicle types:', error);
            selectElement.innerHTML = '<option value="">Could not load data</option>';
            selectElement.disabled = true; // Keep disabled on error
        }
    };

    // Example usage when the DOM is fully loaded
    const currentOrigin = window.location.origin;
    populateCarTypes('carType1', `${currentOrigin}/wp-json/custom/v1/vehicle_type`);