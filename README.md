# To Run

1. install postgres (https://www.postgresql.org/download/windows)
2. create .env files in `./server` and `./client` based on the provided example.env
3. run `yarn start` in ./server
4. run `yarn install` and `yarn start` in ./client

if you have any trouble running this, please call me because it took longer than ill admit to make and i'd love to help you to get it working.

# Features

- login and registration
- dashboard with artists, albums, tracks & lyrics
- cached responses from the musixmatch api
- database migrations
- JWT based auth

# Development notes

I cut a few corners in the interest of time, but tried to get as closed to fleshed out as I could so you could get an idea of my style and how I do things.

- I would always recommend setting up an ORM instead of just using the base Pg lib and raw SQL like I have.
- I'm a huge fan of types so it irks me there's still no good way to type middleware in express (if you know how show me please)
- I've structured the react project in a really small-brained way, in a larger project i'd expect things to be more generic to promote code re-use.
- I've left various TODO's around the place that I've deemed out of scope for a tech test.
- I didn't bother spending too much time on CSS (im applying for a backend role) styling and just used some out of the box material stuff.

# Other notes

- when you enter your users country it's gotta be a country code, like "au" because I didn't want to implement a country dropdown/source country data
