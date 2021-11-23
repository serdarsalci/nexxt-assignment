import React from 'react';
import Select from 'react-select';
import { useContext } from 'react';
import { BarChartContext } from '../../context/BarChartContext';
import { computeHeadingLevel } from '@testing-library/react';

const Filter = () => {
	const { keys, setFilteredAlbums } = useContext(BarChartContext);
	// console.log(keys);

	const selectOptions = keys.map(key => {
		return { value: key, label: key };
	});

	const handleOnChange = e => {
		setFilteredAlbums(e);
	};

	return (
		<div>
			<Select
				onInputChange={() => {}}
				onChange={handleOnChange}
				options={selectOptions}
				isMulti
				className='basic-multi-select'
				classNamePrefix='select'
			/>
		</div>
	);
};

export default Filter;
