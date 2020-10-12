const mockData = {
	block: [{
		type: 'article',
		id: '1',
		price: '$40'
	}, {
		type: 'article',
		id: '2',
		price: '$50'
	}]
}
const maskedData = {
	block: [{
		type: 'article',
		id: '1',
		price: '***'
	}, {
		type: 'article',
		id: '2',
		price: '***'
	}]
}
console.info(JSON.stringify(maskedData));