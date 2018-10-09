# Medical Rotations App

## Introduction
This application was built as a capstone solo project at Prime Digital Academy. This application was built in coordination with Dr. Steve Richardson at the University of Minnesota. Steve Richardson is an anesthesiology resident who, along with his co-residents, is responsible for the education of Medical Students as they undertake their Anesthesia rotation. This application provides medical residents a means to track their students' progress for the 2 week duration of the students' rotation. For students this application provides a means of personalizing their experience and recording accumulated experiece.

## Overview
### For Students

When signing up a student will fill out an intial questionnaire detailing their background, their interests as well as setting goals for themselves to pursue over the next two weeks. The students set goals for the following procedures: 
* Arterial Line
* Central Line
* IV
* Intubation
* Mask Ventilation
* Assessment of ASA Score
* LMA Insertion
* Airway Management

Students will set a numerical goal for each procedure. Each day students will record the progress toward their goals on a feedback form. Additionally students will record which topics they discussed with their resident as well as select topics to discuss with their resident the following day.

### For Residents
Residents will be able to view a summary of all their current active students with a summary of how much progress they have made through their goals. Residents can select a student and see more details about their interests and goals.

Residents can also view a table of all feedback submitted by their students organixzed by date. Each list item displays how much goal progress that student made, as well as the topics of discussion selected for the folliwng day. Individual feedback entries can be clicked on to view the entry in more detail.

### For Administrators

Admins have access to a unique page where they can manage residents, students, discussion topics, and attending physician lists.


## Technologies Used
- ReactJS
- PostgreSQL
- Node.js
- Express
- Passport
- Redux
- Redux-Saga
- Material-UI
- Node-Cron
- Node Mailer

## Implementing and Running

1. Clone or download this repository 

2. `npm install`

3. Create a .env file with the following keys: 
```
SERVER_SESSION_SECRET=long random string

EMAIL=functioningEmailAccount
PASSWORD=functioningEmailAccountPassword
```

4. Create the SQL database `CREATE DATABASE medical_rotations_1`

5. Setup the structure in the following way:


```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE,
    password character varying(1000) NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    admin boolean NOT NULL DEFAULT false,
    resident boolean NOT NULL DEFAULT false,
    active boolean NOT NULL DEFAULT false
);

CREATE TABLE resident_code (
    id SERIAL PRIMARY KEY,
    resident_code integer
);

CREATE TABLE initial_survey (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    year integer NOT NULL,
    applying_to text,
    applied_to text,
    matched_in text,
    interested_in text[],
    letter_interest character varying(10) NOT NULL,
    intubations integer NOT NULL,
    iv integer NOT NULL,
    mask_ventilated integer NOT NULL,
    central_line integer NOT NULL,
    run_ventilator boolean NOT NULL DEFAULT false,
    arterial_line integer NOT NULL
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    iv integer NOT NULL DEFAULT 0,
    a_line integer NOT NULL DEFAULT 0,
    mask_ventilation integer NOT NULL DEFAULT 0,
    insert_lma integer NOT NULL DEFAULT 0,
    intubation integer NOT NULL DEFAULT 0,
    planned_airway_management integer NOT NULL DEFAULT 0,
    airway_assessment integer NOT NULL DEFAULT 0,
    assess_asa_score integer NOT NULL DEFAULT 0
);

CREATE TABLE feedback_previous_discussion_topics (
    id SERIAL PRIMARY KEY,
    discussion_topic_id integer REFERENCES discussion_topics(id),
    feedback_id integer REFERENCES feedback(id)
);

CREATE TABLE feedback_discussion_topics (
    id SERIAL PRIMARY KEY,
    discussion_topic_id integer REFERENCES discussion_topics(id),
    feedback_id integer REFERENCES feedback(id)
);

CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id),
    date date NOT NULL,
    resident integer REFERENCES users(id),
    attending_physician character varying(255),
    ventilator_settings boolean NOT NULL DEFAULT false,
    induction_drugs boolean NOT NULL DEFAULT false,
    inhaled_agents boolean NOT NULL DEFAULT false,
    vasopressors boolean NOT NULL DEFAULT false,
    monitors boolean NOT NULL DEFAULT false,
    airway_management boolean NOT NULL DEFAULT false,
    iv integer NOT NULL DEFAULT 0,
    a_line integer NOT NULL DEFAULT 0,
    mask_ventilation integer NOT NULL DEFAULT 0,
    insert_lma integer NOT NULL DEFAULT 0,
    intubation integer NOT NULL DEFAULT 0,
    planned_airway_management integer NOT NULL DEFAULT 0,
    airway_assessment integer NOT NULL DEFAULT 0,
    assess_asa_score integer NOT NULL DEFAULT 0,
    applied_monitors character varying(10) NOT NULL DEFAULT 'None'::character varying,
    setup_room character varying(10) NOT NULL DEFAULT 'None'::character varying,
    planned_induction boolean NOT NULL DEFAULT false,
    preparing_medication character varying(20) NOT NULL DEFAULT 'NA'::character varying,
    discussion_topics text[],
    read_listened boolean NOT NULL DEFAULT true,
    signed_by_resident boolean NOT NULL DEFAULT false,
    edited boolean NOT NULL DEFAULT false
);
CREATE TABLE discussion_topics (
    id SERIAL PRIMARY KEY,
    topic character varying(255),
    podcast text,
    podcast_link text,
    additional_material text
);

CREATE TABLE attending_physicians (
    id SERIAL PRIMARY KEY,
    name text
);
```

6. In one command line window `npm run client`

7. In another command line window `npm run server`
