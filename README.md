# Soul Solidity Website

Soul Solidity is a developer lab with a passion for Solidity. We build simple, secure, and robust decentralized systems. Our focus on innovation, transparency, and efficiency delivers trusted solutions for the blockchain ecosystem.

## Technology Stack

- **Frontend**: Next.js 13, React 18, TailwindCSS
- **UI Components**: Radix UI, Framer Motion
- **Styling**: TailwindCSS with custom components
- **State Management**: React hooks and context
- **API**: Next.js API routes

## Features

- Responsive design
- Dark/light mode support
- Product showcase
- Contact form with Discord integration
- Social proof section
- Company statistics

## Setup Instructions

1. **Clone the repository:**

   ```sh
   git clone https://github.com/SoulSolidity/soul-solidity-website.git
   cd soul-solidity-website
   ```

2. **Install dependencies:**

   ```sh
   yarn install
   ```

3. **Create and populate the `.env.local` file:**

   ```sh
   cp .env.local.example .env.local
   ```

   Edit the `.env.local` file and add your credentials.

4. **Run the development server:**

   ```sh
   yarn dev
   ```

5. **Open your browser and navigate to:**

   ```
   http://localhost:3000
   ```

## Environment Variables

### Discord Integration

```
# Discord webhook URL for contact form notifications
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-url

# Optional: Discord role ID to mention in contact form notifications
DISCORD_NOTIFICATION_ROLE_ID=123456789012345678
```

See the [Discord Webhook Integration Guide](./docs/integration/discord-webhook.md) for detailed setup instructions.

## Documentation

- [Architecture Overview](./docs/architecture/overview.md)
- [Architecture Decision Records](./docs/adr/)
- [Integration Guides](./docs/integration/)

## Contact Form Integration

The contact form uses a dependency injection pattern to allow for multiple notification channels. Currently, it supports sending notifications to Discord via webhooks, but it can be extended to support other channels like email.

See the [Contact Service Architecture Diagram](./docs/architecture/diagrams/contact-service.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](./License.md) file for details.
