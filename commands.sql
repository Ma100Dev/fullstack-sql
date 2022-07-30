CREATE TABLE blogs (
id SERIAL PRIMARY KEY,
author text,
url text NOT NULL,
title text NOT NULL,
likes int DEFAULT 0
);

insert into blogs (url, title) VALUES ('http://example.org', 'Example');
insert into blogs (url, title) VALUES ('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'The Best Blog Ever');