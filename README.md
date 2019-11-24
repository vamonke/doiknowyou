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

- [ ] Trial game
- [ ] Edit name
- [ ] SSM
- [ ] Room logs
- [ ] Projection mode

### To-Do
- [x] Add logger
- [x] Deploy on Heroku
- [ ] Get a custom domain name

### Commands

```
git subtree push --prefix server heroku-server master
git subtree push --prefix web heroku-web master
```

### Admin Page

- [ ] View current rooms
- [ ] View room
- [x] View question bank
- [ ] CRUD question bank

### List of known bugs

- Joining a game in progress directs user to lobby instead of game
- Residuel options from previous question