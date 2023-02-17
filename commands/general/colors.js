const fs = require("fs")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { MessageEmbed, MessageAttachment } = require("discord.js");
module.exports = {
  name: "colors",
  description: "علبه اللوان",
  aliases: ["اللوان","الوان"],
  usage: `{prefix}colors`,
  examples: `{prefix}colors`,
  type: "general",
  run: async (client, message , Discord) => {
  
    const { Canvas, resolveImage } = require('canvas-constructor/cairo');
let x = 0;
let y = 150; //ثابت نكفى
if (message.guild.roles.cache.filter(role => !isNaN(role.name) && !role.name.includes('.')).size <= 0) return;
let sizee = message.guild.roles.cache.filter(role => !isNaN(role.name) && !role.name.includes('.')).size
message.guild.roles.cache.filter(role => !isNaN(role.name) && !role.name.includes('.')).sort((b1, b2) => b1.name - b2.name).forEach(() => {
  x += 80;
  if (x > 100 * 9) {
      x = 50;
      y += 50;
 }
});

var photo = await db.get(`img_${message.guild.id}_colors`)
if(photo == null){
var image = await resolveImage('https://media.discordapp.net/attachments/828548538732118036/938798323802964038/580.png?width=187&height=406');

}else{
var image = await resolveImage(`${photo}`);

}
let image2 = await resolveImage("https://media.discordapp.net/attachments/872215634753228901/938538993954472016/layer.png?width=825&height=375");
if (sizee == 100 || sizee == 101 || sizee == 102 || sizee == 103 || sizee == 104 || sizee == 105 || sizee == 106 || sizee == 107 || sizee == 108 || sizee == 109 || sizee == 110 || sizee == 111){
   si = 550
}
if (sizee == 89 || sizee == 90 || sizee == 91 || sizee == 92 || sizee == 93 || sizee == 94 || sizee == 95 || sizee == 96 || sizee == 97 || sizee == 98 || sizee == 99){
   si = 488
}
else if (sizee == 78 || sizee == 79 || sizee == 80 || sizee == 81 || sizee == 82 || sizee == 83 || sizee == 84 || sizee == 85 || sizee == 86 || sizee == 87 || sizee == 88){
  si = 440
}
else if (sizee == 67 || sizee ==68 || sizee == 69 || sizee == 70 || sizee == 71 || sizee == 72 || sizee == 73 || sizee == 74 || sizee == 75 || sizee == 76 || sizee == 77){
si = 390
}
else if (sizee == 56  || sizee == 57  || sizee == 58 || sizee == 59 || sizee == 60 || sizee == 61 || sizee == 62 || sizee == 63 || sizee == 64 || sizee == 65 || sizee == 66){
si = 345
}
else if (sizee == 45  || sizee == 46 || sizee == 47  || sizee == 48  || sizee == 49 || sizee == 50 || sizee == 51  || sizee == 52 || sizee == 53  || sizee == 54 || sizee ==  55){
si = 285
}
else if (sizee == 34 ||  sizee ==  35 || sizee == 36 || sizee == 37 || sizee == 38 || sizee ==  39 || sizee == 40|| sizee == 41  || sizee ==42 || sizee == 43 || sizee == 44){
si = 255
}
else if (sizee == 23 ||  sizee ==  24 || sizee == 25 || sizee == 26 || sizee == 27 || sizee ==  28 || sizee == 29|| sizee == 30  || sizee ==31 || sizee ==32 || sizee == 33){
si = 210
}
else if (sizee == 12 || sizee == 13  || sizee == 14|| sizee == 15  || sizee ==16 || sizee == 17  || sizee == 18|| sizee == 19  || sizee == 20|| sizee == 21|| sizee == 22){
si = 180
}
else if (sizee == 1 || sizee ==2  || sizee ==3  || sizee ==4  || sizee == 5 || sizee ==  6 || sizee == 7 || sizee == 8  || sizee == 9 || sizee == 10 || sizee == 11){
si = 180
}
let sir = 1200
let colrsList = new Canvas(sir, y + si)
.printImage(image, 0, 0, sir, y + si)
.printImage(image2, 0, 0, sir, y + si)
.setTextBaseline("middle")// لاتسوي شي  | سم
.setColor("#b3b3b3")
.setTextFont('26px Arial')
.setTextSize(100)
//.printText("Color list", 400, 80); //كللام على الصورة

x = 20;  //الالوان يمين يسار
y = 145; //الالوان فوق تحت
message.guild.roles.cache.filter(role => !isNaN(role.name)).sort((b1, b2) => b1.name - b2.name).forEach(role => {
 
    x += 90; // مساحه بين كل لون يمين يسار
  if (x > 1080) {  //عدد الالوان في كل سطر
      x = 110;  //يودي الالوان يمين يسار 
      y += 90; // مساحه بين الالوان فوق تحت
  }
colrsList.setTextBaseline("middle")
.setTextAlign("center")
.setShadowColor("black")
.setShadowBlur(8)
.setColor(role.hexColor)
.printRoundedRectangle(x, y, 70, 70, 15) //الالوان دائرية مربعه وتكبير وتصغير
.setColor("white");
if (`${role.name}`.length > 2) {
colrsList.setTextSize(30); //حجم الالوان
} else if (`${role.name}`.length > 1) {
colrsList.setTextSize(40); //حجم الالوان
} else {
colrsList.setTextSize(50); //حجم الالوان
}
colrsList.printText(role.name, x + 36, y + 36); //مكان ارقام الالوان
});
const attachment = new MessageAttachment(colrsList.toBuffer(), 'img.png');

message.channel.send({ files:[attachment] }).catch(m=>{return;});



}
}