# Testing Strategy

Manual E2E Test

## Create/Join Game:

1. Create game
2. Join game

## Host actions

1. Transfer host
2. Update settings
3. Kick player
    - Join back into game
4. Leave game as host: Host should be transfered
    - Join back into game
5. Kick self as host: Host should be transfered
    - Join back into game

## Lobby

Player 1:
1. Randomly generate 3 questions of different type
2. Ready: Status should be updated
3. Add 2 options

Player 2:
4. Toggle remove mode on and off
5. Remove 2 options: Should exit remove mode if left with only 2 options
6. Select each option type
7. Ready

## Game

1. Play til game is over
2. Restart

3. Set time limit to 15s
4. Start game
5. Answer question
6. Let question time out