// TODO ADD the responses here

export default function dm_response(userInput) {
  if (userInput === "hey") {
    return sends_private_reminder("test", "test");
  } else {
    return "Thanks for messaging me directly! How can I assist you? \n wdwd";
  }
}

function sends_private_reminder(userID_sender, userID_receiver) {
  console.log("NA ABUT KO DRI");
  return "debt reminded regie test";
}
