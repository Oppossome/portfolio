import posthog from "posthog-js"

import { env } from "$env/dynamic/public"

// Initialize PostHog if the public key is available
if (env.PUBLIC_POSTHOG_KEY) {
	posthog.init(env.PUBLIC_POSTHOG_KEY, {
		api_host: "https://us.i.posthog.com",
		person_profiles: "always",
	})
}
