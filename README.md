# Palantiri
Play the Lord of The Rings Living Card Game online with others.
A game master can use this app to re-present the "table" to absent players.
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
that is, all players must manage their own physical decks
and at least one player (the game master) must manage the encounter deck.
Furthermore, there is no "game" per se; it's just a re-presentation of a game.
The odds of the game still come down to a physical shuffle and draw of cards.

From [RingsDB][2], I made liberal use of the scanned card images.
Where else am I going to find thousands of digitally scanned cards?
Again, the app does not understand the function or properties of any card.
The game mechanics still come down to a knowlegeable game master and players.

[1]: https://dragncards.com/lobby
[2]: https://ringsdb.com

## Implementation
This project was bootstrapped with [Create React App][3].
It deploys a front-end React App (client) with an Express sidecar (server).
Each client establishes a persistent websocket connection with the server.
The server maintains the "game" state and shares state updates with clients.



[3]: https://github.com/facebook/create-react-app)

# Getting Started with Create React App


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


