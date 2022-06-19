# crud-api
   <p align="center">
    	<img src="https://techvccloud.mediacdn.vn/2018/11/30/crud-15435683934502144104962-crop-1543568398584927543865.png" alt="Logo" height="300">
  </p>

**Task:** https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md

## 1 - Install Dependencies

`npm install`

## 2 - Run with Modes

| Mode       | Command               | Description                                                                     |
|------------|-----------------------|---------------------------------------------------------------------------------|
| Dev Mode   | `npm run start:dev`   | Use nodemon and ts-node                                                         |
| Prod Mode  | `npm run start:prod`  | Use webpack to make a build and run it with node                                |
| Multi Mode | `npm run start:multi` | Use webpack to make a build and run it with node with MULTI env to run clusters |
| Test Mode  | `npm run test`        | Run test scenarios                                                              |
`
## 3 - Check API via Postman

| #   | Method | Route                                       | Body Data                                                               | Description                |
|-----|--------|---------------------------------------------|-------------------------------------------------------------------------|----------------------------|
| 1   | GET    | `http://localhost:5000/api/users/`          |                                                                      | Get all users              |
| 2   | POST   | `http://localhost:5000/api/users/`          | Body -> raw + JSON (required properties: "username", "age", "hobbies")  | Create new user            |
| 3   | GET    | `http://localhost:5000/api/users/${userId}` |                                                                       | Get the particular user    |
| 4   | PUT    | `http://localhost:5000/api/users/${userId}` | Body -> raw + JSON (any properties: "username", "age", "hobbies")       | Update the particular user |
| 5   | DELETE | `http://localhost:5000/api/users/${userId}` |                                                                        | Delete the particular user |



