import './App.css';
import Dashboard from './components/Dashboard';
import { BarChartContextProvider } from './context/BarChartContext';

function App() {
	return (
		<div className='App'>
			<BarChartContextProvider>
				<Dashboard />
			</BarChartContextProvider>
		</div>
	);
}

export default App;
