-- Run these commands in SQL

-- First create the Database
CREATE DATABASE vanguard;

-- To create the users table
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(60) UNIQUE,
  "password" varchar(100),
  "name" varchar(50),
  "student_id" integer UNIQUE,
  "pic" varchar(300),
  "pts" integer,
  "lifetime_pts" integer,
  "role" varchar(20),
  "email" varchar(60) UNIQUE,
  "employee_id" integer UNIQUE
);

-- To create the items table
CREATE TABLE "items" (
  "id" serial PRIMARY KEY,
  "item_name" character varying(60) NOT NULL,
  "item_description" varchar(180) NOT NULL,
  "pts_value" integer NOT NULL,
  "pic" varchar(300) NOT NULL,
	"qty" integer,
  "school_community" Boolean NOT NULL,
  "last_edit_user_id" integer references "users" ON DELETE SET NULL
);

-- To create the challenges table
CREATE TABLE "challenges" (
  "id" serial primary key,
  "challenge_name" character varying(60) NOT NULL,
  "description" varchar(180),
  "start_date" varchar(60) NOT NULL,
  "end_date" varchar(60) NOT NULL,
  "pts_value" integer NOT NULL,
  "teacher_id" integer references "users" ON DELETE CASCADE
);

-- To create the transactions table
CREATE TABLE transactions (
  "id" serial primary key,
  "student_id" integer REFERENCES "users" ON DELETE CASCADE NOT NULL,
  "pts" integer NOT NULL,
  "employee_id" integer REFERENCES "users" ON DELETE SET NULL,
  "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL,
  "item_id" integer REFERENCES "items" ON DELETE SET NULL,
  "challenge_id" integer REFERENCES "challenges" ON DELETE SET NULL,
  "type" varchar(10) NOT NULL
);

-- To create the student_challenge table

CREATE TABLE student_challenge (
  "id" serial primary key,
  "student_id" integer REFERENCES "users" ON DELETE CASCADE NOT NULL,
  "challenge_id" integer REFERENCES "challenges" ON DELETE CASCADE NOT NULL,
  "pass" boolean DEFAULT 'true' NOT NULL,
  "timestamp" timestamp with time zone NOT NULL
);

--Your database is ready
