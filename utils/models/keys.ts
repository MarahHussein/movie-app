

import type {
	Account,
	User,
} from "./interfaces";

export const accountKeys: (keyof Account)[] = [
	"$createdAt",
	"$id",
	"email",
	"emailVerification",
	"name",
	"phone",
	"phoneVerification",
	"status",
];

export const userKeys: (keyof User)[] = [
	"$id",
	"email",
	"name",
	"avatar",
	"$createdAt",
];