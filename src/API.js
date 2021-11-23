import axios from 'axios';
import { useState } from 'react';

const UsersUrl = 'https://jsonplaceholder.typicode.com/users';
const AlbumsUrl = 'https://jsonplaceholder.typicode.com/albums';
const PhotosUrl = 'https://jsonplaceholder.typicode.com/photos';

export const getUsers = async () => {
	try {
		const { data } = await axios.get(UsersUrl);

		const users = data.map(user => {
			return { id: user.id, email: user.email };
		});

		return users;
	} catch (error) {
		console.log(error);
	}
};

export async function getAlbums() {
	try {
		const { data } = await axios.get(AlbumsUrl);
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const getPhotos = async () => {
	try {
		const { data } = await axios.get(PhotosUrl);
		return data;
	} catch (error) {
		console.log(error.message);
	}
};
