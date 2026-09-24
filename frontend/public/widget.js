// public/widget.js
(function() {
  // Crear el botón flotante
  const button = document.createElement('button');
  button.innerText = '💬';
  button.style.cssText = 'position:fixed;bottom:20px;right:20px;width:60px;height:60px;border-radius:50%;background:#0066cc;color:#fff;border:none;cursor:pointer;z-index:999999;font-size:24px;box-shadow:0 4px 10px rgba(0,0,0,0.3);';

  // Crear el contenedor del Iframe
  const iframe = document.createElement('iframe');
  iframe.src = 'https://chatbot-ifts29.vercel.app/';
  iframe.style.cssText = 'position:fixed;bottom:90px;right:20px;width:380px;height:520px;border:none;border-radius:12px;box-shadow:0 5px 20px rgba(0,0,0,0.25);z-index:999999;display:none;';

  button.onclick = () => {
    iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
  };

  document.body.appendChild(button);
  document.body.appendChild(iframe);
})();