This is a LinkedIn clone project based on Next.js and MongoDB.

I have deployed this app on the Netlify platform. You can see the final build via: https://animated-pegasus-3824b4.netlify.app/

## How to Use

First, make sure you have config env variables(`.env.local`) shown as below: 

```bash
JWT_SECRET='your jwt secret here'
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI='your mongodb uri'
MONGODB_DB='your mongodb name'

# github Oauth
GITHUB_CLIENT_ID='your github client id'
GITHUB_CLIENT_SECRET='your github client secret'
NEWS_API_KEY='your news api key'
```

> Note: I get my news from [The New York Times](https://developer.nytimes.com/), so if you want news show correctlly, you just sign up for an API key.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


