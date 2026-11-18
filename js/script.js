document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  function sendFormToWhatsApp(form, intro) {
    const data = new FormData(form);
    const destination = data.get('destino');
    if (!destination) return;
    const lines = [intro];
    for (const [key, value] of data.entries()) {
      if (key === 'destino') continue;
      if (key === 'nome') lines.push('Nome: ' + value);
      else if (key === 'telefone') lines.push('WhatsApp: ' + value);
      else if (key === 'cidade') lines.push('Cidade: ' + value);
      else if (key === 'estado') lines.push('Estado: ' + value);
      else if (key === 'servico') lines.push('Serviço: ' + value);
      else if (key === 'descricao') lines.push('Descrição: ' + value);
      else if (key === 'especialidade') lines.push('Especialidade: ' + value);
      else if (key === 'experiencia') lines.push('Experiência: ' + value);
      else if (key === 'disponibilidade') lines.push('Disponibilidade: ' + value);
      else if (key === 'experiencia_detalhes' && String(value).trim()) lines.push('Detalhes: ' + value);
    }
    const url = 'https://wa.me/' + String(destination).replace(/\D/g, '') + '?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const clientForm = document.getElementById('clientForm');
  if (clientForm) clientForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (!this.reportValidity()) return;
    sendFormToWhatsApp(this, 'Olá! Gostaria de solicitar um atendimento/orçamento técnico à RM TEC.');
  });

  const techForm = document.getElementById('techForm');
  if (techForm) techForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (!this.reportValidity()) return;
    sendFormToWhatsApp(this, 'Olá! Gostaria de me cadastrar como técnico parceiro da RM TEC.');
  });
});
