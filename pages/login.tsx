import axios from 'axios';
import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import clientPromise from '../lib/mongodb';

const Container = styled.div``;

export default function SingleCardPage() {
	let pageHead = (
		<Head>
			<title>Welcome | MTG Invest Portfolio</title>
			<meta name='description' content='login page' />
		</Head>
	);

	return (
		<>
			{pageHead}
			<Container>
				<h1>Welcome</h1>
			</Container>
		</>
	);
}

export async function getServerSideProps() {
	const { db } = await clientPromise;
	const data = await db;
	console.log(data);

	return {
		props: {},
	};
}
