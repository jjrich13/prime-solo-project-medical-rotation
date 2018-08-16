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

