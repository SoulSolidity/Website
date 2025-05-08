import { IContactService } from "./IContactService";
import { DiscordContactService } from "./DiscordContactService";

/**
 * Factory for creating contact services
 *
 * This factory creates the appropriate implementation of the IContactService
 * interface based on configuration.
 */
export class ContactServiceFactory {
  /**
   * Get the appropriate contact service implementation
   *
   * Currently, this returns a Discord contact service, but in the future
   * it could be extended to support other service types based on configuration.
   *
   * @returns An implementation of the IContactService interface
   */
  static getContactService(): IContactService {
    // Check if Discord webhook URL is configured
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error("DISCORD_WEBHOOK_URL environment variable is not set");
    }

    // Get optional role ID for mentions
    const roleId = process.env.DISCORD_NOTIFICATION_ROLE_ID;

    // Return Discord contact service
    return new DiscordContactService(webhookUrl, roleId);
  }

  /**
   * Get a mock contact service for testing
   *
   * This method is useful for testing components that depend on the contact service
   * without actually sending messages to external services.
   *
   * @returns A mock implementation of the IContactService interface
   */
  static getMockContactService(): IContactService {
    return {
      sendContactForm: async () => {
        console.log("Mock contact service: message sent");
        return true;
      },
    };
  }
}
