import getConfig from 'next/config'
import { Directus, ItemInput, QueryMany } from '@directus/sdk'
import { Attendee } from 'types/Attendees.types'

const { serverRuntimeConfig } = getConfig()
const { API_EMAIL, API_PW, API_URL } = serverRuntimeConfig

type DirectusSchema = {
  Attendee: Attendee
}

const directus = new Directus<DirectusSchema>(API_URL)

export async function getDirectusClient() {
  // Used email and password auth instead of static token so that we are getting a temporary access token instead.
  if (API_EMAIL && API_PW) {
    await directus.auth.login({ email: API_EMAIL, password: API_PW })
  }

  return directus
}

export const getAttendees = async (
  query?: QueryMany<Attendee> | undefined
) => {
  const client = await getDirectusClient()
  return await client.items('Attendee').readByQuery(query)
}

export const getAttendee = async (
  id: string,
  query?: QueryMany<Attendee> | undefined
) => {
  const client = await getDirectusClient()
  return await client.items('Attendee').readOne(id, query)
}

export const updateAttendee = async (
  id: string,
  attendee: ItemInput<Attendee>
) => {
  const client = await getDirectusClient()
  return await client.items('Attendee').updateOne(id, attendee)
}

export default directus