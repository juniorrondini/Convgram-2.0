# Convgram 2.0

**Description:**
Convgram 2.0 is a messaging application inspired by WhatsApp, designed to provide an efficient instant communication experience. The software uses **Socket.io** for real-time communication and **Supabase** as the backend database.

Currently, the project has some issues that need to be fixed to ensure complete and uninterrupted functionality. While the application interface is already structured, adjustments are needed to improve integration with **Supabase** and optimize the codebase.

**Features:**

Convgram 2.0 aims to integrate the best features of existing social networks, making the communication experience more interactive, fun, and practical. The planned features include:

- **Real-time messaging:** Instant communication via **Socket.io**. *(Currently functional but has WebSocket connection issues on localhost.)*
- **Message customization:** Ability to send **Tenor** GIFs, similar to **Discord**. *(Not yet implemented.)*
- **Screen shake effect:** Similar to the old **MSN**, to grab user attention. *(Not yet implemented.)*
- **Status updates:** Feature inspired by **Instagram** and **TikTok**, allowing users to share temporary images and videos. *(Not yet implemented.)*
- **Security:** Implementation of **end-to-end encryption** to protect user messages and data. *(Not yet implemented.)*
- **Cross-platform application:** Future development for **iOS and Android**, making Convgram accessible on any device. *(Not yet implemented.)*

**Technologies Used:**

- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) 
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) 
- ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) 
- ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) 
- ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white) 
- ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

**Installation:**

1. Clone the repository:
   ```bash
   git clone https://github.com/juniorrondini/Convgram-2.0.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Convgram-2.0
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm start
   ```

**Future Fixes:**
Below are the main identified errors that need to be fixed to ensure proper application functionality:

1. **Infinite Recursion Error in Supabase:**
   - Occurs in the `chat_participants` relation, causing chat loading failures.
   - Error code: `42P17`.
   - **Possible Cause:** Incorrect configuration of Row-Level Security (RLS) policies, generating infinite recursion when fetching records.
   - **Solution:** Review and adjust RLS policies to prevent recursive loops when querying data.

2. **Authentication Error in Supabase:**
   - Message: `Invalid login credentials`.
   - **Possible Cause:** Invalid credentials or misconfigured authentication tokens.
   - **Solution:** Verify authentication logic and ensure credentials are correctly validated by Supabase.

3. **Cross-Origin Request (CORS) Error:**
   - Requests blocked for `http://localhost:3001/socket.io`.
   - **Possible Cause:** Incorrect backend CORS headers configuration, preventing requests from different origins.
   - **Solution:** Enable CORS on the backend and ensure appropriate permissions for external requests.

4. **Service Worker Error:**
   - `FetchEvent.respondWith()` returning an error.
   - **Possible Cause:** Service Worker making invalid `fetch()` calls.
   - **Solution:** Review Service Worker configuration and fix network calls.

5. **Socket.io Connection Failure:**
   - Issues loading `socket.io` in the local environment.
   - **Possible Cause:** Incorrect WebSocket server configuration or client-server connection failures.
   - **Solution:** Ensure WebSocket server is properly configured and that connection events are being triggered correctly.

**Supabase Repository Access:**
Due to limitations of the free Supabase version, the database cannot be linked directly to GitHub. If you need database access for debugging and improvement suggestions, request inclusion in the Supabase repository.

**Future Features:**
- Screen shake effect, similar to MSN Messenger.
- Integration with **Tenor GIFs**.
- Implementation of a **real-time translation API** for conversations.
- Integration with **AI** for image generation, audio transcription, and other advanced features.
- End-to-end encryption to ensure user security and privacy.
- **iOS and Android application** to enhance accessibility.
- **Instagram and TikTok-style status updates** for sharing temporary content.

We appreciate all contributions to improve this project! 🚀

**Contributing:**
Feel free to contribute to the project. To do so:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b my-new-feature
   ```
3. Make your changes and commit:
   ```bash
   git commit -m 'Add new feature'
   ```
4. Push to the remote repository:
   ```bash
   git push origin my-new-feature
   ```
5. Open a Pull Request.

**License:**
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

**Contact:**
For questions or suggestions, contact us at: [jjrondinijj@gmail.com](mailto:jjrondinijj@gmail.com).

