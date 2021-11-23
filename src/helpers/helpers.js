/**
 * @param {*} array
 * @param {*} num default 7
 * @returns an array of num elements
 */
export const getRandomUsers = (array = [], num = 7) => {
	const shuffled = shuffleArray(array);
	const randArray = shuffled.slice(0, num);
	return randArray;
};

/**
 * shuffles array elements
 */
const shuffleArray = array => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

/**
 * @param photo array
 * returns a map of number of photos in each album
 */
export const mapSongCountToAlbum = photos => {
	let albumSongCountMap = new Map();
	photos.forEach(photo => {
		const albumId = photo.albumId;
		if (!albumSongCountMap.has(albumId)) {
			albumSongCountMap.set(albumId, 1);
		} else {
			albumSongCountMap.set(albumId, albumSongCountMap.get(albumId) + 1);
		}
	});
	return albumSongCountMap;
};

/**
 * groupBy array by field
 */
export const groupBy = (array, key) => {
	return array.reduce((result, currentValue) => {
		(result[currentValue[key]] = result[currentValue[key]] || []).push(
			currentValue
		);
		return result;
	}, {});
};

/**
 * @param {*} albumSongCountMap
 * @param {*} albums
 * @returns
 */
export const replaceAlbIdWithName = (albumSongCountMap, albums) => {
	albumSongCountMap.forEach((value, key) => {
		albumSongCountMap[albums.find(a => a.id === key).title] = value;
		albumSongCountMap['albumTitle'] = value;
	});
	return albumSongCountMap;
};

/**
 * @param {*} albums all albums from API
 * @param {*} userIds
 * @returns only albums whose userId in userIds array
 */
export const getSelectUsrAlbumTitles = (albums = [], userIds = []) => {
	return albums
		.filter(album => userIds.includes(album.userId))
		.map(album => album.title);
};

/**
 * random int generator with min max range
 */
const rand = (min, max) => {
	return Math.floor(min + Math.random() * (max - min));
};

/**
 *generates random hsl colors
 */
export const get_random_color = () => {
	var h = rand(1, 360);
	var s = rand(0, 100);
	var l = rand(0, 100);
	return 'hsl(' + h + ',' + s + '%,' + l + '%)';
};
