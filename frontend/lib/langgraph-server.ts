import { Client } from '@langchain/langgraph-sdk';
import { LangGraphBase } from './langgraph-base';

// Server client singleton instance
let clientInstance: LangGraphBase | null = null;

/**
 * Creates or returns a singleton instance of the LangGraph client for server-side use
 * @returns LangGraph Client instance
 */
export const createServerClient = () => {
  if (clientInstance) {
    return clientInstance;
  }

  const apiUrl = process.env.NEXT_PUBLIC_LANGGRAPH_API_URL || 'http://localhost:2024';
  const apiKey = process.env.LANGCHAIN_API_KEY || 'demo-key';

  try {
    const client = new Client({
      apiUrl,
      defaultHeaders: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
      },
    });

    clientInstance = new LangGraphBase(client);
    return clientInstance;
  } catch (error) {
    console.error('Failed to initialize LangGraph client:', error);
    return null;
  }
};

// Export all methods from the base class instance
export const langGraphServerClient = createServerClient();
