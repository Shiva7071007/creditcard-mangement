import { Buffer } from 'buffer'; // Import Buffer for Node.js

// Convert a string to base64
export const stringToBase64 = (input: string) => Buffer.from(input, 'utf-8').toString('base64');

// Convert base64 to a string
export const base64ToString = (input: string) => Buffer.from(input, 'base64').toString('utf-8');
