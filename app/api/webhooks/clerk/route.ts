import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { verify } from "crypto";
import { log } from "console";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if(!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // get headers
    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // if no headers, error out
    if(!svix_id || !svix_signature || !svix_timestamp) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // get the body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // create a new instance of svix with your secret 
    const wh = new Webhook(WEBHOOK_SECRET)
    let evt : WebhookEvent

    // verify the payload with headers
    try {
        evt = wh.verify(body, {
            "svix-id" : svix_id,
            "svix-timestamp" : svix_timestamp,
            "svix-signature" : svix_timestamp 
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error occured', {
            status : 400
        })
    }

    // get id and type
    const { id } = evt.data
    const eventType = evt.type

    console.log(`Webhook with an id of ${ id } and type of ${ eventType }`);
    console.log(`Webhook body : `, body);

    return new Response('', { status : 200 })
}