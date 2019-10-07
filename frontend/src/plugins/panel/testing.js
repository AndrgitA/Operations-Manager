import { getClone, addNewType } from './panelCloning.js';
import { isEqual, addNewEqualType } from './panelEquals.js';

let a = {
    "inc": function(value) { console.log(value + 1) },
    "id": 'id_volunteer_123',
    "given_name": 'Андрей',
    "family_name": 'Антифеев',
    "age": 25,
    "avatar": { original: 'https://m.media-amazon.com/images/M/MV5BNzc0ZDYxYjYtZGQ5Ny00MGI1LThjMjgtNjE3MTJjMjc4M2ZjXkEyXkFqcGdeQXVyNjg1NTE0NjU@._V1_.jpg' },
    "status": 'Moderation', //Enum("Moderation", "Activated", "Rejected")
    "district": {
        "id": 'id_district_123',
        "value": 'Волгоград'
    },
    "counters": {
        "applications": 1, //Int?, // количество заявок
        "points": 2, //Int?, // количество баллов волонтера
        "month_rating": 3, //Int? // место в рейтинге,
        "month_points": 12
    },
    "phone": '+7 909 378 69 62',
    "birthday": '03.01.1994', //Date,
    "education": 'Высшее',
    "experience": 'Олимпийские игры в Сочи\nУниверсиада в Казани\nЧемпионат мира по фуболу в России',
    "achievements": 'Благодарность за активную помощь в орагнизации мероприятий на форуме Территория смыслов',
    "created_at": '22.02.1999_23:16', //Datetime,
    "last_activity": '02.12.1999_10:09', //Datetime,
    "rating": [
        {
            "month": 1,
            "year": 2011,
            "points": 33,
            "applications": [
                {
                    "id": "ID123",
                    "status": "Active",
                    "author": {
                        "id": "IDAUTHOR123",
                        "given_name": "Andrey",
                        "family_name": "Antifeev",
                        "phone": "+7 909 378 69 62"
                    },
                    "category": {
                        "id": "IDCATEGORY123",
                        "value": "Category material"
                    },
                    "details": "Details material 123",
                    "district": {
                        "id": "IDDISTRICT123",
                        "value": "Volgograd"
                    },
                    "address": "Kanatchikov 14, 35",
                    "date": '', // dd.mm.yyyy
                    "created_at": "12.12.2008",
                    "counters": {
                        "responses": 12
                    }
                },
                {
                    "id": "ID123",
                    "status": "Active",
                    "author": {
                        "id": "IDAUTHOR123",
                        "given_name": "Andrey",
                        "family_name": "Antifeev",
                        "phone": "+7 909 378 69 62"
                    },
                    "category": {
                        "id": "IDCATEGORY123",
                        "value": "Category material"
                    },
                    "details": "Details material 123",
                    "district": {
                        "id": "IDDISTRICT123",
                        "value": "Volgograd"
                    },
                    "address": "Kanatchikov 14, 35",
                    "date": '', // dd.mm.yyyy
                    "created_at": "12.12.2008",
                    "counters": {
                        "responses": 12
                    }
                }
            ]
        },
        {
            "month": 1,
            "year": 2010,
            "points": 33,
            "applications": [
                {
                    "id": "ID123",
                    "status": "Active",
                    "author": {
                        "id": "IDAUTHOR123",
                        "given_name": "Andrey",
                        "family_name": "Antifeev",
                        "phone": "+7 909 378 69 62"
                    },
                    "category": {
                        "id": "IDCATEGORY123",
                        "value": "Category material"
                    },
                    "details": "Details material 123",
                    "district": {
                        "id": "IDDISTRICT123",
                        "value": "Volgograd"
                    },
                    "address": "Kanatchikov 14, 35",
                    "date": '', // dd.mm.yyyy
                    "created_at": "12.12.2008",
                    "counters": {
                        "responses": 12
                    }
                },
            ]
        },
    ]
};

let b = getClone(a);
console.log(a, b, isEqual(a, b), a == b);