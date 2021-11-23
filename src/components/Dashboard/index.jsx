import React, { useEffect, useContext } from 'react';
import './dashboard.css';
import BarChart from '../BarChart';
import '../../utils.css';
import Filter from '../Filter';

import { BarChartContext } from '../../context/BarChartContext';
import Spinner from '../Loading/Loading';

const Dashboard = () => {
	const { data, keys, isLoading } = useContext(BarChartContext);
	useEffect(() => {
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
						<Filter />
					</div>
					{isLoading ? <Spinner /> : <BarChart data={data} keys={keys} />}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
