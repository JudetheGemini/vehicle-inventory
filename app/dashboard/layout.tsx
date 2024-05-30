"use client";
import "@mantine/core/styles.css";
import { AppShell, Burger, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.svg";
import { withAuthenticator } from "@aws-amplify/ui-react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header className="flex flex-row justify-between items-center px-12">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Link href="/">
            {" "}
            <Image src={logo} alt="logo" />
          </Link>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <Button variant="filled" fullWidth>
            Logout
          </Button>
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default withAuthenticator(DashboardLayout);
