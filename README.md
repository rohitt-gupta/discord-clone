node version v18.17.1
pnpm version 8.13.1
npm version 10.2.5

setup the env variables
pnpm i
pnpm run dev


### Flow control of the application

- Login screen:- here we login or register for the application
- After login we go the setup page where we will check if the profile is associated with any server.
- If the server is present, then we will go to the "/server/{{serverId}}"
- If server not present then we will show create a new server initialModal.
- For creating the server we will call the POST API -> "/api/servers" with values from the modal {name: string, imageUrl:string} as
- After Creating the server we will be again redirected to the newly created server "/server/{{serverId}}".
- 