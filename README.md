Review Retriever is an app that fetches, stores, and displays reviews from the past 48 hours for App Store apps.

## Running Review Retriever Locally

To run the development server:

```bash
npm run dev
```

The app will then be reachable on your browser at [localhost:3000](http://localhost:3000)

## If you want to change the app that is fetched

By default, the application fetches reviews for Snapchat.

If you want to fetch reviews for a different app, change the value of appId inside of app/page.tsx.

You can find your appId in its App Store url. For example, Snapchat's App Store url is: [apps.apple.com/us/app/snapchat/id447188370](https://apps.apple.com/us/app/snapchat/id447188370) which makes its id: 447188370.

## Current limitations / Future improvements

* The app should allow users to change the appId from within the UI. Probably through the use of a form which has a text input and fetch button.

* The App Store RSS url used only returns the 50 most recent reviews for an app. If there are more than 50 reviews in the past 48 hours, results displayed are likely to be somewhat inaccurate.

### Acknowledgements

Built using Next.js, Tailwindcss, and Prisma
