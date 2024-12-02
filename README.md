<br />
<div align="center" id="top">
  <h1 align="center">
    SHOP TASK
  </h1>
</div>
<br />
<br />
<br />
<br />


## Description:
Task for job
## **[Database Schema](https://drawsql.app/teams/nader-shak/diagrams/shop-task)**
![Shop-Task _ DrawSQL - Google Chrome 2_12_2024 12_38_56 م](https://github.com/user-attachments/assets/7faaa196-ec7e-4afd-9017-d9f29da5231b)


## **Getting Started**  

## :pushpin: **How to launch app locally** :- 

*  clone this repo by typing this command in your terminal:  
`git clone https://github.com/Nader-SH/Shop-Task.git`
*  Run `cd client` and `npm i` to install the packages for the client side React Js.
  
*  Run `cd server` and `npm i` to install packages for the app as general.


### Database Setup  :clipboard: 

make sure you have installed PostgreSQL and pgcli 

```sql=
CREATE DATABASE {database name};
CREATE USER {user name} WITH superuser password {password}
ALTER DATABASE {database name} OWNER TO {user name};
```

* Run the following command in the database pgcli terminal  
`npm run buildDB` to build database tables 

### **Environment variables:**
Environment variables are one of the ways we keep our product secure. If you want to access our app locally you will need to add your own.
- create .env file at the root of your project
- add your Environment variables
```sh
PORT= # Your development PORT connect
DEV_DB_URL= # Your development PostgreSQL connect
SECRET_KEY= # Your token Secret key
```

## **Technologies**

* [Express.js](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Sequelize](https://sequelize.org/)
* [antd](https://ant.design/components/list/)


# User Story for Clothing Website

## User Stories

### 1. Account Creation
**As a user, I can create an account,**  
**So that** I can register on the website and have a personalized experience.

### 2. User Login
**As a user, I can log in to my account,**  
**So that** I can access my profile and manage my products.

### 3. User Logout
**As a user, I can log out of my account,**  
**So that** I can securely end my session.

### 4. Product Upload
**As a user, I can upload products to the website,**  
**So that** I can showcase my clothing items and make them available for others to view.

### 5. Product Viewing
**As a user, I can view the list of products,**  
**So that** I can browse through the items uploaded on the website.

### 6. Product Filtering
**As a user, I can filter the products by clothing type,**  
**So that** I can view products based on categories like T-shirts, shirts, pants, jackets, etc.

### 7. All Products Filter
**As a user, I can click on the "All" filter button,**  
**So that** I can view all products without any category filter applied.

### 8. Pagination
**As a user, I can paginate through the product list,**  
**So that** I can easily browse multiple pages of products if there are many available.


<p align="right"><a href="#top"Back to top</a></p>

