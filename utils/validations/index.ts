import * as yup from "yup";

export const loginSchema = toTypedSchema(
	yup.object({
		email: yup
			.string()
			.required("Email is required")
			.email("Invalid email")
			.transform((value) => value.trim()),
		password: yup
			.string()
			.required("Password is required")
			.transform((value) => value.trim()),
	})
);

export const registerSchema = toTypedSchema(
	yup.object({
		name: yup
			.string()
			.required("Username is required")
			.transform((value) => value.trim()),
		email: yup
			.string()
			.required("Email is required")
			.email("Invalid email")
			.transform((value) => value.trim()),
		password: yup
			.string()
			.required("Password is required")
			.min(8, "Password must be at least 8 characters"),
		confirmPassword: yup
			.string()
			.required("Confirm Password is required")
			.oneOf([yup.ref("password")], "Passwords must match"),
	})
);
