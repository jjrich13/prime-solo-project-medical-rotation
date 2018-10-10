CREATE TABLE "users" (
	"id" serial NOT NULL,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"admin" BOOLEAN NOT NULL DEFAULT 'false',
	"resident" BOOLEAN NOT NULL DEFAULT 'false',
	"active" BOOLEAN NOT NULL DEFAULT 'true',
	CONSTRAINT users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "feedback" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"date" DATE NOT NULL,
	"resident" varchar(255),
	"attending_physician" varchar(255),
	"ventilator_settings" BOOLEAN NOT NULL DEFAULT 'false',
	"induction_drugs" BOOLEAN NOT NULL DEFAULT 'false',
	"inhaled_agents" BOOLEAN NOT NULL DEFAULT 'false',
	"vasopressants" BOOLEAN NOT NULL DEFAULT 'false',
	"monitors" BOOLEAN NOT NULL DEFAULT 'false',
	"airway_management" BOOLEAN NOT NULL DEFAULT 'false',
	"iv" int NOT NULL DEFAULT '0',
	"a_line" int NOT NULL DEFAULT '0',
	"mask_ventilation" int NOT NULL DEFAULT '0',
	"insert_lma" int NOT NULL DEFAULT '0',
	"intubation" int NOT NULL DEFAULT '0',
	"planned_airway_management" int NOT NULL DEFAULT '0',
	"airway_assessment" int NOT NULL DEFAULT '0',
	"assess_asa_score" int NOT NULL DEFAULT '0',
	"applied_monitors" varchar(10) NOT NULL DEFAULT 'None',
	"setup_room" varchar(10) NOT NULL DEFAULT 'None',
	"planned_induction" BOOLEAN NOT NULL DEFAULT 'false',
	"preparing_medication" varchar(20) NOT NULL DEFAULT 'NA',
	"discussion_topics" TEXT NOT NULL,
	"read_listened" BOOLEAN NOT NULL DEFAULT 'true',
	"signed_by_resident" BOOLEAN NOT NULL DEFAULT 'false',
	"edited" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT feedback_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "goals" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL UNIQUE,
	"iv" int NOT NULL DEFAULT '0',
	"a_line" int NOT NULL DEFAULT '0',
	"mask_ventilation" int NOT NULL DEFAULT '0',
	"insert_lma" int NOT NULL DEFAULT '0',
	"intubation" int NOT NULL DEFAULT '0',
	"planned_airway_management" int NOT NULL DEFAULT '0',
	"airway_assessment" int NOT NULL DEFAULT '0',
	"assess_asa_score" int NOT NULL DEFAULT '0',
	CONSTRAINT goals_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "initial_survey" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL UNIQUE,
	"year" int NOT NULL,
	"applying_to" TEXT,
	"applied_to" TEXT,
	"matched_in" TEXT,
	"interested_in" TEXT[],
	"letter_interest" varchar(10) NOT NULL,
	"intubations" int NOT NULL,
	"iv" int NOT NULL,
	"mask_ventilated" int NOT NULL,
	"central_line" int NOT NULL,
	"run_ventilator" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT initial_survey_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "discussion_topics" (
    "id" serial,
    "topic" varchar(255),
    "podcast" text,
    "podcast_link" text,
    "additional_material" text,
    PRIMARY KEY ("id")
);

ALTER TABLE "feedback" ADD CONSTRAINT "feedback_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "goals" ADD CONSTRAINT "goals_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "initial_survey" ADD CONSTRAINT "initial_survey_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");


ALTER TABLE "public"."feedback"
  ALTER COLUMN "resident" TYPE integer,
  ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id"),
  ADD CONSTRAINT "user.id" FOREIGN KEY ("resident") REFERENCES "public"."users"("id");


  --This should work

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
    edited boolean NOT NULL DEFAULT false,
    resident_comment text
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