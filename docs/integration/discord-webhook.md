# Discord Webhook Integration Guide

This guide provides step-by-step instructions for setting up a Discord webhook to receive contact form submissions from the Soul Solidity website.

## Prerequisites

- Discord account
- Administrative access to a Discord server (or the ability to create one)

## Setting Up a Discord Server (if needed)

If you don't already have a Discord server:

1. Open Discord and log in to your account
2. Click the "+" icon on the left sidebar
3. Select "Create My Own"
4. Enter a name for your server and click "Create"

## Creating a Webhook in Discord

1. Open Discord and navigate to the server where you want to receive notifications
2. Select the text channel where you want the contact form submissions to appear
3. Right-click on the channel and select "Edit Channel"
4. Click on "Integrations" in the left sidebar
5. Click on "Webhooks"
6. Click the "New Webhook" button
7. Configure the webhook:
   - Set a name (e.g., "Soul Solidity Contact Form")
   - Optionally, upload an avatar image
   - Make note of which channel it will post to
8. Click "Save Changes"
9. Click "Copy Webhook URL" to copy the webhook URL to your clipboard

## Required Permissions

To create a webhook, you need the "Manage Webhooks" permission in the Discord server. This permission is typically available to server administrators and moderators.

## Setting Up Role Mentions (Optional)

If you want the webhook to mention a specific role when a new contact form submission is received:

1. Go to your Discord server settings
2. Click on "Roles" in the left sidebar
3. Create a new role or select an existing one (e.g., "Contact Notifications")
4. Assign this role to the team members who should be notified
5. Make sure the role is mentionable by webhooks:
   - In the role settings, enable "Allow anyone to @mention this role"
6. Copy the role ID:
   - Enable Developer Mode in Discord (User Settings > Advanced > Developer Mode)
   - Right-click on the role in the server settings and select "Copy ID"

## Configuring the Website

After obtaining the webhook URL and (optionally) the role ID, you need to add them to the website's environment variables:

1. Create or edit the `.env.local` file in the root of the project
2. Add the following variables:

   ```
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-url
   DISCORD_NOTIFICATION_ROLE_ID=123456789012345678  # Optional: Role ID to mention
   ```

3. Restart the development server or redeploy the application

## Security Best Practices

### Protecting the Webhook URL

The webhook URL should be treated as a secret:

- Never commit the webhook URL to version control
- Store it in environment variables or a secure secrets manager
- Limit access to the webhook URL to authorized personnel

### Webhook URL Rotation

Consider rotating the webhook URL periodically:

1. Create a new webhook in Discord
2. Update the environment variable with the new URL
3. Delete the old webhook

### Rate Limiting

The contact form implements rate limiting to prevent abuse. If you experience issues with legitimate submissions being blocked, you may need to adjust the rate limiting settings.

## Testing the Webhook

To test if the webhook is working correctly:

1. Fill out and submit the contact form on the website
2. Check the Discord channel to see if the message appears
3. Verify that the message contains all the expected information

## Troubleshooting

### Message Not Appearing in Discord

- Verify that the webhook URL is correct
- Check if the channel still exists
- Ensure the webhook has permission to post in the channel
- Check server-side logs for any errors

### Role Mentions Not Working

- Verify that the role ID is correct
- Ensure the role is mentionable by webhooks
- Check if the role still exists in the server

## Additional Resources

- [Discord Webhook Documentation](https://discord.com/developers/docs/resources/webhook)
- [Discord Developer Portal](https://discord.com/developers/applications)
