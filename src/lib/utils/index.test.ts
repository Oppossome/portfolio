import { clamp, defineContextPair } from "./index"

// MARK: Mocks

const mocks = vi.hoisted(() => ({
	context: {
		getContext: vi.fn<typeof import("svelte").getContext>(),
		setContext: vi.fn<typeof import("svelte").setContext>(),
		hasContext: vi.fn<typeof import("svelte").hasContext>(),
	},
}))

vi.mock("svelte", async (importOriginal) => ({
	...(await importOriginal<typeof import("svelte")>()),
	...mocks.context,
}))

// MARK: clamp

describe("clamp", () => {
	test("It should clamp a value", () => {
		expect(clamp(5, 0, 10)).toBe(5)
		expect(clamp(-5, 0, 10)).toBe(0)
		expect(clamp(15, 0, 10)).toBe(10)
	})
})

// MARK: defineContextPair

describe("defineContextPair", () => {
	test("It should set and get a context value", () => {
		const contextPair = defineContextPair<number>("myKey")

		// Set the context value
		contextPair.set(42)
		expect(mocks.context.setContext).toHaveBeenCalledWith("myKey", 42)

		mocks.context.hasContext.mockReturnValue(true)
		mocks.context.getContext.mockReturnValue(42)

		// Get the context value
		expect(contextPair.get()).toBe(42)
	})

	test("Set should throw an error if the key exists", () => {
		const contextPair = defineContextPair<number>("myKey")

		mocks.context.hasContext.mockReturnValue(true)
		expect(() => contextPair.set(42)).toThrowError("Context key myKey already exists")

		// force = true
		contextPair.set(42, true)
		expect(mocks.context.setContext).toHaveBeenCalledWith("myKey", 42)
	})

	test("Get should throw an error if the key doesn't exist", () => {
		const contextPair = defineContextPair<number>("myKey")

		mocks.context.hasContext.mockReturnValue(false)
		expect(() => contextPair.get()).toThrowError("Context key myKey does not exist")

		// allowUndefined = true
		expect(contextPair.get(true)).toBeUndefined()
	})
})

describe("getAppConfig", () => {
	let appConfig: typeof import("$env/static/public") | Record<string, never>

	beforeEach(() => {
		appConfig = {}
		vi.resetModules()
		vi.doMock("$env/static/public", () => appConfig)
	})

	afterEach(() => {
		vi.doUnmock("$env/static/public")
	})

	test("It should throw an error if the config isn't satisfied", async () => {
		const { getAppConfig } = await import("./index")
		expect(() => getAppConfig()).toThrowError()
	})

	test("ok - John Doe", async () => {
		appConfig = {
			PUBLIC_NAME: "John Doe",
			PUBLIC_PRONOUNS: "He/Him",
			PUBLIC_LINKEDIN: "JohnDoe",
		}

		const { getAppConfig } = await import("./index")
		expect(getAppConfig()).toEqual({
			name: "John Doe",
			pronouns: { they: "he", them: "him" },
			linkedin: "JohnDoe",
		})
	})

	test("ok - Jay Doe", async () => {
		appConfig = {
			PUBLIC_NAME: "Jay Doe",
			PUBLIC_PRONOUNS: "They/Them",
			PUBLIC_LINKEDIN: "",
		}

		const { getAppConfig } = await import("./index")
		expect(getAppConfig()).toEqual({
			name: "Jay Doe",
			pronouns: { they: "they", them: "them" },
			linkedin: undefined,
		})
	})

	test("ok - Jane Doe", async () => {
		appConfig = {
			PUBLIC_NAME: "Jane Doe",
			PUBLIC_PRONOUNS: "She/Her",
			PUBLIC_LINKEDIN: "",
		}

		const { getAppConfig } = await import("./index")
		expect(getAppConfig()).toEqual({
			name: "Jane Doe",
			pronouns: { they: "she", them: "her" },
			linkedin: undefined,
		})
	})
})
