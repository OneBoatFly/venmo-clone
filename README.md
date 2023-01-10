# Vinmo

Live site here: https://venmo-clone.onrender.com/

Vinmo is a clone of venmo.com. The site allows registered users to request for and make payments with others. A registered user can create a payment request and send the request to one or multiple other registered users. A user can also send payment directly to other users. A user can view it's transaction history and open requests, and add or unfriend other users.

## TechStack

### Languages

![html5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![js](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)

### Frameworks and Libraries

![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![socket](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)


### Database:

![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-100000?style=for-the-badge&logo=sql&logoColor=BA1212&labelColor=AD0000&color=A90000)

### Hosting:

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)


## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

# Features

## Home Page
The home page provides a user sign in and sign up options, as well as a demo user option. By clicking on the buttons, a user will be taken to the sign in or sign up pages.
### Sign In
![login](https://user-images.githubusercontent.com/34921536/210405112-cb96c94f-f860-48c0-adf2-e041d38ee832.gif)

### Sign Up
![signup](https://user-images.githubusercontent.com/34921536/210413515-414bed14-2c10-458d-875c-9e2dc411330a.gif)

### Demo User
![demouser](https://user-images.githubusercontent.com/34921536/210413538-7bcf4461-8958-4009-a2a1-ccda34792657.gif)

### Logout
![logout](https://user-images.githubusercontent.com/34921536/210413557-e8083c54-986b-43a1-8c69-d455c8e71ec2.gif)

## Open Requests
A user can see all pending requests from and to the user. If the request is from the user, the user can cancel or edit it. If the request is to the user, the user an choose to decline or make a payment.

### Create Request (Live)
![request-create-live](https://user-images.githubusercontent.com/34921536/210414610-41a08a95-ae15-4be2-9dac-c8887b53bef9.gif)

### Request From
![request-from](https://user-images.githubusercontent.com/34921536/210413576-88acca8a-9018-481b-88a4-cdab4ccf09fc.gif)

### Request To
![request-to](https://user-images.githubusercontent.com/34921536/210413587-6f93a5ac-18a6-4fbc-85b7-700d006ce093.gif)


## Friends
A user can see all it's current confirmed friends and pending friend requests. If the request is from the user, the user can cancel the request. If the request is to the user, the user can accept the request. If the friend is confirmed friend, the user can choose to unfriend.

### Send Request (Live)
![friends-add](https://user-images.githubusercontent.com/34921536/210413640-2956917a-4688-4bc7-a670-bcb7dc882713.gif)

### Unfriend
![friends-unfriend](https://user-images.githubusercontent.com/34921536/210413622-0d571b05-bbac-4ef9-bf9c-3f9e68e0d49d.gif)

### Cancel
![friends-cancel](https://user-images.githubusercontent.com/34921536/210413627-77ca0b34-4b23-40d5-afec-355814dcf414.gif)

### Accept
![friends-accept](https://user-images.githubusercontent.com/34921536/210413683-1b448d19-c58a-44d7-b41a-23d6555a7094.gif)

## Transactions
A user can look at theirs and friends transaction histories and can make new payments. On the transaction history page, a user can also like or cancel like of a transaction. By clicking on the comment icon, a user can go into the specific transaction and make comments.

### User and Friend Transactions History
![trans-history](https://user-images.githubusercontent.com/34921536/210413718-69d43301-0e85-4ad8-b775-402113ab179c.gif)

### Like and Unlike
![trans-like](https://user-images.githubusercontent.com/34921536/210413726-5b3893f2-e8ce-411b-94ea-3be4abd2358c.gif)

### Comment
![trans-comment](https://user-images.githubusercontent.com/34921536/210413741-29d1ab10-ef03-4538-b7f3-48e5c2c70c2b.gif)
