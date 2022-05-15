# Palantiri
Play the Lord of The Rings Living Card Game (LCG) online with others.
As a game master, use this app to re-present the "table" to absent players.
All players share the same perspective as the encounter deck is revealed.

## Motivation
The LOTR LCG is one of my absolute favorite games to play solo and with others.
Cooperative play works best when everyone plays at the same table.
Naturally, this has proven rather difficult during the pandemic -
but really anytime you want to play with absent family and friends.
Thus, finding myself quarantined and isolated for a week in early Feburary '22,
I wrote this app.

## Inspiration
I drew inspiration and content from a few sources:

1. [Dragn Cards][1]
2. [RingsDB][2]

From Seastan's venerable [Dragn Cards][1], I borrowed a general look and feel.
For lack of time (and expertise), I did not attempt to replicate full play -
that is, all players must still manage their own physical decks
and at least one player (the game master) must manage the encounter deck.
Furthermore, there is no "game" per se; it's just a re-presentation of a game.
The odds of the game still come down to the physical shuffle and draw of cards.

From [RingsDB][2], I made liberal use of the scanned card images.
Where else am I going to find thousands of digitally scanned cards?
Again, the app does not understand the function or properties of any card.
The game mechanics still come down to a knowlegeable game master and players.

[1]: https://dragncards.com/lobby
[2]: https://ringsdb.com

## Implementation
This project was bootstrapped with [Create React App][3].
It deploys a front-end React app (client) with an Express sidecar (server).
Each client establishes a persistent websocket connection with the server.
The server maintains the "game" state and shares state updates with clients.

### Commands
The game master manipulates the "game" state through a simple command grammar.
There are more elegant solutions, but these commands will do the job for now.

| Command   | Argument(s)                                       | Description                                                |
|-----------|---------------------------------------------------|------------------------------------------------------------|
| /scenario | scenario_name                                     | Change the active scenario to scenario_name                |
| /reveal   | card_title                                        | Add card_title to the staging area                         |
| /display  | staging_index                                     | Move a card by index to the display area                   |
| /hide     | display_index                                     | Remove a card by index from the display area               |
| /discard  | staging_index                                     | Remove a card by index from the staging area               |
| /attach   | staging_index card_title                          | Attach a card by title to another card in the staging area |
| /detach   | staging_index attachment_index                    | Remove an attachment from a card in the staging area       |
| /quest    | card_title                                        | Change the active quest                                    |
| /travel   | staging_index                                     | Move a card by index to the active location area           |
| /explore  | None                                              | Remove the active location from play                       |
| /engage   | staging_index                                     | Move a card by index to the engagement area                |
| /return   | engagement_index                                  | Return a card from the engagement area to the staging area |
| /flip     | [quest,location,display,engagement,staging] index | Flip the specififed card by area and index                 |
| /defeat   | engagement_index                                  | Remove a card from the engagement area by index            |

[3]: https://github.com/facebook/create-react-app)

### Scripts
From the project directory, you can run the following scripts:

#### `npm install`
Installs necessary dependencies for both client and server.

#### `npm run server`
Runs the Express server listening on the default port.

#### 'npm run client`
Runs the client app listening on the default port.

#### 'npm run dev'
Concurrently runs both the server and client as a development pair.
Open [http://localhost:3000](http://localhost:3000) to view it online.
The page will reload when you make changes.\
You may also see any lint errors in the console.

### 'npm run build'
Builds the client app for production to the `build` folder.
Bundles React in production mode and optimizes the build for performance.

### 'npm run test'
Launches the test runner in the interactive watch mode.
