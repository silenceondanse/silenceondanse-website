# DÉPLOIEMENT : Silence. On danse !

Ce document explique les étapes pour déployer le site sur Netlify via GitHub.

## 1. Initialiser le dépôt GitHub
Ouvrez le terminal dans le dossier du projet :
```bash
git init
git add .
git commit -m "Initial commit : Silence. On danse! Rebuild"
```

## 2. Pousser sur GitHub
- Créez un dépôt sur GitHub (par exemple, `sond-website`).
- Liez votre dossier local au dépôt distant :
```bash
git remote add origin https://github.com/votre-nom/sond-website.git
git branch -M main
git push -u origin main
```

## 3. Déploiement sur Netlify
1. Connectez-vous à votre compte **Netlify**.
2. Cliquez sur **Add new site** > **Import an existing project**.
3. Choisissez **GitHub** et autorisez l'accès.
4. Sélectionnez votre dépôt `sond-website`.
5. Configuration de base (pré-configurée via `netlify.toml`) :
   - Team : votre équipe
   - Branch to deploy : `main`
   - Publish directory : `.`
6. Cliquez sur **Deploy site**.

## 4. Configuration Formulaire (Contact)
Le site utilise **Netlify Forms**. Aucune configuration serveur n'est requise. Lorsqu'un utilisateur soumet un formulaire sur `contact.html`, vous recevrez une notification par email (définie dans `netlify.toml` vers infosilenceondanse@gmail.com).

## 5. Mises à jour futures
Pour toute modification future, il suffit de pousser les changements sur GitHub. Netlify redéploiera automatiquement le site :
```bash
git add .
git commit -m "Mise à jour (description)"
git push origin main
```
