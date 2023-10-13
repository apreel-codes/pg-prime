import bcrypt from 'bcryptjs';

const data = {
    users: [
            {
                name: 'Idris',
                email: 'admin@example.com',
                password: bcrypt.hashSync('123456'),
                isAdmin: true
            },
            {
                name: 'Kelvin',
                email: 'user@example.com',
                password: bcrypt.hashSync('123456'),
                isAdmin: false
            },
    ],
    products: [
        {   
            // _id: '1',
            name: "Brown Leather",
            slug: 'brown-leather-shoe',
            category: 'Sneakers',
            image: '/images/three.jpg',
            price: 120,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality',
            countInStock: 4,
            
        },
        {   
            // _id: '2',
            name: "Red Leather",
            slug: 'red-leather-shoe',
            category: 'Sneakers',
            image: '/images/two.jpg',
            price: 150,
            brand: 'Adidas',
            rating: 5,
            numReviews: 15,
            description: 'High quality',
            countInStock: 3,
        },
        {   
            // _id: '3',
            name: "Black Leather",
            slug: 'black-leather-shoe',
            category: 'Sneakers',
            image: '/images/three.jpg',
            price: 190,
            brand: 'Puma',
            rating: 7.5,
            numReviews: 20,
            description: 'High quality',
            countInStock: 8
        },
    ]
}

export default data;