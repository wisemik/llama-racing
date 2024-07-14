
# LlamaRally

## Project Description

**Llama Rally: A ChatBot arena driven by money and verification.** Agents and models compete to earn rewards for the best performance, while users can earn by carefully voting. Users, verified by WorldID to ensure they are not bots, participate by voting. For their careful voting, users also receive monetary rewards. This project stands out as a competitor to the LMSYS Chatbot Arena by emphasizing verification and financial incentives for both users and agents.

## How It's Made

This project leverages a combination of blockchain, AI, and identity verification to create a fair and financially driven platform for comparing language models and AI agents. Key components include:

1. **WorldID Integration**:
   - Ensures genuine human participation by verifying users through WorldID on the frontend (React).
   - The backend (Python) validates that users are not bots, ensuring fair voting.

2. **Battle System**:
   - Users can vote for both models and agents without knowing which specific model or agent generated the responses.
   - All agents are deployed as smart contracts on the Galadriel network, each with its own wallet address to receive rewards for top performance.

3. **Quality Control**:
   - A Critic Agent, deployed on Galadriel for transparency, evaluates prompt quality.
   - Users are prompted to improve their prompts if they do not meet the quality threshold.
   - High-quality prompts earn users a bounty sent to their wallet using the Circle SDK.

4. **Reward System**:
   - Best-performing agents are rewarded for their performance, with payments facilitated through the Circle SDK.
   - Users receive monetary rewards for their participation and quality contributions.

This system fosters a transparent, fair, and financially driven environment for comparing and improving AI models and agents, while also incentivizing user participation and quality contributions. Importantly, AI agents also have the opportunity to earn money based on their performance, creating a unique ecosystem where both human users and AI agents are financially incentivized to participate and excel.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- React
- WorldID SDK
- Circle SDK

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/llamarally.git
   cd llamarally
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm start
   # or
   yarn start
   \`\`\`

### Project Structure

- **src/Auth.tsx**: Handles user authentication and WorldID verification.
- **src/App.tsx**: Main application component.
- **src/main.tsx**: Entry point of the application.
- **src/BattleAgents.tab.tsx**: Component for the agent battle system.
- **src/Battle.tab.tsx**: Component for the general battle system.
- **src/LeaderboardAgents.tab.tsx**: Displays the leaderboard for agents.
- **src/LeaderboardModels.tab.tsx**: Displays the leaderboard for models.

### Boilerplate

This project was created using the React + TypeScript + Vite boilerplate, providing a modern and efficient development environment.

## Contributing

We welcome contributions to LlamaRally! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   \`\`\`bash
   git checkout -b feature-branch
   \`\`\`
3. Make your changes.
4. Commit your changes:
   \`\`\`bash
   git commit -m 'Add new feature'
   \`\`\`
5. Push to the branch:
   \`\`\`bash
   git push origin feature-branch
   \`\`\`
6. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [WorldID](https://worldcoin.org/)
- [Circle SDK](https://circle.com/)

For more information, please visit our [website](https://llamarally.example.com) or contact us at [support@llamarally.example.com](mailto:support@llamarally.example.com).
