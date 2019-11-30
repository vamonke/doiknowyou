# Do I Know You?

Social game to test how well you know your friends. Built with React and Socket.IO.

### Features

- [x] Options selection
- [x] Random questions
- [x] Players as options
- [x] Open ended questions
- [x] Room host: Set time limit, kick players and transfer host
- [x] Rejoin game
- [x] Time limit
- [x] Admin page
- [x] Question tags

- [ ] Feedback
- [ ] SSM
- [ ] Edit name
- [ ] Room logs
- [ ] Projection mode
- [ ] Trial game

### To-Do
- [x] Add logger
- [x] Deploy on Heroku
- [ ] Get a custom domain name

### Commands

```
git subtree push --prefix server heroku-server master
OR
git push heroku-server `git subtree split --prefix server master`:master --force

git subtree push --prefix web heroku-web master
OR
git push heroku-web `git subtree split --prefix web master`:master --force
```

### Admin Page

- [ ] View current rooms
- [ ] View room
- [x] View question bank
- [ ] CRUD question bank

### List of known bugs
