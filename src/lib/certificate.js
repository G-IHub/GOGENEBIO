// Shared certificate rendering. Used by both the admin live-preview (as they
// fill in the template) and the participant download page after submitting a
// testimonial, so what the admin sees is exactly what gets generated.

import defaultLogo from "../assets/Logo.png";

export const CERT_WIDTH = 1600;
export const CERT_HEIGHT = 1130;

const wrapLines = (ctx, text, maxWidth) => {
  const words = (text || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
};

const loadImage = (src) =>
  new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

const drawSignatory = (ctx, x, sigY, name, title, imageEl) => {
  if (!name && !imageEl) return;
  if (imageEl) {
    const maxW = 220;
    const maxH = 90;
    const scale = Math.min(maxW / imageEl.width, maxH / imageEl.height, 1);
    const w = imageEl.width * scale;
    const h = imageEl.height * scale;
    ctx.drawImage(imageEl, x - w / 2, sigY - h - 6, w, h);
  }
  ctx.strokeStyle = "#c9bfdd";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 140, sigY + 10);
  ctx.lineTo(x + 140, sigY + 10);
  ctx.stroke();
  ctx.fillStyle = "#0f0f0f";
  ctx.font = "600 24px Georgia, serif";
  ctx.fillText(name || "", x, sigY + 44);
  ctx.fillStyle = "#8a8598";
  ctx.font = "18px Georgia, serif";
  ctx.fillText(title || "", x, sigY + 70);
};

/**
 * Draws a certificate onto `canvas` for `participantName`, using the admin's
 * `template` row (title, program_name, body_text, background_url,
 * signatory1/2 name/title/signature_url).
 */
export async function drawCertificate(canvas, template, participantName) {
  if (!canvas) return;
  canvas.width = CERT_WIDTH;
  canvas.height = CERT_HEIGHT;
  const ctx = canvas.getContext("2d");
  const W = CERT_WIDTH;
  const H = CERT_HEIGHT;
  const name = (participantName || "").trim() || "Participant Name";
  const accent = template?.accent_color || "#b241b7";
  const accent2 = template?.accent_color_2 || "#3d168b";

  const [bg, sig1, sig2, logo] = await Promise.all([
    loadImage(template?.background_url),
    loadImage(template?.signatory1_signature_url),
    loadImage(template?.signatory2_signature_url),
    loadImage(template?.logo_url || defaultLogo),
  ]);

  // Background
  if (bg) {
    const scale = Math.max(W / bg.width, H / bg.height);
    const w = bg.width * scale;
    const h = bg.height * scale;
    ctx.drawImage(bg, (W - w) / 2, (H - h) / 2, w, h);
  } else {
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#f5eefb");
    grad.addColorStop(1, "#ffffff");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  // Decorative border
  ctx.strokeStyle = accent;
  ctx.lineWidth = 6;
  ctx.strokeRect(40, 40, W - 80, H - 80);
  ctx.strokeStyle = accent2;
  ctx.lineWidth = 2;
  ctx.strokeRect(56, 56, W - 112, H - 112);

  ctx.textAlign = "center";

  // Logo (defaults to the Genomac Holdings logo bundled with the app)
  if (logo) {
    const maxLogoH = 85;
    const scale = Math.min(maxLogoH / logo.height, 85 / logo.width);
    const lw = logo.width * scale;
    const lh = logo.height * scale;
    ctx.drawImage(logo, (W - lw) / 2, 55, lw, lh);
  }

  ctx.fillStyle = accent2;
  ctx.font = "600 28px Georgia, serif";
  ctx.fillText(
    (template?.program_name || "GoGeneBio Global Outreach").toUpperCase(),
    W / 2,
    195
  );

  ctx.fillStyle = "#0f0f0f";
  ctx.font = "bold 64px Georgia, serif";
  ctx.fillText(template?.title || "Certificate of Participation", W / 2, 275);

  ctx.fillStyle = "#55506b";
  ctx.font = "26px Georgia, serif";
  ctx.fillText("This is to certify that", W / 2, 350);

  ctx.fillStyle = accent;
  ctx.font = "bold 72px Georgia, serif";
  ctx.fillText(name, W / 2, 440);

  const nameWidth = Math.min(ctx.measureText(name).width + 60, W - 300);
  ctx.strokeStyle = "#e0cff2";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - nameWidth / 2, 465);
  ctx.lineTo(W / 2 + nameWidth / 2, 465);
  ctx.stroke();

  ctx.fillStyle = "#3f3a52";
  ctx.font = "28px Georgia, serif";
  const body = (
    template?.body_text ||
    "has successfully participated in the {program} program."
  )
    .replace(/{name}/g, name)
    .replace(/{program}/g, template?.program_name || "GoGeneBio Global Outreach");
  let y = 530;
  wrapLines(ctx, body, W - 400).forEach((line) => {
    ctx.fillText(line, W / 2, y);
    y += 40;
  });

  // Program covered — short list of topics, set by the admin.
  const topics = (template?.topics || []).filter(Boolean);
  if (topics.length > 0) {
    y += 30;
    ctx.fillStyle = "#8a8598";
    ctx.font = "600 20px Georgia, serif";
    ctx.fillText("PROGRAM COVERED", W / 2, y);
    y += 34;

    ctx.font = "24px Georgia, serif";
    const colX = [W * 0.28, W * 0.56];
    const colWidth = W * 0.26;
    const rowHeight = 34;
    topics.forEach((topic, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = colX[col];
      const rowY = y + row * rowHeight;
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(x, rowY - 7, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#3f3a52";
      ctx.textAlign = "left";
      const [firstLine] = wrapLines(ctx, topic, colWidth);
      ctx.fillText(firstLine, x + 16, rowY);
      ctx.textAlign = "center";
    });
  }

  // Issue date — centered, between the program-covered list and the
  // signature block (moved off the bottom-right corner per admin feedback).
  const topicRows = topics.length > 0 ? Math.ceil(topics.length / 2) : 0;
  const topicsEndY = y + topicRows * 34;
  const dateY = Math.min(topicsEndY + 50, H - 260);
  ctx.textAlign = "center";
  ctx.fillStyle = "#8a8598";
  ctx.font = "20px Georgia, serif";
  const dateStr = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  ctx.fillText(`Issued ${dateStr}`, W / 2, dateY);

  const sigY = H - 190;
  if (template?.signatory2_name || sig2) {
    drawSignatory(ctx, W * 0.28, sigY, template?.signatory1_name, template?.signatory1_title, sig1);
    drawSignatory(ctx, W * 0.72, sigY, template?.signatory2_name, template?.signatory2_title, sig2);
  } else {
    drawSignatory(ctx, W / 2, sigY, template?.signatory1_name, template?.signatory1_title, sig1);
  }
}

/** Triggers a PNG download of the canvas's current contents. */
export function downloadCanvas(canvas, filename) {
  if (!canvas) return;
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }, "image/png");
}
