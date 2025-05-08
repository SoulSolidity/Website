# ADR-0001: Contact Service Interface and Dependency Injection

## Status

Accepted

## Context

The website includes a contact form that allows users to send messages to the Soul Solidity team. Currently, the form is not connected to any backend service. We need to implement a solution that:

1. Sends contact form submissions to the team via Discord
2. Is flexible enough to support additional notification channels in the future (e.g., email)
3. Keeps sensitive configuration (like webhook URLs) secure
4. Provides a clean separation of concerns

## Decision

We will implement a service interface pattern with dependency injection for the contact form backend:

1. Create an `IContactService` interface that defines the contract for sending contact form data
2. Implement a concrete `DiscordContactService` that sends notifications to Discord via webhooks
3. Use a factory pattern to create the appropriate service implementation
4. Create a Next.js API route that uses the service to process form submissions

This approach allows us to:

- Easily add new notification channels by creating new implementations of the interface
- Keep the API route code clean and focused on request handling
- Test components in isolation by mocking the service interface

## Consequences

### Positive

- Flexibility to add or change notification channels without modifying the core logic
- Clear separation of concerns between the API route and the notification logic
- Improved testability through interface mocking
- Secure handling of sensitive configuration (webhook URLs stored server-side only)

### Negative

- Slightly more complex than a direct implementation
- Additional files and abstractions to maintain
- Potential overhead for a simple use case (though the benefits outweigh this for future extensibility)

## Alternatives Considered

### Direct Implementation in API Route

We could implement the Discord webhook logic directly in the API route without an interface or factory pattern. This would be simpler initially but would make it harder to add new notification channels or test the code in isolation.

### Third-Party Form Service

We could use a third-party service like Formspree or Netlify Forms to handle form submissions. This would require less code but would introduce an external dependency and potentially limit customization options.

## References

- [Dependency Injection Pattern](https://en.wikipedia.org/wiki/Dependency_injection)
- [Discord Webhook API Documentation](https://discord.com/developers/docs/resources/webhook)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
