const maskJson = require('./index')('***');
describe('mask-util', () => {
    describe('maskJsons', () => {
        it('should mask given field', function () {
            const mockData = {
                type: 'articles',
                id: '1',
                price: '$40'
            }
            const maskedData = {
                type: 'articles',
                id: '1',
                price: '***'
            }
            expect(maskJson(mockData, ['price'])).toEqual(maskedData);
        });
        it('should mask given field even if it is null', function () {
            const mockData = {
                type: 'articles',
                id: '1',
                price: 'null',
                parts: null
            }
            const maskedData = {
                type: 'articles',
                id: '1',
                price: '***',
                parts: null
            }
            expect(maskJson(mockData, ['price', 'parts[].good'])).toEqual(maskedData);
        });
        it('should mask given nested field', function () {
            const mockData = {
                block: {
                    type: 'articles',
                    id: '1',
                    price: '$40'
                }
            }
            const maskedData = {
                block: {
                    type: 'articles',
                    id: '1',
                    price: '***'
                }
            }
            expect(maskJson(mockData, ['block.price'])).toEqual(maskedData);
        });
        it('should mask field inside array elements', function () {
            const mockData = [{
                type: 'article',
                id: '1',
                price: '$40'
            }, {
                type: 'article',
                id: '2',
                price: '$50'
            }]
            const maskedData = [{
                type: 'article',
                id: '1',
                price: '***'
            }, {
                type: 'article',
                id: '2',
                price: '***'
            }]
            expect(maskJson(mockData, ['[].price'])).toEqual(maskedData);
        });
        it('should mask field inside nested array elements', function () {
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
            expect(maskJson(mockData, ['block[].price'])).toEqual(maskedData);
        });
        it('should mask field inside deeply nested array elements', function () {
            const mockData = {
                topLevel: [{
                    block: [{
                        type: 'article',
                        id: '1',
                        price: '$40'
                    }, {
                        type: 'article',
                        id: '2',
                        price: '$50'
                    }]
                }, {
                    block: [{
                        type: 'article',
                        id: '3',
                        price: '$50'
                    }, {
                        type: 'article',
                        id: '4',
                        price: '$60'
                    }]
                }]
            };
            const maskedData = {
                topLevel: [{
                    block: [{
                        type: 'article',
                        id: '1',
                        price: '***'
                    }, {
                        type: 'article',
                        id: '2',
                        price: '***'
                    }]
                }, {
                    block: [{
                        type: 'article',
                        id: '3',
                        price: '***'
                    }, {
                        type: 'article',
                        id: '4',
                        price: '***'
                    }]
                }]
            }
            expect(maskJson(mockData, ['topLevel[].block[].price'])).toEqual(maskedData);
        });
        it('should mask multiple fields inside deeply nested array elements', function () {
            const mockData = {
                topLevel: [{
                    block: [{
                        type: 'article',
                        id: '1',
                        price: '$40'
                    }, {
                        type: 'article',
                        id: '2',
                        price: '$50'
                    }]
                }, {
                    block: [{
                        type: 'article',
                        id: '3',
                        price: '$50'
                    }, {
                        type: 'article',
                        id: '4',
                        price: '$60'
                    }]
                }]
            };
            const maskedData = {
                topLevel: [{
                    block: [{
                        type: '***',
                        id: '1',
                        price: '***'
                    }, {
                        type: '***',
                        id: '2',
                        price: '***'
                    }]
                }, {
                    block: [{
                        type: '***',
                        id: '3',
                        price: '***'
                    }, {
                        type: '***',
                        id: '4',
                        price: '***'
                    }]
                }]
            }
            expect(maskJson(mockData, ['topLevel[].block[].price', 'topLevel[].block[].type'])).toEqual(maskedData);
        });

        it('should ignore null values if any', function () {
            const mockData = {
                topLevel: [{
                    block: [{
                        type: 'article',
                        id: '1',
                        price: '$40'
                    }, {
                        type: 'article',
                        id: '2',
                        price: '$50'
                    }]
                }],
                personaInformation: null
            };
            const maskedData = {
                topLevel: [{
                    block: [{
                        type: 'article',
                        id: '1',
                        price: '***'
                    }, {
                        type: 'article',
                        id: '2',
                        price: '***'
                    }]
                }],
                personaInformation: null
            }
            expect(maskJson(mockData, ['topLevel[].block[].price', 'personaInformation.address'])).toEqual(maskedData);
        });
    })
})