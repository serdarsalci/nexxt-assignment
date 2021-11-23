import { getAlbums, getPhotos } from './src/API.js';

// const groupBy = async (photos = []) => {
// 	let obj = new Map();

// 	photos.forEach(photo => {
// 		const albumId = photo.albumId;
// 		// console.log(albumId);
// 		if (!obj.has(albumId)) {
// 			// console.log('not there');
// 			obj.set(albumId, 1);
// 			// obj[albumId]++;
// 		} else {
// 			obj.set(albumId, obj.get(albumId) + 1);
// 		}
// 	});

// 	// console.log(obj);
// 	// return obj;
// };

// const replaceAlbumIdWithName = (obj, albums) => {
// 	obj.forEach((value, key) => {
// 		console.log(key);
// 		console.log(value);
// 		obj[albums.find(a => a.id == key).title] = value;
// 	});
// 	return obj;
// };

const albums = await getAlbums();

// console.log(albums);
const photos = await getPhotos();



const grouped = groupPhotosByAlbum(photos);

const renamed = replaceAlbIdWithName(grouped, albums);
