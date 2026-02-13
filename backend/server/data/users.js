// import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'jiteshgoodboy.0109@gmail.com',
        password: '12345678', // In real app, hash this. simplified for demo
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123',
        isAdmin: false,
    },
];

export default users;
