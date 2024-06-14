"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import useAuthModule from "../auth/lib/auth_service";
import {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Stack,
} from "@chakra-ui/react";
import { FaBars, FaComments } from "react-icons/fa";
import Diskusi from "@/components/diskusi/Diskusi";

// Define a custom theme to extend the default Chakra UI theme
const theme = {
  colors: {
    primary: {
      500: "#2D3748",
    },
  },
};

const Mahasiswa = () => {
  const router = useRouter();
  const { useProfile } = useAuthModule();
  const { data: profile } = useProfile();
  const { data: session } = useSession();
  const [isDiskusiOpen, setIsDiskusiOpen] = useState(false);

  const toggleDiskusi = () => {
    setIsDiskusiOpen(!isDiskusiOpen);
  };

  return (
    <ChakraProvider>
      <Box bg="slate.700" color="white" py={4} px={8} shadow="md">
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="lg">
            E-Learning
          </Heading>
          <div className="flex items-center gap-2">
            Halo {session?.user?.name}
            <Avatar
              onClick={() => router.push("/mahasiswa/profile")}
              className="cursor-pointer"
            >
              <AvatarBadge
                borderColor="papayawhip"
                bg="green.500"
                boxSize="1.25em"
              />
            </Avatar>
          </div>
        </Flex>
      </Box>

      <Box p={8}>
        <Center>
          <Stack spacing={4} textAlign="center">
            <Heading as="h2" size="md">
              Selamat datang di platform E-Learning
            </Heading>
            <Text fontSize="lg">
              Platform ini menyediakan berbagai fitur untuk mendukung proses
              pembelajaran Anda. Silakan gunakan tombol di bawah untuk membuka
              atau menutup sesi diskusi.
            </Text>
            <Text fontSize="md" color="gray.500">
              &quot;E-Learning bukan hanya tentang teknologi, tapi tentang
              memudahkan akses pendidikan bagi semua orang.&quot;
            </Text>
          </Stack>
        </Center>
        {isDiskusiOpen && (
          <Box mt={8}>
            <Diskusi />
          </Box>
        )}
      </Box>

      <IconButton
        icon={isDiskusiOpen ? <Box p={2}></Box> : <FaComments />}
        isRound={true}
        size="lg"
        colorScheme="teal"
        position="fixed"
        bottom="4"
        right="4"
        onClick={toggleDiskusi}
        aria-label="Toggle Diskusi"
      />
    </ChakraProvider>
  );
};

export default Mahasiswa;
