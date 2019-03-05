# vet-radar
## Get started
1) Clone the repository
2) Run `npm install` to install all dependencies
3) For development run `npm run develop`
4) To build the project run `npm run build` and then `npm run start`, by default application runs at port **8080**, however you can change it by setting environment variable `PORT`

## Development notes
1) Products are identified by `name`, I would suggest using artificial `uid`
2) Price format is NZD
3) The application does not have a colorful UI
4) I did not use Redux pattern even though I know it very well (Including async side effects like redux-thunk or sagas. For storing data I would use redux-persist). Instead of Redux I used React Context Api, that is pretty straight-forward and increases the code quality.
