import axios from "axios";
import { Context, Callback, Event } from "twilio-runtime-types";

export const handler = async (
  context: Context,
  event: Event,
  callback: Callback
) => {
  const gcpApiKey: string = context.GCP_API_KEY as string;
  const twiml = new Twilio.twiml.MessagingResponse();
  const incomingMessage: string = (event.Body as string).toLowerCase();

  const splitRequest: string[] = incomingMessage.split(",");

  if (!splitRequest[0] || !splitRequest[1]) {
    twiml.message(
      "Missing origin/destination. Format: <origin>,<destination>,<mode>"
    );
    return callback(null, twiml);
  }

  const origin: string = splitRequest[0];
  const destination: string = splitRequest[1];
  const mode: string = splitRequest[2] || "driving";

  const reqUrl: string = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${gcpApiKey}&mode=${mode}`;

  try {
    const response = await axios.get(reqUrl);
    const steps = response.data.routes[0].legs[0].steps as {
      distance: { text: string };
      duration: { text: string };
      html_instructions: string;
    }[];

    steps.forEach((step) => {
      const instructions: string = step.html_instructions;
      const strippedInstructions: string = instructions.replace(
        /(<([^>]+)>)/gi,
        ""
      );

      twiml.message(
        `D: ${step.distance.text}, T: ${step.duration.text} | ${strippedInstructions}`
      );
    });
  } catch (error: any) {
    twiml.message(error.message);
    return callback(null, twiml);
  }

  return callback(null, twiml);
};
