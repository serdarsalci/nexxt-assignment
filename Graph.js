import React, { useState, useEffect } from 'react';
import { getPhotos, getUsers, getAlbums } from './src/API.js';
// import { getAlbums } from '../API';

const Graph = () => {
	const [users, setUsers] = useState([]);
	useEffect(async () => {
		const res = await getUsers();

		const albums = await getAlbums();

		const photos = await getPhotos();

		let albumPhotoNums = {};

		var samplePhotoArr = [
			{
				albumId: 1,
				id: 1,
				title: 'accusamus beatae ad facilis cum similique qui sunt',
				url: 'https://via.placeholder.com/600/92c952',
				thumbnailUrl: 'https://via.placeholder.com/150/92c952',
			},
			{
				albumId: 1,
				id: 2,
				title: 'reprehenderit est deserunt velit ipsam',
				url: 'https://via.placeholder.com/600/771796',
				thumbnailUrl: 'https://via.placeholder.com/150/771796',
			},
		];

		let obj = new Map();

		photos.forEach(photo => {
			const albumId = photo.albumId;
			// console.log(albumId);
			if (!obj.has(albumId)) {
				console.log('not there');
				obj.set(albumId, 1);
				// obj[albumId]++;
			} else {
				obj.set(albumId, obj.get(albumId) + 1);
			}
		});

		const replaceAlbIdWithName = (obj, albums) => {
			obj.forEach((value, key) => {
				console.log(key);
				console.log(value);
				obj[albums.find(a => a.id == key).title] = value;
				// delete obj.key;
			});
			return obj;
		};

		const renamed = replaceAlbIdWithName(obj, albums);

		console.log(renamed);

		const groupedPhotos = groupBy(photos, photo => photo.albumId);
		// console.log(groupedPhotos);
		let values = Array.from(groupedPhotos.values());

		groupedPhotos.forEach(p => {});
		// console.log(typeof groupedPhotos);
		console.log(groupedPhotos['size']);
	}, []);
};

// const groupBy = (items, key) =>
// 	items.reduce(
// 		(result, item) => ({
// 			...result,
// 			[item[key]]: [...(result[item[key]] || []), item],
// 		}),
// 		{}
// 	);

function groupBy(list, keyGetter) {
	const map = new Map();
	list.forEach(item => {
		const key = keyGetter(item);
		// console.log(key);
		const collection = map.get(key);

		if (!collection) {
			map.set(key, [item]);
		} else {
			collection.push(item);
		}
	});
	return map;
}
