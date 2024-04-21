<p align="center">
  <p align="center">
   <img width="150" height="150" src="/assets/app-logo.svg" alt="Logo">
  </p>
	<h1 align="center"><b>Twitcher</b></h1>
	<p align="center">
		A Desktop Twitch Client.
    <br />
    <b>Download for </b>
    <a href="https://github.com/aansmirnov/twitcher/releases/tag/mac-1.0.0">macOS</a>.
    <br />
  </p>
</p>
<p align="center">
  <img src="/assets/twitcher.png" alt="Logo">
</p>

### Getting Started
* Clone a repository
```bash
git clone https://github.com/aansmirnov/twitcher.git
```

* Install dependencies
```bash
pnpm install
```

* Edit `.env` entries:
```ini
VITE_CLIENT_ID='your client id'
VITE_CLIENT_SECRET='your client secret'
```

* Start a project
```bash
pnpm dev
```

### Tech Stack
```
- Vite
- Electron
- TypeScript
- React
- MobX
- Chakra UI
```

### Features
```
- Read chat
- Send messages to chat
- Display viewer count
- Change stream title & category
- Adjust chat settings (emote mode, slow mode, etc)
- Support channel and global badges
- Support channel and global emotes
- Mod and unmod users
- Vip and unvip users
- Ban and unban users
- Timeout users
- Delete user messages
- Clear chat
```