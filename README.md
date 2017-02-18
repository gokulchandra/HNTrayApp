# menubar-HackerNews-client
A Hacker News client, built on electron. It lists the top trending, new and best items from HN, fetching this information using the official HN API.

## Development

* Run `yarn install` and `yarn start`
* Needs Node 7.x / npm v3.x or above

## Deployment
* To deploy you can use electron-packager. Check it out here: https://github.com/electron-userland/electron-packager
* To generate the application file use the following command `lectron-packager . HackerNewsMenubar --platform=darwin --arch=x64 --overwrite`