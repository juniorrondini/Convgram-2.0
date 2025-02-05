# Convgram 2.0

**Descrição:**
O Convgram 2.0 é um aplicativo de mensagens inspirado no WhatsApp, projetado para proporcionar uma experiência de comunicação instantânea eficiente. O software utiliza **Socket.io** para comunicação em tempo real e **Supabase** como banco de dados backend.

Atualmente, o projeto apresenta algumas falhas que precisam ser corrigidas para garantir um funcionamento completo e sem interrupções. Enquanto a interface do aplicativo já está estruturada, ajustes são necessários para aprimorar a integração com o **Supabase** e otimizar o código base.

**Funcionalidades:**

- Funcionalidade 1: Descrição da funcionalidade.
- Funcionalidade 2: Descrição da funcionalidade.
- ...

**Tecnologias Utilizadas:**

- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) [TypeScript](https://www.typescriptlang.org/)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white) [Socket.io](https://socket.io/)
- ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) [Supabase](https://supabase.io/)

**Instalação:**

1. Clone o repositório:
   ```bash
   git clone https://github.com/juniorrondini/Convgram-2.0.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd Convgram-2.0
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o aplicativo:
   ```bash
   npm start
   ```

**Correções Futuras (Future Fixes):**
Abaixo estão os principais erros identificados que precisam ser corrigidos para garantir o funcionamento adequado do aplicativo:

1. **Erro de Recursão Infinita no Supabase:**
   - Ocorre na relação `chat_participants`, resultando em falhas ao carregar chats.
   - Código de erro: `42P17`.
   - **Possível Causa:** Configuração incorreta das políticas de linha de segurança (RLS), gerando recursão infinita ao buscar registros.
   - **Solução:** Revisar e ajustar as políticas RLS para evitar loops recursivos ao consultar os dados.

2. **Erro de Autenticação no Supabase:**
   - Mensagem: `Invalid login credentials`.
   - **Possível Causa:** Credenciais inválidas ou tokens de autenticação mal configurados.
   - **Solução:** Verificar a lógica de autenticação e garantir que as credenciais sejam validadas corretamente pelo Supabase.

3. **Erro de Requisição Cross-Origin (CORS):**
   - Bloqueios de requisição para `http://localhost:3001/socket.io`.
   - **Possível Causa:** Configuração incorreta dos cabeçalhos de CORS no backend, impedindo requisições de origens diferentes.
   - **Solução:** Habilitar CORS no backend e garantir permissões adequadas para requisições externas.

4. **Erro no Service Worker:**
   - `FetchEvent.respondWith()` retornando erro.
   - **Possível Causa:** Service Worker efetuando chamadas `fetch()` inválidas.
   - **Solução:** Revisar a configuração do Service Worker e corrigir as chamadas de rede.

5. **Falha na Conexão com Socket.io:**
   - Problemas ao carregar `socket.io` no ambiente local.
   - **Possível Causa:** Configuração incorreta do servidor WebSocket ou falhas na conexão entre cliente e servidor.
   - **Solução:** Garantir que o servidor WebSocket está configurado corretamente e que os eventos de conexão estão sendo disparados corretamente.

Agradecemos a todos que contribuírem para a melhoria deste projeto! 🚀

**Contribuição:**
Sinta-se à vontade para contribuir com o projeto. Para isso:

1. Faça um fork do repositório.
2. Crie uma nova branch:
   ```bash
   git checkout -b minha-nova-funcionalidade
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m 'Adiciona nova funcionalidade'
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-nova-funcionalidade
   ```
5. Abra um Pull Request.

**Licença:**
Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).

**Contato:**
Para dúvidas ou sugestões, entre em contato através do e-mail: [jjrondinijj@gmail.com](mailto:jjrondinijj@gmail.com).

