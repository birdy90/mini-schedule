# Mini Schedule

This app is built with Next.js and Tailwind. There is a built version running [here](https://schedule.bederdinov.me/)

## Run it locally

To see this app working you would rather install dependencies and run one of the following commands

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Reasons I stopped development of this

The whole idea was pretty weird and there is no point of making it:

- the whole week should be visible
- each day should be fully visible on the screen
- app should look and work perfectly on mobile devices
- there should be two layers of events: `common` to add events and `background` show big amounts of time that can be occupied with smaller common events (imagine a birthday party when you have a lot of different activities)
- there should be two event types: `regular` and `one-time`
- when time marker passes the `one-time` event - it should disappear from calendar
- (the most weird part) there should be no dates, only week days, all the event you can see on the screen are related to the seven upcoming days. For example, if today is Wednesday and I add new event to Monday, I will see it on calendar above Wednesday, but it will be next Monday, not the passed one
- everything should be synced through localStorage and database

I found myself unable to provide acceptable UI for all this features and to build a simple yet functional tool. And I didn't want to spend tons of time to solve all these problems because I wasn't going to use this tool

## What I've learned

Working on these project I tried some new libs:
- initially project was started using `vue3` and `nuxt`
- `@tanstack/react-form` with a bit of `zod` to work with forms
- `zustand` and `jotai` for state management (also `pinia` for vue version)
- `mantine` as UI components and hooks library