CREATE TABLE public.users (
	id serial4 NOT null primary key,
	password varchar NOT NULL,
	first_name varchar(30) NOT NULL,
	second_name varchar(30) NOT NULL,
	last_name varchar(30) NOT NULL,
	contact varchar(15) NULL,
	address text NULL,
	created_on timestamp NOT NULL,
	updated_on timestamp NOT null,
	is_active boolean default true
);

CREATE TABLE showroom (
  id serial PRIMARY KEY,
  email VARCHAR(254) NOT NULL,
  contact VARCHAR(14) NOT NULL,
  address TEXT NOT NULL,
  showroom_name TEXT NOT NULL,
  password TEXT NOT NULL,
  area_id BIGINT NOT null,
  created_on timestamp NOT NULL,
  updated_on timestamp NOT null,
  constraint fk_area foreign key(area_id) references area(id) on delete cascade
);

CREATE TABLE area (
  id serial PRIMARY KEY,
  areaname VARCHAR(30) NOT null,
  created_on timestamp default current_timestamp,
  updated_on timestamp default current_timestamp
);

CREATE TABLE booking (
  id serial PRIMARY KEY,
  bookdate DATE NOT NULL,
  booktime time NOT NULL,
  status VARCHAR(30) NOT NULL,
  remarks TEXT NOT NULL,
  showroom_id BIGINT NOT NULL,
  user_id BIGINT NOT null,
  created_on timestamp default current_timestamp,
  updated_on timestamp default current_timestamp,
  constraint fk_showroom foreign key(showroom_id) references showroom(id) on delete cascade,
  constraint fk_user foreign key(user_id) references users(id) on delete cascade
);

CREATE TABLE category (
  id serial PRIMARY KEY,
  categoryname VARCHAR(20) NOT null,
  showroom_id BIGINT not null,
  created_on timestamp default current_timestamp,
  updated_on timestamp default current_timestamp,
  constraint fk_showroom foreign key(showroom_id) references showroom(id) on delete cascade
 );

CREATE TABLE subcategory (
  id serial PRIMARY KEY,
  subcategoryname VARCHAR(30) NOT NULL,
  category_id BIGINT NOT null,
  showroom_id BIGINT not null,
  created_on timestamp default current_timestamp,
  updated_on timestamp default current_timestamp,
  constraint fk_showroom foreign key(showroom_id) references showroom(id) on delete cascade,
  constraint fk_catid foreign key(category_id) references category(id) on delete cascade
);

CREATE TABLE contactus (
  id serial PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  contact BIGINT NOT NULL,
  email VARCHAR(254) NOT NULL,
  message VARCHAR(800) NOT NULL,
  subject VARCHAR(500) NOT null,
  created_on timestamp default current_timestamp,
  updated_on timestamp default current_timestamp
);

CREATE TABLE customer_cart (
  id serial PRIMARY KEY,
  quantity INT NOT NULL,
  product_id BIGINT NOT NULL,
  user_id BIGINT NOT null,
  created_on timestamp default current_timestamp,
  updated_on timestamp default current_timestamp,
  constraint fk_user foreign key(user_id) references users(id) on delete cascade,
  constraint fk_productid foreign key(product_id) references product(id) on delete cascade
);

CREATE TABLE customer_wishlist (
  id serial PRIMARY KEY,
  product_id BIGINT NOT NULL,
  user_id BIGINT NOT null,
  created_on timestamp default current_timestamp,
  updated_on timestamp default current_timestamp,
  constraint fk_user foreign key(user_id) references users(id) on delete cascade,
  constraint fk_productid foreign key(product_id) references product(id) on delete cascade
);

CREATE TABLE feedback (
  id serial PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  email VARCHAR(254) NOT NULL,
  review TEXT NOT null,
  user_id BIGINT not null,
  created_on timestamp default current_timestamp,
  updated_on timestamp default current_timestamp,
  constraint fk_user foreign key(user_id) references users(id) on delete cascade
);

CREATE TABLE inquiry (
  id serial PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  contact BIGINT NOT NULL,
  email VARCHAR(254) NOT NULL,
  message VARCHAR(800) NOT NULL,
  inimage VARCHAR(100) NOT null,
  user_id BIGINT not null,
  created_on timestamp default current_timestamp,
  updated_on timestamp default current_timestamp,
  constraint fk_user foreign key(user_id) references users(id) on delete cascade
);

CREATE TABLE product (
  id serial PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  product_price VARCHAR(20) NOT NULL,
  product_weight float8 NOT NULL,
  product_small_desc VARCHAR(100) NOT NULL,
  product_large_desc VARCHAR(400) NOT NULL,
  product_small_img VARCHAR(100) NOT NULL,
  product_img VARCHAR(100) NOT NULL,
  category_id BIGINT NOT NULL,
  subcategory_id BIGINT NOT NULL,
  showroom_id BIGINT not null,
  created_on timestamp default current_timestamp,
  updated_on timestamp default current_timestamp,
  constraint fk_showroom foreign key(showroom_id) references showroom(id) on delete cascade,
  constraint fk_catid foreign key(category_id) references category(id) on delete cascade,
  constraint fk_subcatid foreign key(subcategory_id) references subcategory(id) on delete cascade
  );