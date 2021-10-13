# TDSClient - A terminal-based discord client for school computers.

If you want to use discord on your school computer without it being blocked, this is the tool for you.

This client utilizes a BOT TOKEN (get it from a friend or on another pc) and connects using a proxy.

**THIS IS NOT A SELFBOT! THIS USES A BOT TOKEN WHICH IS NOT AGAINST TOS**

**USER TOKENS ARE AGAINST TOS, NOT SUPPORTED, AND WILL CAUSE ISSUES**

The only URLs you need access to are `github.com` (to download this), and the URL where you host the proxy at. I would recommend [glitch](https://glitch.com) for hosting it as its free and should be unblocked.

You do not need to install anything or have administrator access in order to use this tool. A node.js binary is already included. The modules are also preinstalled.

## Setup

You need to create a file called `TOKEN` in this folder with your bot token in. You also need a file called `PROXY` with the URL of your proxy server. The client will prompt you for a URL every time you start it, if it needs to be changed.

You will also need to change the "guild" option in the config in index.js to your server id. (server switcher coming soon)

Your bot will need at least send messages and webhook permissions. This uses webhooks to send messages as apparently sending messages through the bot is against tos but webhooks arent.

## Notes

CTRL+C is your "back button". Use it to get out of the chat.

## Features

- Automatic role, channel, user, and emoji parsing.
- Proxy so it's unblocked.
- Runs in command line so it's light.
- Channel selector.
- /nick command to set nickname.

## FAQ

How do i host this?

- You'll need to copy the package.json and index.js into a glitch project and glitch (should) do the rest. I haven't tested this however.

What systems does this work on?

- I have only tested this on windows 10. Minus the node binary, it should be compatible with other systems.

Are you hosting a public proxy?

- No, it would be too much of a hassle for me to update the url (as mine constantly changes).

## Images

![image](https://user-images.githubusercontent.com/50887230/137150913-f3fa8f08-632a-4a7a-94e8-f2f063608c76.png)
![image](https://user-images.githubusercontent.com/50887230/137151282-f1b462af-93d6-4d0e-8be9-08ce24596023.png)
