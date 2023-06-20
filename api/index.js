// import bodyParser from "body-parser";
// import { ChatGPTAPI } from "chatgpt";
// import cors from "cors";
// import env from "dotenv";
// import express from "express";

// const app = express();

// import {gptResonse} from "./";

// env.config();

// app.use(cors());
// app.use(bodyParser.json());
// app.use('/api/gptresponse',gptResonse)

// // Initialize ChatGPT
// const chatgpt = new ChatGPTAPI({
//   apiKey: process.env.API_KEY,
// });


// // dummy route to test
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.post("/urduToRomanUrduTransliterationByGPT", async (req, res) => {
//   var message = req.body.message;
//   // var prompt = `You are a urdu to Roman Urdu Transliterator`;
//   var prompt = `Transliterate the given text in Roman Urdu`;
//   // var language = req.body.language;
//   // console.log("given prompt");
//   // console.log(prompt);
//   // console.log("complete body");
//   // console.log(req.body);
//   try {
//     let response;
//     response = await chatgpt.sendMessage(message, {
//       systemMessage: prompt,
//       timeoutMs: 1 * 60 * 1000, // 1 Minute Timeout
//     });
//     console.log(response);
//     res.send({ message: response.text });
//     // if ("text" in response) res.json(response);
//   } catch (e) {
//     console.log(e.message);
//     res.send({
//       message:
//         "Hamein afsos hai hum aap ke sawal ka jawab abhi nahi de paayenge kyunki abhi hamare paas bohat sare sawal mojood ho chuke hain.\nBehrhal, hum bohat jald waapis honge aap ke sawalat ke jawabat ke saath.\nAap ke taawun ka bohat shukriya.",
//     });
//     // var busyResponse;
//     // switch (language) {
//     //   case "English":
//     //     busyResponse = `We're sorry we won't be able to answer your question right now because we've just received so many questions.\n However, we will be back very soon with answers to your questions.\nThank you very much for your support`;
//     //     break;
//     //   case "Urdu":
//     //     busyResponse = `ہمیں افسوس ہے ہم آپ کے سوال کا جواب ابھی نہیں دے پائیں گے کیونکہ ابھی ہمارے پاس بہت سارے سوال موصول ہو چکے ہیں\nبہرحال ہم بہت ہی جلد واپس ہوں گے آپ کے سوالات کے جوابات کے ساتھ\nآپ کے تعاون کا بہت شکریہ`;
//     //     break;
//     //   case "Roman":
//     //     busyResponse = "Roman Urdu";
//     //     break;
//     //   default:
//     //     busyResponse = `ہمیں افسوس ہے ہم آپ کے سوال کا جواب ابھی نہیں دے پائیں گے کیونکہ ابھی ہمارے پاس بہت سارے سوال موصول ہو چکے ہیں\nبہرحال ہم بہت ہی جلد واپس ہوں گے آپ کے سوالات کے جوابات کے ساتھ\nآپ کے تعاون کا بہت شکریہ`;
//     //     break;
//     // }
//     // response.text = busyResponse;
//   }
// });

// // listeninng
// const port = 3080;
// const server=app.listen(port, () => console.log("listening on port 3080"));
// export {server};
