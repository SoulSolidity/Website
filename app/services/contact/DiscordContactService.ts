import { ContactFormData, IContactService } from "./IContactService";

/**
 * Discord contact service implementation
 *
 * This service sends contact form submissions to a Discord channel via webhooks
 */
export class DiscordContactService implements IContactService {
  private webhookUrl: string;
  private roleId?: string;

  /**
   * Create a new Discord contact service
   *
   * @param webhookUrl The Discord webhook URL
   * @param roleId Optional Discord role ID to mention in the message
   */
  constructor(webhookUrl: string, roleId?: string) {
    if (!webhookUrl) {
      throw new Error("Discord webhook URL is required");
    }
    this.webhookUrl = webhookUrl;
    this.roleId = roleId;
  }

  /**
   * Send contact form data to Discord
   *
   * @param data The contact form data to send
   * @returns A promise that resolves to true if the message was sent successfully, false otherwise
   */
  async sendContactForm(data: ContactFormData): Promise<boolean> {
    try {
      // Format message with role mention if available
      const roleMention = this.roleId ? `<@&${this.roleId}> ` : "";

      // Create a formatted message for Discord
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `${roleMention}New contact form submission!`,
          embeds: [
            {
              title: "Contact Form Submission",
              color: 0x00ffff, // Cyan color
              fields: [
                { name: "Name", value: data.name, inline: true },
                { name: "Email", value: data.email, inline: true },
                { name: "Message", value: data.message },
              ],
              footer: {
                text: "Soul Solidity Contact Form",
              },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Discord webhook error:", response.status, errorText);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error sending to Discord:", error);
      return false;
    }
  }
}
