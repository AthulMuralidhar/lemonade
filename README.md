## Prelims

This is a **typescript** project. We can install the dependencies after cloning the directory via:
```bash
npm i 
```

## Scripts

This project is currently in development and we can start the server with:
```bash
npm run dev
```
This should start the project with the terminal output:
```bash
[INFO] 15:53:21 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.3.5)
Initializing
Listening on port 3000
```
#### Note
The server impliments a graceful shutdown when exicted. This means that it makes `.json` files when it shuts down. When in such a situation we get:
```bash
[INFO] 15:53:21 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.3.5)
Initializing
executing previous timers...
executing previous timers...
executing previous timers...
executing previous timers...
Listening on port 3000
response sent
response sent
response sent
response sent
```
Here the server is checking for previous timers and executing them when the server was halted before execution.

## Testing

The server implimentation is tested with **Postman**. The JSON file is provided as a reference