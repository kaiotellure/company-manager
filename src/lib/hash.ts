// Convert between ArrayBuffer and Base64 for storage
function arrayBufferToBase64(buffer: ArrayBuffer) {
	const bytes = new Uint8Array(buffer);
	return btoa(String.fromCharCode(...bytes));
}

function base64ToArrayBuffer(base64: string) {
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes.buffer;
}

// Hash password using PBKDF2 with salt
export async function hash(password: string) {
	const encoder = new TextEncoder();
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const keyMaterial = await crypto.subtle.importKey(
		"raw",
		encoder.encode(password),
		{ name: "PBKDF2" },
		false,
		["deriveBits"],
	);

	const derivedBits = await crypto.subtle.deriveBits(
		{
			name: "PBKDF2",
			salt: salt,
			iterations: 100000,
			hash: "SHA-256",
		},
		keyMaterial,
		256,
	);

	return {
		salt: arrayBufferToBase64(salt),
		hash: arrayBufferToBase64(derivedBits),
	};
}

// Verify password against stored hash + salt
export async function verify(
	password: string,
	storedSalt: string,
	storedHash: string,
) {
	const encoder = new TextEncoder();
	const salt = base64ToArrayBuffer(storedSalt);
	const keyMaterial = await crypto.subtle.importKey(
		"raw",
		encoder.encode(password),
		{ name: "PBKDF2" },
		false,
		["deriveBits"],
	);

	const derivedBits = await crypto.subtle.deriveBits(
		{
			name: "PBKDF2",
			salt: salt,
			iterations: 100000,
			hash: "SHA-256",
		},
		keyMaterial,
		256,
	);

	const newHash = arrayBufferToBase64(derivedBits);
	return newHash === storedHash;
}
