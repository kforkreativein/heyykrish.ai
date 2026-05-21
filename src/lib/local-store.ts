import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";

export type NewsletterSubscriber = {
  id: string;
  email: string;
  name: string | null;
  source: string;
  created_at: string;
};

export type ContactInquiry = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
};

export type DownloadLead = {
  id: string;
  email: string;
  name: string | null;
  source: string;
  resource_id: string;
  created_at: string;
};

type CollectionMap = {
  newsletterSubscribers: NewsletterSubscriber;
  contactInquiries: ContactInquiry;
  downloadLeads: DownloadLead;
};

const FILE_NAMES: Record<keyof CollectionMap, string> = {
  newsletterSubscribers: "newsletter-subscribers.json",
  contactInquiries: "contact-inquiries.json",
  downloadLeads: "download-leads.json",
};

function isReadOnlyProduction() {
  return process.env.VERCEL === "1";
}

function getDataDir() {
  return path.join(process.cwd(), "data", "local");
}

function getFilePath(collection: keyof CollectionMap) {
  return path.join(getDataDir(), FILE_NAMES[collection]);
}

export function getISTTimestamp() {
  const now = new Date();
  const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  return istTime.toISOString();
}

function createId() {
  return `${Date.now()}-${crypto.randomUUID()}`;
}

async function ensureDataDir() {
  await mkdir(getDataDir(), { recursive: true });
}

async function readCollection<K extends keyof CollectionMap>(
  collection: K
): Promise<CollectionMap[K][]> {
  if (isReadOnlyProduction()) {
    return [];
  }

  try {
    const raw = await readFile(getFilePath(collection), "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeCollection<K extends keyof CollectionMap>(
  collection: K,
  rows: CollectionMap[K][]
) {
  if (isReadOnlyProduction()) {
    return;
  }

  await ensureDataDir();
  const filePath = getFilePath(collection);
  const tempPath = `${filePath}.tmp`;
  await writeFile(tempPath, JSON.stringify(rows, null, 2), "utf8");
  await rename(tempPath, filePath);
}

export async function listNewsletterSubscribers() {
  const rows = await readCollection("newsletterSubscribers");
  return rows.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function addNewsletterSubscriber(input: {
  email: string;
  name: string | null;
  source: string;
}) {
  const rows = await readCollection("newsletterSubscribers");
  const email = input.email.toLowerCase();

  if (rows.some((row) => row.email.toLowerCase() === email)) {
    return { duplicate: true as const };
  }

  const subscriber: NewsletterSubscriber = {
    id: createId(),
    email,
    name: input.name,
    source: input.source,
    created_at: getISTTimestamp(),
  };

  await writeCollection("newsletterSubscribers", [subscriber, ...rows]);
  return { duplicate: false as const, subscriber };
}

export async function listContactInquiries() {
  const rows = await readCollection("contactInquiries");
  return rows.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function addContactInquiry(input: {
  name: string;
  email: string;
  company: string | null;
  message: string;
}) {
  const rows = await readCollection("contactInquiries");
  const inquiry: ContactInquiry = {
    id: createId(),
    name: input.name,
    email: input.email.toLowerCase(),
    company: input.company,
    message: input.message,
    created_at: getISTTimestamp(),
  };

  await writeCollection("contactInquiries", [inquiry, ...rows]);
  return inquiry;
}

export async function addDownloadLead(input: {
  email: string;
  name: string | null;
  resourceId: string;
  resourceTitle?: string;
}) {
  const rows = await readCollection("downloadLeads");
  const lead: DownloadLead = {
    id: createId(),
    email: input.email.toLowerCase(),
    name: input.name,
    source: input.resourceTitle || input.resourceId,
    resource_id: input.resourceId,
    created_at: getISTTimestamp(),
  };

  await writeCollection("downloadLeads", [lead, ...rows]);
  return lead;
}

export async function getLocalStats() {
  const [newsletterSubscribers, contactInquiries, downloadLeads] =
    await Promise.all([
      readCollection("newsletterSubscribers"),
      readCollection("contactInquiries"),
      readCollection("downloadLeads"),
    ]);

  return {
    newsletterCount: newsletterSubscribers.length,
    contactCount: contactInquiries.length,
    downloadCount: downloadLeads.length,
  };
}
