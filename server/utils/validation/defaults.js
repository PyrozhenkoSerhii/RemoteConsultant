module.exports = Object.freeze({
    language: {
        enum: [
            'Elementary', 'Beginner', 'Pre-intermediate', 'Intermediate', 'Upper-intermediate', 'Advanced', 'Proficient',
            'A2', 'B1', 'B2', 'C1', 'C2'
        ]
    },
    gender: {
        enum: [
            'male', 'female', 'unknown'
        ],
        default: 'unknown'
    },
    impact: {
        enum: [
            'buy', 'uncertain', 'not_buy'
        ],
    },
    images: {
        consultant: 'https://pngimage.net/wp-content/uploads/2018/05/consultant-png-3.png',
        customer: 'https://pngimage.net/wp-content/uploads/2018/06/profile-png-5.png',
        product: 'https://pngimage.net/wp-content/uploads/2018/06/icon-product-png-1.png',
        representative: 'https://pngimage.net/wp-content/uploads/2018/05/consultant-png-3.png',
        company: 'https://static.thenounproject.com/png/509354-200.png'
    },
    rating: 40,
    onplatform: 0,
})