import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vault | Broker",
};

export default async function VaultPage() {
  return (
    <main className="flex max-h-screen grow flex-col overflow-hidden">
      <div className="flex items-start justify-between border-b p-4">
        <div className="flex flex-col gap-2">
          <h1 className=" text-lg font-semibold md:text-2xl">Vault</h1>
        </div>
      </div>
    </main>
  );
}
