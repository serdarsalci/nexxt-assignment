import { createContext, useState, useEffect } from 'react';
import { getAlbums, getPhotos, getUsers } from '../API.js';
import {
	getRandomUsers,
	getSelectUsrAlbumTitles,
	mapSongCountToAlbum,
	get_random_color,
	groupBy,
} from '../helpers/helpers.js';
export const BarChartContext = createContext();

export const BarChartContextProvider = ({ children }) => {
	const [keys, setKeys] = useState([]);
	const [keysFiltered, setKeysFiltered] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [chartDataFiltered, setChartDataFiltered] = useState([]);
	const [selectedAlbums, setSelectedAlbums] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [randomUsers, setRandomUsers] = useState([]);

	const [groupedAlbums, setGroupedAlbums] = useState([]);
	const [albumPhotoCounts, setAlbumPhotoCounts] = useState([]);

	const getDataFromApiSetStates = async () => {
		setIsLoading(true);
		const photos = await getPhotos();
		const albums = await getAlbums();
		const users = await getUsers();
		const randomUsers = getRandomUsers(users, 7);
		const albumPhotoCounts = mapSongCountToAlbum(photos);
		const selectedUserIds = randomUsers.map(user => user.id);
		const selectedUsersAlbTitles = getSelectUsrAlbumTitles(
			albums,
			selectedUserIds
		);

		// group arrays by userId to prevent iterating through whole array
		const groupedAlbums = groupBy(albums, 'userId');
		console.log(groupedAlbums);

		// create chartData object from each random 7 users
		const chartData = randomUsers.map(({ id, email }) => {
			const userAlbums = {};
			groupedAlbums[id].forEach(alb => {
				userAlbums[`${alb.title}`] = albumPhotoCounts.get(alb.id);
			});
			return { email: email, ...userAlbums };
		});

		setGroupedAlbums(groupedAlbums);
		setAlbumPhotoCounts(albumPhotoCounts);
		setRandomUsers(randomUsers);
		setKeys(selectedUsersAlbTitles);
		setChartData(chartData);
		setChartDataFiltered(chartData);
		setKeysFiltered(selectedUsersAlbTitles);
		setIsLoading(false);
	};

	useEffect(() => {
		getDataFromApiSetStates();
	}, []);

	/**
	 * in no album filtered set filteredChartData to chartData
	 */
	const filterSelectedAlbums = () => {
		if (selectedAlbums.length === 0) {
			setChartDataFiltered(chartData);
			setKeysFiltered(keys);
		}

		// re-create chartData object from each random 7 users with filtered albums
		const filteredChartData = randomUsers.map(({ id, email }) => {
			let userAlbums = {};
			groupedAlbums[id].forEach(alb => {
				if (alb.userId === id && !selectedAlbums.includes(alb.title)) {
					userAlbums[`${alb.title}`] = albumPhotoCounts.get(alb.id);
				}
			});
			return { email: email, ...userAlbums };
		});

		const selectedAlbumKeys = selectedAlbums.map(selected => {
			return selected.value;
		});

		const filteredKeys = keys.filter(key => !selectedAlbumKeys.includes(key));

		setChartDataFiltered(filteredChartData);
		setKeysFiltered(filteredKeys);
	};

	useEffect(() => {
		filterSelectedAlbums();
	}, [selectedAlbums]);

	return (
		<BarChartContext.Provider
			value={{
				data: chartDataFiltered,
				keys: keysFiltered,
				setSelectedAlbums,
				isLoading,
			}}>
			{children}
		</BarChartContext.Provider>
	);
};
