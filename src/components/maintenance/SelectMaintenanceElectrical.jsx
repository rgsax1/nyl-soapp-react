import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { listMaintenanceElectricals } from "./maintenance-electricals/MaintenanceElectricalService.js";

function SelectMaintenanceElectrical({ value, onChange }) {
    const [maintenanceOptions, setMaintenanceOptions] = useState([]);
    const selectedMaintenanceIds = value || [];

    useEffect(() => {
        listMaintenanceElectricals()
            .then((response) => {
                const options = response.data.map((maintenance) => ({
                    label: maintenance.type,
                    value: maintenance.id,
                }));
                setMaintenanceOptions(options);
            })
            .catch((error) => {
                console.error('Erro ao buscar a lista de manutenções elétricas', error);
            });
    }, []);

    const handleMaintenanceSelect = (selectedOptions) => {
        const selectedIds = selectedOptions.map((option) => option.value);
        onChange(selectedIds);
    };

    return (
        <div>
            <Select
                options={maintenanceOptions}
                value={maintenanceOptions.filter((option) => selectedMaintenanceIds.includes(option.value))}
                onChange={handleMaintenanceSelect}
                isMulti={true}
            />
        </div>
    );
}

export default SelectMaintenanceElectrical;
