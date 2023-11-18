<p align="center">
	<h1 align="center"><b>Twitcher</b></h1>
	<p align="center">
		A desktop Twitch client.
    <br />
    <p align="center">
        <img src="/assets/twicher.png" alt="Logo">
    </p>
    <b>WARNING! This software is UNFINISHED! Use it at your own risk! In fact, it may never be useful for anybody.</b>
  </p>
  <br />
</p>

### Getting Started

```console
$ git clone https://github.com/aansmirnov/twitcher.git && cd twitcher
$ touch .env
$ pnpm i 
$ pnpm run start:dev
```

### Stack

- Electron;
- TypeScript;
- React;
- MobX;
- Chakra UI;
- Axios and Websockets.

### Features

- Edit stream title, category and tags;
- Edit chat settings (emote mode, slowmode and etc);
- Read chat;
- Send messages to chat;
- Support channel and global badges and emotes;
- Add and remove user mod;
- And and remove user vip;
- Ban user;
- Timeout user;
- Delete user message;
- Display viewers count;
- Clear chat.

### Future Plans

- Fix 401 error when refreshed token;
- Unban users;
- Notification when user follow, subscribe to a channel and etc;
- Build for Windows / MacOS / Linux.