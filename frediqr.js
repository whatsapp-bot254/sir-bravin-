const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Fredi_Ezra,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@fredi/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function WHATSAPP_BOT_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Fredi_Ezra = Fredi_Ezra({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Fredi_Ezra.ev.on('creds.update', saveCreds)
			Qr_Code_By_Fredi_Ezra.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(50000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(8000);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Fredi_Ezra.sendMessage(Qr_Code_By_Fredi_Ezra.user.id, { text: 'sir bravin~' + b64data });
	
				   let WHATSAPP_BOT_TEXT = `
*$$$$$$$$$$$$$$$$$$$$*

*CONGRATULATIONS 👏 WHATSAPP BOT MULTI DEVICE 🗡️ IS CONNECTED TO YOUR WHATSAPP🤞*

*■■■■■■■■■■■■■■■*
_📢 FOR UPDATE AND HELPING FOLLOW CHANNEL 🌎 OR VISIT WEBSITE 🌐_ 
*📢 channel link*
> https://whatsapp.com/channel/0029VbB4nox4Y9lqVl2X8n3m
*🌐 Bot Host website link*
> https://sir-bravine-delta.vercel.app/

*&&&&&&&&&&&&&&&&&&&*
_ℹ️ FOR MORE INFORMATION ABOUT AS AND BOT_
 
*👤 sub GitHub info* @follow
> https://github.com/whatsapp-bot254
*🆕 Visit Our Website 
> https://sir-bravine-delta.vercel.app/
*🗝️ Digitex xmd repo*
> https://github.com/whatsapp-bot254/whatsapp-bot
> Don't forget 😜 fork 🍴 and star 🌟 repo
*All is safe on heroku 🟢*

*■■■■■■■■■■■■■■*
 _💬 for any problem connect with me_
> bravin https://wa.me/254717263689
> bravin https://wa.me/254717263689
*THIS PROJECT SCRIPTS CREATED BY Whatsapp bot*
*■■■■■■■■■■■■■■*
> regards bravin`;
	 await Qr_Code_By_Fredi_Ezra.sendMessage(Qr_Code_By_Fredi_Ezra.user.id,{text: WHATSAPP_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Fredi_Ezra.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					LUCKY_MD_XFORCE_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await LUCKY_MD_XFORCE_QR_CODE()
});
module.exports = router
