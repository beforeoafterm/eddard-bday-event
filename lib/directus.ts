import getConfig from 'next/config'
import { Directus, QueryMany } from '@directus/sdk'

const { serverRuntimeConfig } = getConfig()
const { API_EMAIL, API_PW, API_URL } = serverRuntimeConfig

const directus = new Directus(API_URL)

export async function getDirectusClient() {
  // Used email and password auth instead of static token so that we are getting a temporary access token instead.
  if (API_EMAIL && API_PW) {
    await directus.auth.login({ email: API_EMAIL, password: API_PW })
  }

  return directus
}

export const getAttendees = async (
  query?: QueryMany<unknown> | undefined
) => {
  const client = await getDirectusClient()
  return await client.items('Attendee').readByQuery(query)
}

export const getAttendee = async (
  id: string,
  query?: QueryMany<unknown> | undefined
) => {
  const client = await getDirectusClient()
  return await client.items('Attendee').readOne(id, query)
}

export default directus