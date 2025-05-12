import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const graphqlEndpoint = process.env.API_URL!;
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.AUTHORIZATION_TOKEN}`,
};

export async function graphqlRequest<T>(
  query: string,
  variables: Record<string, unknown>
): Promise<T> {
  const response = await axios.post(
    graphqlEndpoint,
    { query, variables },
    { headers }
  );

  if (response.data.errors) {
    throw new Error(JSON.stringify(response.data.errors, null, 2));
  }

  return response.data.data as T;
}