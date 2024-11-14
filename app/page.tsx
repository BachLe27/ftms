"use client"
import { motion } from 'framer-motion'
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  redirect('/authen/view-profile');
}
