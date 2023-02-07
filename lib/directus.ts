import getConfig from "next/config";
import { Directus } from "@directus/sdk";

const { serverRuntimeConfig } = getConfig();
const { API_EMAIL, API_PW, API_URL } = serverRuntimeConfig;

const directus = new Directus(API_URL);

export async function getDirectusClient() {
  if (API_EMAIL && API_PW) {
    await directus.auth.login({ email: API_EMAIL, password: API_PW });
  }

  return directus;
}

export const getAttendees = async () => {
  const client = await getDirectusClient()
  return await client.items("attendees").readByQuery()
}

export default directus;