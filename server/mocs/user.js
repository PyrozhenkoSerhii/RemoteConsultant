export default {
    'valid': {
        'username':'test_username',
        'email':'test@test.com',
        'password':'TestPass123',
        'age': 25
    },
    'existing': {
        'username': 'test_username',
        'email': 'test@test.com',
        'password': 'TestPass123',
        'age': 25
    },
    'empty': {},
    'auth': {
        'email': 'test@test.com',
        'password': 'TestPass123'
    },
    'authMissed': {
        'email': 'test@test.com'
    },
    'update': {
        'field':'username',
        'value':'new_test_username'
    },
    'wrongUsername': {
        'username': '',
        'email': 'test@test.com',
        'password': 'TestPass123',
        'age': 25
    },
    'wrongEmail': { 
        'username': 'test_username',
        'email': '@test.com',
        'password': 'TestPass123',
        'age': 25
    },
    'wrongEmail2': {
        'username': 'test_username',
        'email': 'test@.com',
        'password': 'TestPass123',
        'age': 25
    },
    'wrongEmail3': {
        'username': 'test_username',
        'email': 'test@test',
        'password': 'TestPass123',
        'age': 25
    },
    'wrongPassword': {
        'username':'test_username',
        'email':'test@test.com',
        'password':'wrong pass',
        'age': 25
    },
    'wrongAge': {
        'username':'test_username',
        'email':'test@test.com',
        'password':'TestPass123',
        'age': 1
    },
    'wrongImage': {
        'username':'test_username',
        'email':'test@test.com',
        'password':'TestPass123',
        'age': 25,
        'image': 'wrong image url'
    }
}