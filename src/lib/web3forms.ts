import { readFile } from "fs/promises";
import path from "path";

type Web3FormsPayload = {
  subject: string;
  from_name: string;
  email: string;
  message: string;
  [key: string]: string | undefined;
};

async function readWeb3FormsKeyFromRootEnv() {
  try {
    const rootEnvPath = path.join(process.cwd(), "..", ".env");
    const rootEnv = await readFile(rootEnvPath, "utf8");
    const line = rootEnv
      .split("\n")
      .find((entry) => entry.trim().startsWith("WEB3FORMS_ACCESS_KEY="));

    return line?.split("=").slice(1).join("=").trim() || undefined;
  } catch {
    return undefined;
  }
}

async function getWeb3FormsAccessKey() {
  return process.env.WEB3FORMS_ACCESS_KEY || readWeb3FormsKeyFromRootEnv();
}

export async function submitToWeb3Forms(payload: Web3FormsPayload) {
  const accessKey = await getWeb3FormsAccessKey();

  if (!accessKey) {
    throw new Error("WEB3FORMS_ACCESS_KEY is missing.");
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      ...payload,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Web3Forms failed with ${response.status}: ${body}`);
  }

  return { configured: true, sent: true };
}
