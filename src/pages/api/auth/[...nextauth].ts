import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { query as q } from 'faunadb';

import { fauna } from "../../../services/faunadb";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        // ...add more providers here
    ],
    jwt: {
        signingKey: process.env.NEXTAUTH_SECRET as string,
    },
    callbacks: {
        async signIn(data: any) {
            const { email } = data.user;

            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index("user_by_email"),
                                    q.Casefold(email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection("users"),
                            { data: { email } }
                        ),
                        q.Get(
                            q.Match(
                                q.Index("user_by_email"),
                                q.Casefold(email)
                            )
                        )
                    ),
                )
                return true;

            } catch (error) {
                return false;
            }

        }
    }
}
export default NextAuth(authOptions as any);