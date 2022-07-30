import { extendType, nonNull, objectType, stringArg, intArg } from "nexus";

export const User = objectType({
    name: "Categories",
    definition(t) {
        t.nonNull.int("id")
        t.nonNull.string('name')
    }})