
## Description

Simple api using Mongoose in an NestJs API to connect and use a mongodb database.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Request

There are two endpoints: /teachers and /students. Both feature the same requests, but with different schema for creating and patching. Also, teachers can be gotten or deleted by their id while students do the same by their TIA number.
```Javascript
interface Student {
  name: string;
  tia: number;
  course: string;
}

interface Teacher {
  name: string;
  subject: string;
  department: string;
}
```

```http
Post: http://localhost:3000/teachers/
# Body: JSON of name, subject, department
# Returns: The id of the entry in the database

Get: http://localhost:3000/teachers/
# Returns: Array of all teachers in the DB, with all fields included + their database id

Get: http://localhost:3000/teachers/<id>
# Returns: Teacher with all fields included + their database id

Patch: http://localhost:3000/teachers/
# Body: JSON of id of Teacher to be updated and any of the fields to update in the db
# Returns: Updated Teacher with all fields included + their database id

Delete: http://localhost:3000/teachers/<id>
# Returns: JSON with message confirming deletion from database
```

## Test
No tests implemented (yet)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
