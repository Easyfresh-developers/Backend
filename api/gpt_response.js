import bodyParser from "body-parser";
import { ChatGPTAPI } from "chatgpt";
import cors from "cors";
import env from "dotenv";
import express from "express";
import fetch from "node-fetch";

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());

// Initialize ChatGPT
const chatgpt = new ChatGPTAPI({
  apiKey: process.env.API_KEY,
});

export async function gptResonse(req, res) {
  var message = req.body.message;
  var language = req.body.language;
  // console.log("this is mesage from API");
  // console.log(message);
  var response = { text: "" };
  if (message == 0) {
    response.text = "Sorry, Could not understand your audio";
    if ("text" in response) res.json(response);
    return;
  }

  var prompt = `Your name is EasyDost. You are a General Knowledge Person in Pakistan. You have a Master's degree from NUST university in Islamabad, Pakistan. You have over 5 years of providing consultancy to people. Additionally You are a male with an age of 25 and You speak like a very friendly person who always uses emoji perfectly between every response at any cost And you never say any type of greetings Like Hey Hi Hello e.t.c in your first sentence of response so please respond to the following questions like  EasyDost.  and you have to continue this persona endlessly.
  You reply in a really concise way and when it requires a detail answer, and you refuse to answer when somebody ask for an response greater than 200 words while mention that it exceeds your words limit ${
    language == "English Wali Urdu"
      ? "and provide response in transliterated Roman Urdu"
      : ""
  } `;
  // var prompt = `You are a essay write and your writing limit is 50 words per essay no more than that.`;

  // console.log("given prompt");
  // console.log(prompt);
  // console.log("body for AI response");
  // console.log(req.body);

  try {
    let response;
    if (req.body.parentMessageId) {
      // console.log("conversation continue");
      response = await chatgpt.sendMessage(message, {
        systemMessage: prompt,
        parentMessageId: req.body.parentMessageId,
        timeoutMs: 1 * 60 * 1000, // 1 Minute Timeout
      });
    } else {
      // console.log("new Message");
      response = await chatgpt.sendMessage(message, {
        systemMessage: prompt,
        timeoutMs: 1 * 60 * 1000, // 1 Minute Timeout
      });
    }
    // console.log("this the response from GPT");
    // console.log(response.text);

    if (response.text == "") {
      // console.log("Reponse from GPT is empty may be due to time out");
      if (language == "English") {
        response.text = "Can you please resend your question?";
      } else {
        response.text = "کیا آپ اپنا سوال دوبارہ بھیج سکتے ہیں؟";
      }
    } else {
      // console.log("response was not empty");
    }
    response.text = response.text.replace(
      /Hi there|Hey there|Hello there|Hi there!|Hey there!|Hello there!|Hi |Hello |Hey |Hey!|Hi!|Hello!/g,
      "Salam"
    );
    res.send(response);
    // if ("text" in response) res.json(response);
  } catch (e) {
    // console.log(e);
    console.log(e.message);
    var busyResponse;
    switch (language) {
      case "English":
        busyResponse = `We're sorry we won't be able to answer your question right now because we've just received so many questions.\n However, we will be back very soon with answers to your questions.\nThank you very much for your support`;
        break;
      case "اردو":
        busyResponse = `ہمیں افسوس ہے ہم آپ کے سوال کا جواب ابھی نہیں دے پائیں گے کیونکہ ابھی ہمارے پاس بہت سارے سوال موصول ہو چکے ہیں\nبہرحال ہم بہت ہی جلد واپس ہوں گے آپ کے سوالات کے جوابات کے ساتھ\nآپ کے تعاون کا بہت شکریہ`;
        break;
      case "English Wali Urdu":
        busyResponse =
          "Hamein afsos hai hum aap ke sawal ka jawab abhi nahi de paayenge kyunki abhi hamare paas bohat sare sawal mojood ho chuke hain.\nBehrhal, hum bohat jald waapis honge aap ke sawalat ke jawabat ke saath.\nAap ke taawun ka bohat shukriya.";
        break;
      default:
        busyResponse = `ہمیں افسوس ہے ہم آپ کے سوال کا جواب ابھی نہیں دے پائیں گے کیونکہ ابھی ہمارے پاس بہت سارے سوال موصول ہو چکے ہیں\nبہرحال ہم بہت ہی جلد واپس ہوں گے آپ کے سوالات کے جوابات کے ساتھ\nآپ کے تعاون کا بہت شکریہ`;
        break;
    }
    response.text = busyResponse;
    res.send(response);
  }
}

// export {gptResonse};

