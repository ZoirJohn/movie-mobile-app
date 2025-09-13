import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Index = () => {
	return (
		<View>
			<Text>Index</Text>
			<Link className='mt-4' href={{ pathname: '/movies/[id]', params: { id: '123' } }}>Shall we start</Link>
		</View>
	)
}

export default Index