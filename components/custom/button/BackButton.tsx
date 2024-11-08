"use client"

import { useRouter } from "next/navigation"
import CustomButton from "./CustomButton";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button type="button" onClick={() => router.back()} variant="outline">Quay lại</Button>
  )
}
