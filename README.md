# Documentation : Gestion des Utilisateurs

Cette section détaille les procédures administratives pour la création et la gestion des comptes au sein de l'application.

## Création de Comptes Agents

L'administrateur système possède les privilèges nécessaires pour étendre l'équipe via son interface dédiée.

### Procédure via le Tableau de Bord
1. Connectez-vous avec un compte disposant du rôle `admin`.
2. Accédez à la section **Tableau de Bord** (Dashboard).
3. Utilisez le formulaire de création d'agent pour enregistrer un nouveau membre.
4. Utilisez le formulaire de création de service pour enregistrer un nouveau service.
5. Administrateur peut creer un nouveau administrateur en cliquant sur la troisieme icone dans la colonne de statut de table des agents **NB: On cree le ne nouveau administrateur qui devient agent**

### Identifiants par Défaut
Lorsqu'un compte agent est créé manuellement par l'administrateur, les paramètres de connexion initiaux sont les suivants :

- Identifiant : L'adresse email renseignée lors de la création.
- Mot de passe par défaut : `12345`


## Attribution du Rôle Administrateur (MySQL)

Par défaut, tout utilisateur qui s'enregistre via le formulaire d'inscription standard reçoit le rôle de client. Pour promouvoir un utilisateur au rang d'administrateur, une intervention manuelle dans la base de données MySQL est requise :

```sql
UPDATE user SET role = 'admin' WHERE id = userId;\
```

Remplacez userId par l'identifiant numérique de l'utilisateur concerné.