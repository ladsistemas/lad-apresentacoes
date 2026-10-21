// Desenha uma conversa de WhatsApp a partir de mensagens [{de: "cliente"|"agente", hora, texto}].
// Formatação do WhatsApp: *negrito*, linhas e links. Usado pelas peças do agente de IA (agente-ia-*.html).
function bolhasWhatsapp(mensagens) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return mensagens.map((m) => {
    const html = esc(m.texto)
      .replace(/\*([^*\n]+)\*/g, "<b>$1</b>")
      .replace(/(https?:\/\/\S+)/g, '<span class="lnk">$1</span>');
    const lado = m.de === "cliente" ? "sai" : "entra";
    return `<div class="msg ${lado}"><div class="txt">${html}</div><span class="hora">${m.hora}${lado === "sai" ? ' <span class="check">&#10003;&#10003;</span>' : ""}</span></div>`;
  }).join("");
}

function desenharChats() {
  document.querySelectorAll("[data-chat]").forEach((el) => {
    const [conversa, de, ate] = el.dataset.chat.split(":");
    el.innerHTML = bolhasWhatsapp(window.CONVERSAS[conversa].slice(Number(de || 0), ate ? Number(ate) : undefined));
  });
}
document.addEventListener("DOMContentLoaded", desenharChats);
