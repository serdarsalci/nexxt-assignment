import React, { useEffect, useContext } from 'react';
import './dashboard.css';
import BarChart from '../BarChart';
import '../../utils.css';
import Filter from '../Filter';

import { BarChartContext } from '../../context/BarChartContext';

const Dashboard = () => {
	const { data, keys } = useContext(BarChartContext);
	useEffect(() => {
		// console.log('Dashboard UseEffect called');
		// console.log(data);
		// console.log(keys);
		return () => {
			console.log('Dashboard unmounted');
		};
	});

	return (
		<div className='dashboard'>
			<div className='dashboard-container'>
				<h2>Demo Dash</h2>
				<div className='content'>
					<div className='header'>
						<span id='chart-title'>Photos Per Person</span>
						<div className='filter-container'>
							<span id='filter-out'>FILTER OUT</span>
							<div className='filter'>
								<Filter />
							</div>
						</div>
					</div>
					<BarChart data={data} keys={keys} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
