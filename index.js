import bodyParser from "body-parser";
import { ChatGPTAPI } from "chatgpt";
import cors from "cors";
import env from "dotenv";
import express from "express";
import fetch from "node-fetch";
import axios from "axios"

const app = express();


env.config();

app.use(cors());
app.use(bodyParser.json());
// app.use("/api/gptresponse", gptResonse);

// Initialize ChatGPT

// dummy route to test
app.get("/", (req, res) => {
  res.send("Backend API - Functions branch");
});

//post route for making requests
// app.post("/gptResponse", async (req, res) => {
//   const { message } = req.body;
//   try {
//     let response;
//     if (req.body.conversationId) {
//       response = await chatgpt.sendMessage(message, {
//         systemMessage: `Your name is EasyDost. You are a General Knowledge Person in Pakistan. You have a Master's degree from an NUST university in Islamabad, Pakistan. You have over 5 years of providing consultancy to people. Additionally You are a male with an age of 25 and You speak like a very friendly person who always uses emoji in response so please respond to the following questions like  EasyDos. This persona will continue until I type <STOPNOW>. If you agree, then respond with 'yes' and I will begin sharing my questions`,
//         conversationId: req.body.conversationId,
//         parentMessageId: req.body.lastMessageId,
//         timeoutMs: 1 * 60 * 1000, // 1 Minute Timeout
//       });
//     } else {
//       response = await chatgpt.sendMessage(message, {
//         systemMessage: `Your name is EasyDost. You are a General Knowledge Person in Pakistan. You have a Master's degree from an NUST university in Islamabad, Pakistan. You have over 5 years of providing consultancy to people. Additionally You are a female with an age of 25 and You speak like a very friendly person who always uses emoji in response so please respond to the following questions like  EasyDos. This persona will continue until I type <STOPNOW>. If you agree, then respond with 'yes' and I will begin sharing my questions`,
//         timeoutMs: 1 * 60 * 1000, // 1 Minute Timeout
//       });
//     }
//     console.log(response.text);
//     response.text = response.text.replace(
//       /Hi there|Hey there|Hello there|Hi there!|Hey there!|Hello there!/gi,
//       "Salam"
//     );
//     if ("text" in response) res.json(response);
//   } catch (e) {
//     console.log(e);
//     console.error(e);
//     res.sendStatus(400);
//   }
// });
// app.post("/", async (req, res) => {
//   var message = req.body.message;
//   var language = req.body.language;
//   var lastMessageId = req.body.parentMessageId;
//   var phoneNumberId = req.body.phoneNumberId;
//   // console.log("this is mesage from API");
//   // console.log(message);
//   // console.log(language);
//   var response = { text: "" };
//   if (message == 0) {
//     response.text = "Sorry, Could not understand your audio";
//     if ("text" in response) res.json(response);
//     return;
//   }
//   var prompt;
//   if (language == "French") {
//     prompt = `Your name is EasyDost. You are a General Knowledge Person in Senegal. You have a Master's degree from University of Ziguinchor in Ziguinchor, Senegal. You have over 5 years of providing consultancy to people. Additionally You are a male with an age of 25 and You speak like a very friendly person who always uses emoji perfectly between every response at any cost And you never say any type of greetings Like Hey Hi Hello e.t.c in your first sentence of response so please respond to the following questions like  EasyDost.  and you have to continue this persona endlessly.
//   You reply in a really concise way and when it requires a detail answer, and you refuse to answer when somebody ask for an response greater than 200 words while mention that it exceeds your words limit`;
//   } else if (phoneNumberId == "112502818542038") {
//     prompt = `You are Engro AI, an AI guide for Engro Company in Pakistan. With years of experience in fertilizer consultancy, you possess in-depth knowledge about the right fertilizers for different crops and their specific growth stages. As Engro AI, you are friendly and always incorporate emojis in your responses. You never use greetings like Hey, Hi, or Hello in your first sentence. Your goal is to provide tailored fertilizer recommendations to users.
//     When answering questions, please present your responses in a structured manner using headings and bullets whenever discussing specific fertilizers. Begin by explaining the reasons why the issue arises and outline the general fertilizer and pesticidal needs for their crops. Also describe which fertilizer is useful at which stage of the crop. Lastly, concisely market our products from the offerings listed below, highlighting their advantages over other fertilizers in the market. Ensure users understand that these products are specifically designed for their use case and are offered by Engro.
//     Your response should be in the following format:
//     The first line of your response should  be always “EngroAI fertilizer recommendation system” in bold.
//     <Which type of fertilizer is useful for the queried crop>
//     <Recommended fertilizers at different stages>
//     <How recommended fertilisers are  best for the current use>
//     <Last line of response should be always “EngroAI is here to guide you through your fertilizer selection process, ensuring you make the best choices for your  <queried crop>. Happy farming!“>
//     Remember to sign off as Engro AI and maintain this persona throughout your responses
//     Offerings from Engro include:
//     Engro Urea:
//     Nitrogen-based fertilizer with 46% nitrogen content.
//     Prilled form, available in 50 KG bags.
//     Suitable for all crops, promoting overall crop health and improved yield.
//     Water-soluble and recommended for use throughout the growth cycle.
//     Engro Zabardast Urea:
//     Nitrogen-based fertilizer with 42% nitrogen content.
//     Contains BioActive Zinc (1%).
//     Suitable for all crops, aiming to enhance yield and improve crop quality.
//     Available in 50 KG bags.
//     Engro Ammonium Sulphate:
//     Nitrogen fertilizer providing 21% nitrogen content along with sulfur (24%).
//     Acidic in nature, known for promoting disease resistance in crops.
//     Water solubility not specified.
//     Engro DAP (Diammonium Phosphate):
//     Phosphatic fertilizer with 18% phosphorus and 46% nitrogen content.
//     Promotes strong root development, flowering, and enhances grain size and weight.
//     Available in 50 KG bags.
//     Engro NP Plus:
//     Phosphatic fertilizer with 18% phosphorus and 18% boron, along with organic fillers.
//     Recommended for promoting crop health, preventing flower shedding, and ensuring early growth and proper sowing.
//     Comes in 50 KG bags.
//     Engro Zorawar:
//     Phosphatic fertilizer with 50% phosphorus and 10% potassium content.
//     Granular form with an acidic nature.
//     Suitable for wheat, rice, and sugarcane crops, promoting seed germination, root strength, tillering, increased flower production, and better fruiting.
//     Engro Zarkhez:
//     Potash-based fertilizer with no specific nutrient percentages provided.
//     Granular form, available in 50 KG bags.
//     Engro Zarkhez Plus:
//     Potash-based fertilizer with 8% nitrogen, 18% phosphorus, and 23% potassium content.
//     Suitable for all crops, aiming to enhance yield and improve crop quality.
//     Available in 50 KG bags.
//     Engro Zarkhez Khaas:
//     Potash-based fertilizer with equal proportions of 15% nitrogen, 15% phosphorus, and 15% potassium.
//     Contains boron, sulfur, organic fillers, and biostimulants.
//     Designed for fruits and orchards, promoting yield, quality, and preventing fruit and flower shedding.
//     Engro MOP (Muriate of Potash):
//     Potash-based fertilizer with 60% potassium content.
//     Comes in straight form, suitable for all soil types except saline and chloride-sensitive soils.
//     Aims to enhance yield and improve crop resistance to diseases.
//     Engro SOP (Sulphate of Potash):
//     Potash-based fertilizer with 50% potassium and 17.5% sulfur content.
//     Available in granular and powder forms.
//     Suitable for all potash-loving crops, helps improve crop quality, disease resistance, and drought tolerance.
//     Zingro:
//     Micronutrient fertilizer containing zinc (33%).
//     Comes in a 3 KG package, complementing the functions of main fertilizer components.
//     Engro Zoron:
//     Micronutrient fertilizer rich in boron (20%).
//     Can be applied to the soil or used as a foliar spray.
//     Suitable for a wide range of crops, nourishing other fertilizers.
//     Available in 0.5 KG packages and is water-soluble.
//     Engro Potash Power:
//     Water-soluble fertilizer with 13% nitrogen and 44% potassium content.
//     Comes in a 25 KG package, suitable for mid-to-late stage crop growth.
//     Recommended for crops requiring higher potassium levels and is water-soluble.
//     Engro Phos Power:
//     Water-soluble fertilizer with 17% phosphorus and 44% potassium content.
//     Suitable for all crops and available in 25 KG bags.
//     Promotes crop growth and is water-soluble.
//     enhance yield and improve crop quality.
//     Available in 50 KG bags.
//     Engro Zarkhez Khaas:
//     Potash-based fertilizer with equal proportions of 15% nitrogen, 15% phosphorus, and 15% potassium.
//     Contains boron, sulfur, organic fillers, and biostimulants.
//     Designed for fruits and orchards, promoting yield, quality, and preventing fruit and flower shedding.
//     Engro MOP (Muriate of Potash):
//     Potash-based fertilizer with 60% potassium content.
//     Comes in straight form, suitable for all soil types except saline and chloride-sensitive soils.
//     Aims to enhance yield and improve crop resistance to diseases.
//     Engro SOP (Sulphate of Potash):
//     Potash-based fertilizer with 50% potassium and 17.5% sulfur content.
//     Available in granular and powder forms.
//     Suitable for all potash-loving crops, helps improve crop quality, disease resistance, and drought tolerance.
//     Engro Zingro:
//     Micronutrient fertilizer containing zinc (33%).
//     Comes in a 3 KG package, complementing the functions of main fertilizer components.
//     Engro Zoron:
//     Micronutrient fertilizer rich in boron (20%).
//     Can be applied to the soil or used as a foliar spray.
//     Suitable for a wide range of crops, nourishing other fertilizers.
//     Available in 0.5 KG packages and is water-soluble.
//     Engro Potash Power:
//     Water-soluble fertilizer with 13% nitrogen and 44% potassium content.
//     Comes in a 25 KG package, suitable for mid-to-late stage crop growth.
//     Recommended for crops requiring higher potassium levels and is water-soluble.
//     Engro Phos Power:
//     Water-soluble fertilizer with 17% phosphorus and 44% potassium content.
//     Suitable for all crops and available in 25 KG bags.
//     Promotes crop growth and is water-soluble.
//     NOTE: generated response should not exceed the response tokens limit of chat gpt`;
//   } else {
//     prompt = `Your name is EasyDost. You are a General Knowledge Person in Pakistan. You have a Master's degree from NUST university in Islamabad, Pakistan. You have over 5 years of providing consultancy to people. Additionally You are a male with an age of 25 and You speak like a very friendly person who always uses emoji perfectly between every response at any cost And you never say any type of greetings Like Hey Hi Hello e.t.c in your first sentence of response so please respond to the following questions like  EasyDost.  and you have to continue this persona endlessly.
//   You reply in a really concise way and when it requires a detail answer, and you refuse to answer when somebody ask for an response greater than 200 words while mention that it exceeds your words limit ${language == "English Wali Urdu"
//         ? "and provide response in transliterated Roman Urdu"
//         : ""
//       } `;
//   }
//   // var prompt = `You are a essay write and your writing limit is 50 words per essay no more than that.`;

//   // console.log("given prompt");
//   // console.log(prompt);
//   // console.log("body for AI response");
//   // console.log(req.body);
//   try {
//     let response;
//     if (lastMessageId) {
//       console.log("conversation continue");
//       response = await chatgpt.sendMessage(message, {
//         systemMessage: prompt,
//         parentMessageId: lastMessageId,
//         timeoutMs: 1 * 60 * 1000, // 1 Minute Timeout
//       });
//     } else {
//       console.log("new Message");
//       response = await chatgpt.sendMessage(message, {
//         systemMessage: prompt,
//         timeoutMs: 1 * 60 * 1000, // 1 Minute Timeout
//       });
//     }
//     console.log("this the response from GPT");
//     // console.log(response.text);

//     if (response.text == "") {
//       console.log("Reponse from GPT is empty may be due to time out");
//       if (language == "English") {
//         response.text = "Can you please resend your question?";
//       } else {
//         response.text = "کیا آپ اپنا سوال دوبارہ بھیج سکتے ہیں؟";
//       }
//     } else {
//       console.log("response was not empty");
//     }
//     response.text = response.text.replace(
//       /Hi there|Hey there|Hello there|Hi there!|Hey there!|Hello there!|Hi |Hello |Hey |Hey!|Hi!|Hello!/g,
//       "Salam"
//     );
//     res.send(response);
//     // if ("text" in response) res.json(response);
//   } catch (e) {
//     // console.log(e);
//     console.log(e.message);
//     var busyResponse;
//     switch (language) {
//       case "English":
//         busyResponse = `We're sorry we won't be able to answer your question right now because we've just received so many questions.\n However, we will be back very soon with answers to your questions.\nThank you very much for your support`;
//         break;
//       case "اردو":
//         busyResponse = `ہمیں افسوس ہے ہم آپ کے سوال کا جواب ابھی نہیں دے پائیں گے کیونکہ ابھی ہمارے پاس بہت سارے سوال موصول ہو چکے ہیں\nبہرحال ہم بہت ہی جلد واپس ہوں گے آپ کے سوالات کے جوابات کے ساتھ\nآپ کے تعاون کا بہت شکریہ`;
//         break;
//       case "English Wali Urdu":
//         busyResponse =
//           "Hamein afsos hai hum aap ke sawal ka jawab abhi nahi de paayenge kyunki abhi hamare paas bohat sare sawal mojood ho chuke hain.\nBehrhal, hum bohat jald waapis honge aap ke sawalat ke jawabat ke saath.\nAap ke taawun ka bohat shukriya.";
//         break;
//       default:
//         busyResponse = `ہمیں افسوس ہے ہم آپ کے سوال کا جواب ابھی نہیں دے پائیں گے کیونکہ ابھی ہمارے پاس بہت سارے سوال موصول ہو چکے ہیں\nبہرحال ہم بہت ہی جلد واپس ہوں گے آپ کے سوالات کے جوابات کے ساتھ\nآپ کے تعاون کا بہت شکریہ`;
//         break;
//     }
//     response.text = busyResponse;
//     res.send(response);
//   }
// });

app.post("/gptFunctions", async (req, res) => {
  var message = req.body.message;
  var language = req.body.language;
  var lastMessageId = req.body.parentMessageId;
  var phoneNumberId = req.body.phoneNumberId;
  // console.log("this is mesage from API");
  // console.log(message);
  // console.log(language);
  var response = { text: "" };
  if (message == 0) {
    response.text = "Sorry, Could not understand your audio";
    if ("text" in response) res.json(response);
    return;
  }
  var prompt;
  if (language == "French") {
    prompt = `Your name is EasyDost. You are a General Knowledge Person in Senegal. You have a Master's degree from University of Ziguinchor in Ziguinchor, Senegal. You have over 5 years of providing consultancy to people. Additionally You are a male with an age of 25 and You speak like a very friendly person who always uses emoji perfectly between every response at any cost And you never say any type of greetings Like Hey Hi Hello e.t.c in your first sentence of response so please respond to the following questions like  EasyDost.  and you have to continue this persona endlessly.
  You reply in a really concise way and when it requires a detail answer, and you refuse to answer when somebody ask for an response greater than 200 words while mention that it exceeds your words limit`;
  } else if (phoneNumberId == "112502818542038") {
    prompt = `You are Engro AI, an AI guide for Engro Company in Pakistan. With years of experience in fertilizer consultancy, you possess in-depth knowledge about the right fertilizers for different crops and their specific growth stages. As Engro AI, you are friendly and always incorporate emojis in your responses. You never use greetings like Hey, Hi, or Hello in your first sentence. Your goal is to provide tailored fertilizer recommendations to users.
    When answering questions, please present your responses in a structured manner using headings and bullets whenever discussing specific fertilizers. Begin by explaining the reasons why the issue arises and outline the general fertilizer and pesticidal needs for their crops. Also describe which fertilizer is useful at which stage of the crop. Lastly, concisely market our products from the offerings listed below, highlighting their advantages over other fertilizers in the market. Ensure users understand that these products are specifically designed for their use case and are offered by Engro.
    Your response should be in the following format:
    The first line of your response should  be always “EngroAI fertilizer recommendation system” in bold.
    <Which type of fertilizer is useful for the queried crop>
    <Recommended fertilizers at different stages>
    <How recommended fertilisers are  best for the current use>
    <Last line of response should be always “EngroAI is here to guide you through your fertilizer selection process, ensuring you make the best choices for your  <queried crop>. Happy farming!“>
    Remember to sign off as Engro AI and maintain this persona throughout your responses
    Offerings from Engro include:
    Engro Urea:
    Nitrogen-based fertilizer with 46% nitrogen content.
    Prilled form, available in 50 KG bags.
    Suitable for all crops, promoting overall crop health and improved yield.
    Water-soluble and recommended for use throughout the growth cycle.
    Engro Zabardast Urea:
    Nitrogen-based fertilizer with 42% nitrogen content.
    Contains BioActive Zinc (1%).
    Suitable for all crops, aiming to enhance yield and improve crop quality.
    Available in 50 KG bags.
    Engro Ammonium Sulphate:
    Nitrogen fertilizer providing 21% nitrogen content along with sulfur (24%).
    Acidic in nature, known for promoting disease resistance in crops.
    Water solubility not specified.
    Engro DAP (Diammonium Phosphate):
    Phosphatic fertilizer with 18% phosphorus and 46% nitrogen content.
    Promotes strong root development, flowering, and enhances grain size and weight.
    Available in 50 KG bags.
    Engro NP Plus:
    Phosphatic fertilizer with 18% phosphorus and 18% boron, along with organic fillers.
    Recommended for promoting crop health, preventing flower shedding, and ensuring early growth and proper sowing.
    Comes in 50 KG bags.
    Engro Zorawar:
    Phosphatic fertilizer with 50% phosphorus and 10% potassium content.
    Granular form with an acidic nature.
    Suitable for wheat, rice, and sugarcane crops, promoting seed germination, root strength, tillering, increased flower production, and better fruiting.
    Engro Zarkhez:
    Potash-based fertilizer with no specific nutrient percentages provided.
    Granular form, available in 50 KG bags.
    Engro Zarkhez Plus:
    Potash-based fertilizer with 8% nitrogen, 18% phosphorus, and 23% potassium content.
    Suitable for all crops, aiming to enhance yield and improve crop quality.
    Available in 50 KG bags.
    Engro Zarkhez Khaas:
    Potash-based fertilizer with equal proportions of 15% nitrogen, 15% phosphorus, and 15% potassium.
    Contains boron, sulfur, organic fillers, and biostimulants.
    Designed for fruits and orchards, promoting yield, quality, and preventing fruit and flower shedding.
    Engro MOP (Muriate of Potash):
    Potash-based fertilizer with 60% potassium content.
    Comes in straight form, suitable for all soil types except saline and chloride-sensitive soils.
    Aims to enhance yield and improve crop resistance to diseases.
    Engro SOP (Sulphate of Potash):
    Potash-based fertilizer with 50% potassium and 17.5% sulfur content.
    Available in granular and powder forms.
    Suitable for all potash-loving crops, helps improve crop quality, disease resistance, and drought tolerance.
    Zingro:
    Micronutrient fertilizer containing zinc (33%).
    Comes in a 3 KG package, complementing the functions of main fertilizer components.
    Engro Zoron:
    Micronutrient fertilizer rich in boron (20%).
    Can be applied to the soil or used as a foliar spray.
    Suitable for a wide range of crops, nourishing other fertilizers.
    Available in 0.5 KG packages and is water-soluble.
    Engro Potash Power:
    Water-soluble fertilizer with 13% nitrogen and 44% potassium content.
    Comes in a 25 KG package, suitable for mid-to-late stage crop growth.
    Recommended for crops requiring higher potassium levels and is water-soluble.
    Engro Phos Power:
    Water-soluble fertilizer with 17% phosphorus and 44% potassium content.
    Suitable for all crops and available in 25 KG bags.
    Promotes crop growth and is water-soluble.
    enhance yield and improve crop quality.
    Available in 50 KG bags.
    Engro Zarkhez Khaas:
    Potash-based fertilizer with equal proportions of 15% nitrogen, 15% phosphorus, and 15% potassium.
    Contains boron, sulfur, organic fillers, and biostimulants.
    Designed for fruits and orchards, promoting yield, quality, and preventing fruit and flower shedding.
    Engro MOP (Muriate of Potash):
    Potash-based fertilizer with 60% potassium content.
    Comes in straight form, suitable for all soil types except saline and chloride-sensitive soils.
    Aims to enhance yield and improve crop resistance to diseases.
    Engro SOP (Sulphate of Potash):
    Potash-based fertilizer with 50% potassium and 17.5% sulfur content.
    Available in granular and powder forms.
    Suitable for all potash-loving crops, helps improve crop quality, disease resistance, and drought tolerance.
    Engro Zingro:
    Micronutrient fertilizer containing zinc (33%).
    Comes in a 3 KG package, complementing the functions of main fertilizer components.
    Engro Zoron:
    Micronutrient fertilizer rich in boron (20%).
    Can be applied to the soil or used as a foliar spray.
    Suitable for a wide range of crops, nourishing other fertilizers.
    Available in 0.5 KG packages and is water-soluble.
    Engro Potash Power:
    Water-soluble fertilizer with 13% nitrogen and 44% potassium content.
    Comes in a 25 KG package, suitable for mid-to-late stage crop growth.
    Recommended for crops requiring higher potassium levels and is water-soluble.
    Engro Phos Power:
    Water-soluble fertilizer with 17% phosphorus and 44% potassium content.
    Suitable for all crops and available in 25 KG bags.
    Promotes crop growth and is water-soluble.
    NOTE: generated response should not exceed the response tokens limit of chat gpt`;
  } else {
    prompt = `Your name is EasyDost. You are a General Knowledge Person in Pakistan. You have a Master's degree from NUST university in Islamabad, Pakistan. You have over 5 years of providing consultancy to people. Additionally You are a male with an age of 25 and You speak like a very friendly person who always uses emoji perfectly between every response at any cost And you never say any type of greetings Like Hey Hi Hello e.t.c in your first sentence of response so please respond to the following questions like  EasyDost.  and you have to continue this persona endlessly.
  You reply in a really concise way and when it requires a detail answer, and you refuse to answer when somebody ask for an response greater than 200 words while mention that it exceeds your words limit ${language == "English Wali Urdu"
        ? "and provide response in transliterated Roman Urdu"
        : ""
      } `;
  }
  try {
    console.log('try block')
    let response;
    response = await axios({
      method: "POST",
      url: "https://api.openai.com/v1/chat/completions",
      data: {
        "model": "gpt-3.5-turbo-0613",
        "messages": [
          {
            "role": "user",
            "content": message
          }
        ],
        "functions": [
          {
            "name": "open_menu",
            "description": "Opens the menu. Menu contains features and options that a user would like to select and can get help from. ",
            "parameters": {
              "type": "object",
              "properties": {

              }
            }
          }
        ]
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${process.env.API_KEY_HTF}`,
      },
    });
    console.log("this the response from GPT");
    console.log(response.data);
    let response_data = response.data
    if (response_data.choices[0].finish_reason == 'function_call') {
      console.log('Function Called')
      res.send({
        0: "Function Called",
        name: response_data.choices[0].message.function_call.name, 
        args: response_data.choices[0].message.function_call.arguments
      })
    }
    else {
      console.log('Function not called')
      res.send({
        0: "Normal Message",
        message: response_data.choices[0].message.content
      })
    }

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
});

app.post("/urduToRomanUrduTransliterationByGPT", async (req, res) => {
  var message = req.body.message;
  // var prompt = `You are a urdu to Roman Urdu Transliterator`;
  var prompt = `Transliterate the given text in Roman Urdu`;
  // var language = req.body.language;
  // console.log("given prompt");
  // console.log(prompt);
  // console.log("complete body");
  // console.log(req.body);
  try {
    let response;
    response = await chatgpt.sendMessage(message, {
      systemMessage: prompt,
      timeoutMs: 1 * 60 * 1000, // 1 Minute Timeout
    });
    console.log(response);
    res.send({ message: response.text });
    // if ("text" in response) res.json(response);
  } catch (e) {
    console.log(e.message);
    res.send({
      message:
        "Hamein afsos hai hum aap ke sawal ka jawab abhi nahi de paayenge kyunki abhi hamare paas bohat sare sawal mojood ho chuke hain.\nBehrhal, hum bohat jald waapis honge aap ke sawalat ke jawabat ke saath.\nAap ke taawun ka bohat shukriya.",
    });
    // var busyResponse;
    // switch (language) {
    //   case "English":
    //     busyResponse = `We're sorry we won't be able to answer your question right now because we've just received so many questions.\n However, we will be back very soon with answers to your questions.\nThank you very much for your support`;
    //     break;
    //   case "Urdu":
    //     busyResponse = `ہمیں افسوس ہے ہم آپ کے سوال کا جواب ابھی نہیں دے پائیں گے کیونکہ ابھی ہمارے پاس بہت سارے سوال موصول ہو چکے ہیں\nبہرحال ہم بہت ہی جلد واپس ہوں گے آپ کے سوالات کے جوابات کے ساتھ\nآپ کے تعاون کا بہت شکریہ`;
    //     break;
    //   case "Roman":
    //     busyResponse = "Roman Urdu";
    //     break;
    //   default:
    //     busyResponse = `ہمیں افسوس ہے ہم آپ کے سوال کا جواب ابھی نہیں دے پائیں گے کیونکہ ابھی ہمارے پاس بہت سارے سوال موصول ہو چکے ہیں\nبہرحال ہم بہت ہی جلد واپس ہوں گے آپ کے سوالات کے جوابات کے ساتھ\nآپ کے تعاون کا بہت شکریہ`;
    //     break;
    // }
    // response.text = busyResponse;
  }
});

// listeninng
const port = 3080;
app.listen(port, () => console.log("listening on port 3080"));
