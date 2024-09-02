# Spotify Playlist Generator

This project is a server side application where a user can login with their spotify account through the spotify portal. Then using the token generated allow the user to generate new playlists based on parameters they specify. Such as genre, artists, length, etc.

Will likely just use a OpenAI token for the AI to generate a list of songs, then use these songs, look them up on spotify, and generate a playlist from this. 

Another feature to develop is the ability to generate a copy of a pre-existing playlist but actually randomze the song order, as spotify shuffle sucks so generating a new playlist for the user that is actually shuffled is something I want to do.

Maybe there can also be a little dashboard that shows the user their stats, such as genres listened to, favourite artist, etc.

## Road map

- Get the server setup, this server should have API's that the interface can use to get stuff like redirects to auth, getting randomized song playlist, and generating playlists.
- build a webpage for the app that will serve the content and make it easy for the user to use the service.

## Technologies
Will be a Javascript project that I use Express and maybe React in.
