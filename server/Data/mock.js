const { v4: uuidv4 } = require('uuid');

const courses = [
    {
        id: uuidv4(),
        name: 'İleri seviye MERN Stack uygulama geliştirme',
        description: 'İleri seviye tekniklerle MERN stack uygulama geliştirme',
        status: 'Taslak',
        instructorId: 'f1099bd3-924f-457b-aff7-5d3510b92d97'
    },
    {
        id: uuidv4(),
        name: 'İleri seviye GraphQL uygulama geliştirme',
        description: 'İleri seviye tekniklerle GraphQL uygulama geliştirme',
        status: 'Pasif',
        instructorId: 'bd5929ba-928e-4fa2-b105-8f39518827f4'
    },
    {
        id: uuidv4(),
        name: 'VueJS 3 Eğitim Serisi',
        description: '0 dan 100 e VueJS 3 Eğitimi',
        status: 'Yayında',
        instructorId: '733fc564-de86-47c5-a63c-ff31fdffb8d4'
    },
];

const instructors = [
    {
        id: '733fc564-de86-47c5-a63c-ff31fdffb8d4',
        name: 'Ahmet Altun',
        email: 'ahmetaltun@merng.dev'
    },
    {
        id: 'bd5929ba-928e-4fa2-b105-8f39518827f4',
        name: 'Maximilian Schwarmüller',
        email: 'schwarzmuller@merng.dev'
    },
    {
        id: 'f1099bd3-924f-457b-aff7-5d3510b92d97',
        name: 'Jonas Schmedtmann',
        email: 'jonas@merng.dev'
    }
];

module.exports = {
    courses,
    instructors
};