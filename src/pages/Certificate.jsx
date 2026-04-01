import { useState } from "react";

export default function Certificate() {
  const [name, setName] = useState("");

  const generateCertificate = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const W = 1600;
    const H = 1100;
    canvas.width = W;
    canvas.height = H;

    // ===== BACKGROUND =====
    ctx.fillStyle = "#fffaf0";
    ctx.fillRect(0, 0, W, H);

    // ===== BORDER =====
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 12;
    ctx.strokeRect(40, 40, W - 80, H - 80);

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, W - 120, H - 120);

    // ===== WATERMARK =====
    ctx.globalAlpha = 0.05;
    ctx.font = "bold 180px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("IIMT", W / 2, H / 2);
    ctx.globalAlpha = 1;

    // ===== LOAD IMAGES =====
  const iimtLogo = new Image();
  const clubLogo = new Image();
  const sign = new Image();

  iimtLogo.src = "/iimt-logo.png";       // 👈 add in public
  clubLogo.src = "/codevastra-logo.png"; // 👈 add in public
  sign.src = "/saurabh-sign.png";        // 👈 add signature image

  iimtLogo.onload = () => {
    clubLogo.onload = () => {
      sign.onload = () => {

        // ===== LOGOS =====
        ctx.drawImage(iimtLogo, 120, 100, 120, 120);
        ctx.drawImage(clubLogo, W - 220, 80, 120, 120);

    // ===== HEADER =====
    ctx.fillStyle = "#000";
    ctx.font = "bold 50px Georgia";
    ctx.fillText("IIMT Engineering College", W / 2, 130);

    ctx.font = "22px Georgia";
    ctx.fillStyle = "#555";
    ctx.fillText("Meerut, Uttar Pradesh, India", W / 2, 170);

    // ===== TITLE =====
    ctx.fillStyle = "#000";
    ctx.font = "bold 60px Georgia";
    ctx.fillText("Certificate", W / 2, 300);

    ctx.font = "28px Georgia";
    ctx.fillText("of Participation", W / 2, 340);

    // ===== LINE =====
    ctx.beginPath();
    ctx.moveTo(350, 370);
    ctx.lineTo(W - 350, 370);
    ctx.strokeStyle = "#d4af37";
    ctx.stroke();

    // ===== BODY =====
    ctx.fillStyle = "#444";
    ctx.font = "24px Georgia";
    ctx.fillText("This is to certify that", W / 2, 450);

    ctx.fillStyle = "#000";
    ctx.font = "bold 70px Georgia";
    ctx.fillText(name || "YOUR NAME", W / 2, 540);

    ctx.fillStyle = "#444";
    ctx.font = "24px Georgia";
    ctx.fillText("has successfully participated in", W / 2, 600);

    ctx.fillStyle = "#b45309";
    ctx.font = "bold 30px Georgia";
    ctx.fillText("CodeWars Coding Competition", W / 2, 650);

    // ===== FOOTER =====
    ctx.font = "20px Georgia";
    ctx.fillStyle = "#000";

    ctx.textAlign = "left";
    ctx.fillText("Date: 18 Nov 2025", 120, 780);



    // ===== SIGNATURE =====
    ctx.textAlign = "center";
    ctx.drawImage(sign, 300, 830, 180, 80);

        ctx.beginPath();
        ctx.moveTo(300, 900);
        ctx.lineTo(500, 900);
        ctx.stroke();

        ctx.fillText("Saurabh Gupta", 400, 940);
        ctx.fillText("Faculty Coordinator", 400, 970);

    
    
    

    // ===== DOWNLOAD =====
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}_certificate.png`;
      a.click();
    });
  };
    };
    };
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-2xl font-bold mb-6">Generate Certificate</h1>

      <input
        className="border px-4 py-2 mb-4 w-80"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={generateCertificate}
        className="bg-orange-500 text-white px-6 py-2 rounded"
      >
        Download Certificate
      </button>
    </div>
  );
}