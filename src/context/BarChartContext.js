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
	const [randomUserEmails, setRandomUserEmails] = useState([]);
	const [keys, setKeys] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [filteredAlbums, setFilteredAlbums] = useState([]);

	const getUsersData = async () => {
		const users = await getUsers();
		const photos = await getPhotos();
		const albums = await getAlbums();
		const randomUsers = getRandomUsers(users, 7);
		const albumPhotoCounts = mapSongCountToAlbum(photos);

		const selectedUserIds = randomUsers.map(user => user.id);
		const filteredAlbumTitles = getSelectUsrAlbumTitles(
			albums,
			selectedUserIds
		);
		console.log(filteredAlbumTitles);
		setKeys(filteredAlbumTitles);

		const groupedAlbums = groupBy(albums, 'userId');

		const userData = randomUsers.map(({ id, email }, ind) => {
			console.log(groupedAlbums[id]);
			let userAlbums = {};
			groupedAlbums[id].forEach(alb => {
				if (alb.userId == id) {
					userAlbums[`${alb.title}`] = albumPhotoCounts.get(alb.id);
					userAlbums[`${alb.title}Color`] = get_random_color();
				}
			});
			return { email: email, ...userAlbums };
		});
		setChartData(userData);
	};

	useEffect(() => {
		getUsersData();
	}, []);

	useEffect(() => {
		console.log(filteredAlbums);
	}, [filteredAlbums]);

	return (
		<BarChartContext.Provider
			value={{ data: chartData, keys: keys, setFilteredAlbums }}>
			{children}
		</BarChartContext.Provider>
	);
};

// export default BarChartContext;
