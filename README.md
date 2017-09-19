## Vanguard-Tech

VT Is a full-stack mobile-responsive web application that promotes student engagement through a student driven challenge/rewards system. Teachers will provide challenges for student body.  Students will be able to accept and complete challenges.  Once a challenge is completed a student will be awarded points.  The points will be redeemable at the school store, which is maintained by a designated store manager.

## Built With
SQL    Javascript    Heroku        Express    Moment.js    Xditable    AngularJS    HTML 5    CSS 3        Bootstrap    Filestack    NodeMailer    Node       GoogleAuth

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

In Terminal
Run
```
npm install
```

## Prerequisites

Link to software that is required to install the app (e.g. node).
- [Node.js] (https://nodejs.org/en/)


## Installing
- To set up database
- read "database.sql" (located in the database.setup folder)
- Follow the steps
- 1) Creates the Database
- 2-6 Set Up tables within Database
7-13) open all files in database.setup folder(except database.sql)
- Run each file as a command in SQL
- Review .env-dist file.
- Add your own API keys

## Screen Shot

## Documentation

https://docs.google.com/document/d/1reOmnQ5pv6OZLIB4gQclkk26dDy_RVTzoVU5bx1FV_Q/edit

## Completed Features
- Students View
- View all challenges, view accepted challenges
- Accept challenges
- View all rewards

Teacher View
- View all challenges and/or challenges only by logged-in teacher
- Ability to create, update, and delete challenges
- Can mark students “incomplete” or award them points

Store Manager View
- Ability to add, update, and delete items
- Sell items to students (deducts from quantity, and deducts students points)


## Next Steps
- Students can select their teachers/schedule
- Teacher can assign challenges to specific classes
- Different types of challenges teachers can make
- (Completed) Pass/Fail Challenges (a value that is either received or not)
- Gradient Challenges (a value between x and y can be received)
- Teachers can give points to an individual student for positive behavior.
- The ability for teachers to “warn” a student if in danger of missing a challenge
- A social Leader-board for all students to see the “Top-10 Lifte-time Points”
- Admin diagnostics
- Admin can view
- Number of points awarded per week
- Number of points redeemed per week
- How many teachers made challenges
- How many students are participating

## Deployment

To deploy with Heroku follow the Node.js Documentation
Heroku-Deploy

## Authors

Antonio Rice
Ben Siegel
Brendin Barone
Dexter St.Pierre
Ale Leyva
