/**
 * Interface for contact form data
 */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Interface for contact services
 *
 * This interface defines the contract for sending contact form data
 * to various notification channels (Discord, email, etc.)
 */
export interface IContactService {
  /**
   * Send contact form data to the notification channel
   *
   * @param data The contact form data to send
   * @returns A promise that resolves to true if the message was sent successfully, false otherwise
   */
  sendContactForm(data: ContactFormData): Promise<boolean>;
}
