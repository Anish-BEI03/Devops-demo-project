## Hence a lib folder not committing into the git, you have to follow these steps to run the Chat feature

## Make a new folder named ( lib ) in the src folder and create a file named,

# utils.js
export function formatMessageTime(date){
  return new Date(date).toLocaleTimeString("en-LK",{
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}