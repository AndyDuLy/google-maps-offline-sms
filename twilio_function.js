const axios = require('axios');

exports.handler = async (context, event, callback) => {
  const gcp_api_key = context.GCP_API_KEY;
  const twiml = new Twilio.twiml.MessagingResponse();
  const incomingMessage = event.Body.toLowerCase();

  const splitRequest = incomingMessage.split(",")

  if (splitRequest[0] === "" || splitRequest[1] === "") {
    twiml.message("Missing origin/destination. Format: <origin>,<destination>,<mode>"); 
    return callback(null, twiml);
  }

  const origin = splitRequest[0]
  const destination = splitRequest[1]
  const mode = splitRequest[2] || "driving"
  const req_url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${gcp_api_key}&mode=${mode}`;

  try {
    const response = await axios.get(req_url);
    var steps = response.data.routes[0].legs[0].steps;

    steps.forEach(step => {
      var instructions = step.html_instructions;

      const regex = /(<([^>]+)>)/ig
      const stripped_instructions = instructions.replace(regex, "");

      twiml.message(`D: ${step.distance.text}, T: ${step.duration.text} | ${stripped_instructions}`);
    });
  } catch (error) {
    twiml.message(error.message);
    return callback(null, twiml);
  }

  return callback(null, twiml);
};
