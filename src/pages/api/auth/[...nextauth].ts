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
        async session({ session }: any) {
            try {
                const userActiveSubscription = await fauna.query(
                    q.Get(
                        q.Intersection([
                            q.Match(
                                q.Index('subscription_by_user_ref'),
                                q.Select(
                                    'ref',
                                    q.Get(
                                        q.Match(
                                            q.Index('user_by_email'),
                                            q.Casefold(session.user.email)
                                        )
                                    )
                                )
                            ),
                            q.Match(
                                q.Index('subscription_by_status'),
                                'active'
                            )
                        ])
                    )
                )

                return {
                    ...session,
                    activeSubscription: userActiveSubscription
                }
            } catch (error) {
                return {
                    ...session,
                    activeSubscription: null
                }
            }
        },
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