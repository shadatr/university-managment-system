import AdministratorNavbar from "@/components/administratorNavbar";

export default function AdministatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <AdministratorNavbar />
        {children}
        </div>
  );
}
