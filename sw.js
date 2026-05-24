// Ouvinte de segundo plano para capturar notificações enviadas pelo servidor
self.addEventListener('push', function(event) {
  let dados = { titulo: "Aviso Deluz", mensagem: "Nova atualização no sistema." };
  
  if (event.data) {
    try {
      dados = event.data.json();
    } catch (e) {
      dados.mensagem = event.data.text();
    }
  }

  const opcoes = {
    body: dados.mensagem,
    icon: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png',
    vibrate: [200, 100, 200], // Faz o celular vibrar no bolso do supervisor
    data: { dateOfArrival: Date.now() }
  };

  event.waitUntil(
    self.registration.showNotification(dados.titulo, opcoes)
  );
});

// Garante que o aplicativo abra na tela correta ao clicar na notificação
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
