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


<p align="right"><a href="#top"Back to top</a></p>

