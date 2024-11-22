import { defineContextPair, matchesAlternating, mergeObjects } from "./utils"

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

// MARK: matchesAlternating

describe("matchesAlternating", () => {
	test.each<{ input: string; search: string; wants: string[] }>([
		{
			input: "Hello, world!",
			search: "o",
			wants: ["Hell", "o", ", w", "o", "rld!"],
		},
		{
			input: "lorem ipsum dolor sit amet",
			search: "Lorem",
			wants: ["", "lorem", " ipsum dolor sit amet"],
		},
		{
			input: "Some text",
			search: "",
			wants: ["Some text"],
		},
	])("Searching $search in $input should return $wants", ({ input, search, wants }) => {
		const result = matchesAlternating(input, search)
		expect(result).toEqual(wants)
	})
})

// MARK: mergeObjects

describe("mergeObjects", () => {
	test("should merge two objects with simple properties", () => {
		const obj1 = { a: 1, b: 2 }
		const obj2 = { b: 3, c: 4 }

		const result = mergeObjects(obj1, obj2)

		expect(result).toEqual({ a: 1, b: 3, c: 4 })
	})

	test("should preserve getters and setters", () => {
		let rawValue = 5
		const obj1 = {
			get value() {
				return rawValue
			},
			set value(newValue) {
				rawValue = newValue
			},
		}

		let rawValue2 = 10
		const obj2 = {
			get value2() {
				return rawValue2
			},
			set value2(newValue) {
				rawValue2 = newValue
			},
		}

		const result = mergeObjects(obj1, obj2)

		expect(result.value).toBe(5)
		expect(result.value2).toBe(10)

		result.value = 15
		expect(result.value).toBe(15)
		expect(rawValue).toBe(15)

		result.value2 = 20
		expect(result.value2).toBe(20)
		expect(rawValue2).toBe(20)
	})
})
