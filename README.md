# Frontent documentation

## Features
1. Authentication
2. Home - client page
3. Agent page
4. Admin page

With role management

## Requirements

Having nodejs installed and npm

## Setup
1. Run the command `cd ligne_attente` pour entrer dans le repertoire du projet frontend
2. Run the command `npm install`
This command installs the requirements in [package.json](pockage.json)
3. Run the command `npm run dev -- --host` pour demarrer le projet. Ceci permet d'exposer l'addresse du routeur pour pouvoir tester en local sur plusieurs appareils

## Admin use creation

When a user registers, by default it's a normal user. To set him an admin, go in the MYSQL and do 
`ALTER TABLE user SET role = 'admin' WHERE id = userId`. 

Admin user shall be able to create agents from his dashboard. 
The default password for an agent is (12345)