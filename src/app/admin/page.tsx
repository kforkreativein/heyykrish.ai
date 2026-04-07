import type { Metadata } from "next";
import AdminContent from "./AdminContentNew";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "HeyyKrish.AI Admin Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminContent />;
}
