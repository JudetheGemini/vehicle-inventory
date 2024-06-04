"use client";
import "@mantine/core/styles.css";
import {
  AppShell,
  Burger,
  Button,
  TextInput,
  Flex,
  NavLink,
  Menu,
  Divider,
  Badge,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../public/logo.svg";
import { withAuthenticator, useAuthenticator } from "@aws-amplify/ui-react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter(); // for client-side navigation
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

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
        transitionDuration={500}
        transitionTimingFunction="ease"
      >
        <AppShell.Header className="content-around p-4">
          <div className="max-w-screen-xl mx-auto  flex flex-row justify-between items-center">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
            <Flex gap="10">
              <Badge color="teal" radius="xs">
                {user?.username}
              </Badge>
            </Flex>
          </div>
        </AppShell.Header>

        <AppShell.Navbar
          className="flex gap-10 md:justify-between md:items-center"
          pb="lg"
          pt="lg"
          p="sm"
        >
          <Flex
            mt={20}
            gap={8}
            align="flex-start"
            direction="column"
            className="w-full"
          >
            {/* <Button
              component={Link}
              onClick={toggle}
              href="/dashboard"
              variant="transparent"
              c="dark"
            >
              Dashboard
            </Button> */}
            <NavLink href="/dashboard" fw={500} label="Dashboard"></NavLink>
            <NavLink
              href="#"
              fw={500}
              label="Vehicle Management"
              childrenOffset={28}
            >
              <NavLink
                href="/dashboard/vehicle"
                label="Manage Vehicles"
              ></NavLink>
              <NavLink
                href="/dashboard/inventory"
                label="View Inventory"
              ></NavLink>
            </NavLink>
            <NavLink
              href="/dashboard/user"
              fw={500}
              label="User Management"
            ></NavLink>
            <NavLink
              onClick={toggle}
              href="#"
              fw={500}
              label="Reports"
            ></NavLink>
          </Flex>
          <Divider />
          <Flex
            mb={20}
            gap={10}
            align="flex-start"
            direction="column"
            className="w-full"
          >
            <NavLink
              href="/dashboard/settings"
              fw={500}
              label="Settings"
            ></NavLink>
            <NavLink
              href="/dashboard/support"
              fw={500}
              label="Help & Support"
            ></NavLink>
            <NavLink onClick={handleLogout} fw={500} label="Logout"></NavLink>
          </Flex>
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default withAuthenticator(DashboardLayout);
