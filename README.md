## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## Debugging Setup

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug",
            "args": ["${workspaceFolder}/src/main.ts"],
            "runtimeArgs": ["--nolazy", "-r", "ts-node/register"],
            "sourceMaps": true,
            "cwd": "${workspaceRoot}",
            "protocol": "inspector"
        }
    ]
}
```
