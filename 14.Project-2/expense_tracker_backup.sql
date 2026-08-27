--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp with time zone
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expenses (
    id integer NOT NULL,
    title character varying NOT NULL,
    amount numeric NOT NULL,
    description character varying,
    expense_date date NOT NULL,
    user_id integer NOT NULL,
    category_id integer NOT NULL,
    created_at timestamp with time zone
);


ALTER TABLE public.expenses OWNER TO postgres;

--
-- Name: expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.expenses_id_seq OWNER TO postgres;

--
-- Name: expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expenses_id_seq OWNED BY public.expenses.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    email character varying NOT NULL,
    created_at timestamp with time zone,
    reset_token character varying,
    reset_token_expires timestamp with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: expenses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses ALTER COLUMN id SET DEFAULT nextval('public.expenses_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alembic_version (version_num) FROM stdin;
35f22ff3e162
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, user_id, name, created_at) FROM stdin;
2	1	Food	2026-08-06 15:38:25.967849+05:30
3	1	Travel	2026-08-06 17:39:10.645681+05:30
4	2	Food	2026-08-10 18:04:13.027274+05:30
5	2	Transportation	2026-08-10 18:04:55.838765+05:30
6	2	Shopping	2026-08-10 18:05:17.87065+05:30
7	2	Entertainment	2026-08-10 18:05:38.578767+05:30
8	2	Bills & Utilities	2026-08-10 18:05:59.443493+05:30
9	2	Health	2026-08-10 18:06:16.875028+05:30
10	2	Education	2026-08-10 18:06:32.132589+05:30
11	2	Travel	2026-08-10 18:06:43.619805+05:30
\.


--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expenses (id, title, amount, description, expense_date, user_id, category_id, created_at) FROM stdin;
1	Dinner	500.0	With Friends	2026-08-01	1	2	2026-08-06 17:38:01.228895+05:30
2	Breakfast	500.0	At Taj hotel	2026-08-02	1	2	2026-08-06 17:38:34.421311+05:30
3	To Office	200.0	Going By Car	2026-08-03	1	3	2026-08-06 17:39:52.72117+05:30
4	To Home	90.0	Going by Rickshaw	2026-08-03	1	3	2026-08-06 17:46:15.645753+05:30
5	To Taj Hotel	350.0	Going For Dinner To Taj By Uber	2026-08-04	1	3	2026-08-06 17:47:04.621933+05:30
6	Lunch	2000.0	At ITC Narmada	2026-08-05	1	2	2026-08-06 17:47:54.448747+05:30
7	Lunch 	450.0	Lunch at restaurant	2026-08-10	2	4	2026-08-10 18:10:02.595499+05:30
8	Groceries	1250.0	Weekly groceries	2026-08-07	2	4	2026-08-10 18:11:12.072122+05:30
9	Breakfast	220.0	Breakfast at cafe	2026-08-03	2	4	2026-08-10 18:12:18.4011+05:30
11	Snacks	180.0	Evening Snacks	2026-07-15	2	4	2026-08-10 18:13:42.167461+05:30
12	Uber Ride	280.0	Go to office	2026-08-09	2	5	2026-08-10 18:15:25.003437+05:30
13	Petrol	1000.0	Fuel up in Car	2026-08-04	2	5	2026-08-10 18:16:11.354345+05:30
14	Auto rickshaw	180.0	Going to mall	2026-07-24	2	5	2026-08-10 18:17:09.342928+05:30
15	Petrol	900.0	Fuelup in family car	2026-07-24	2	5	2026-08-10 18:18:13.829933+05:30
16	T-shirt	899.0	 T-shirt from Nexus-one	2026-08-08	2	6	2026-08-10 18:19:27.775818+05:30
17	Specs	2000.0	From lenskart	2026-08-01	2	6	2026-08-10 18:20:01.133868+05:30
18	Shoes	4999.0	Skechers shoe from Palladium	2026-07-24	2	6	2026-08-10 18:20:33.151523+05:30
19	Movie Ticket	699.0	Watching Alpha	2026-08-03	2	7	2026-08-10 18:21:21.644769+05:30
20	OTT Subscription	199.0	Netflix	2026-07-28	2	7	2026-08-10 18:21:51.704484+05:30
21	Wi-Fi	899.0	Airtel Home	2026-07-08	2	8	2026-08-10 18:23:27.679797+05:30
22	Jio	899.0	In Personal Phone	2026-08-01	2	8	2026-08-10 18:23:49.189498+05:30
23	Light-Bill	4000.0	Home 3 month bill	2026-08-01	2	8	2026-08-10 18:24:29.371686+05:30
24	Medicine	540.0	At Apple medical	2026-08-02	2	9	2026-08-10 18:25:04.23435+05:30
25	Consultation	1000.0	Health Check-up by Doctor	2026-08-06	2	9	2026-08-10 18:26:02.707028+05:30
26	AI-Course	1000.0	Course By BE10x	2026-08-01	2	10	2026-08-10 18:27:03.108461+05:30
27	Book	259.0	Rich Dad Poor Dad	2026-07-31	2	10	2026-08-10 18:27:36.221743+05:30
28	Hotel Booking	3000.0	At Mysore	2026-07-12	2	11	2026-08-10 18:28:18.600611+05:30
29	Flight	7000.0	Ahm to Bom	2026-08-01	2	11	2026-08-10 18:28:46.638684+05:30
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, email, created_at, reset_token, reset_token_expires) FROM stdin;
1	Rohan	$2b$12$.lYF7KJXb1Vu6mLcGFAGF.a8M/BaWErzALJb7WxP9h2Njrt28RcVy	rohan9585@gmail.com	2026-08-06 15:33:52.921058+05:30	\N	\N
2	example_user	$2b$12$2A5Gs/Wxn.geTF5/Hg6EIumaF7p6iO0m9rX8LbxmRGN7gTZuIVCIO	expense.user@example.com	2026-08-10 18:02:45.922996+05:30	\N	\N
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 11, true);


--
-- Name: expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expenses_id_seq', 29, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- Name: categories unique_category_per_user; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT unique_category_per_user UNIQUE (name, user_id);


--
-- Name: users uq_users_reset_token; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uq_users_reset_token UNIQUE (reset_token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: categories categories_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: expenses expenses_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: expenses expenses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

