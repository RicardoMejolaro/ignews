import Stripe from "stripe";
import { version } from "../../package.json";


const stripeSpiKey = String(process.env.STRIPE_API_KEY);

export const stripe = new Stripe(
    stripeSpiKey,
    {
        apiVersion: "2022-11-15",
        appInfo: {
            name: "Ignews",
            version,
        }
    }
)