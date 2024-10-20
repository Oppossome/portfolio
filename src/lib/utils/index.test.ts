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
