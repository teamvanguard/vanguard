-- Run these commands in SQL

-- First create the Database
CREATE DATABASE vanguard;

-- To create the users table
CREATE TABLE "users" (
    "id" serial primary key,
    "username" varchar(20),
    "password" varchar(100),
    "studentId" integer,
    "pic" varchar(300),
    "pts" integer,
    "lifetimePts" integer,
    "role" varchar(20),
    "email" varchar(50)
);

-- To create the items table
CREATE TABLE "items" (
    "id" serial PRIMARY KEY,
    "item_name" character varying(60),
    "item_description" varchar(180),
    "pts_value" integer,
    "pic" varchar(300),
    "school_community" Boolean,
    "last_edit_user_id" integer references "users"
);

-- To create the challenges table
CREATE TABLE "challenges" (
    "id" serial primary key,
    "name" character varying(60),
    "description" varchar(180),
    "start_date" Date,
    "end_date" Date,
    "pts_value" integer,
    "teacher_id" integer references "users"
);

-- To create the transactions table
CREATE TABLE transactions (
    "id" serial primary key,
    "sutdentId" integer REFERENCES "users",
    "pts" integer,
    "employeeId" integer REFERENCES "users",
    "timestamp" TIMESTAMP WITH TIME ZONE,
    "itemId" integer REFERENCES "items",
    "challengeID" integer REFERENCES "challenges"
);

-- To create the student_challenge table
CREATE TABLE student_challenge (
    "id" serial primary key,
    "sudentId" integer REFERENCES "users",
    "challengeId" integer REFERENCES "challenges",
    "pass" boolean
);

--Your database is ready
