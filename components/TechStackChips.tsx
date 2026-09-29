'use client';

import { motion } from 'motion/react';
import Badge from '@/components/Badge';
import NextIcon from '@/assets/icons/next-icon';
import SolidIcon from '@/assets/icons/solid-icon';
import ReactIcon from '@/assets/icons/react-icon';
import TailwindIcon from '@/assets/icons/tailwind-icon';
import ExpoIcon from '@/assets/icons/expo-icon';
import TanStackIcon from '@/assets/icons/tanstack-icon';
import TSIcon from '@/assets/icons/ts-icon';
import NodeIcon from '@/assets/icons/node-icon';
import ZodIcon from '@/assets/icons/zod-icon';
import PrismaIcon from '@/assets/icons/prisma-icon';
import SpringBootIcon from '@/assets/icons/spring-boot-icon';
import FastAPIIcon from '@/assets/icons/fastapi-icon';
import PostgreSQLIcon from '@/assets/icons/postgresql-icon';
import MongoIcon from '@/assets/icons/mongo-icon';
import RedisIcon from '@/assets/icons/redis-icon';
import RenderIcon from '@/assets/icons/render-icon';
import DockerIcon from '@/assets/icons/docker-icon';
import GitIcon from '@/assets/icons/git-icon';
import GitHubActionsIcon from '@/assets/icons/github-actions-icon';
import GitLabIcon from '@/assets/icons/gitlab-icon';
import StripeIcon from '@/assets/icons/stripe-icon';
import LangChainIcon from '@/assets/icons/langchain-icon';
import PandasIcon from '@/assets/icons/pandas-icon';
import UnrealIcon from '@/assets/icons/unreal-icon';
import UnityIcon from '@/assets/icons/unity-icon';
import KafkaIcon from '@/assets/icons/kafka-icon';
import FlutterIcon from '@/assets/icons/flutter-icon';
import VercelIcon from '@/assets/icons/vercel-icon';
import NestJSIcon from '@/assets/icons/nestjs-icon';
import ExpressIcon from '@/assets/icons/express-icon';
import DrizzleIcon from '@/assets/icons/drizzle-icon';
import SupabaseIcon from '@/assets/icons/supabase-icon';

export default function TechStackChips() {
  const TECH_CATEGORIES = [
    {
      title: 'Frontend',
      techs: [
        { title: 'Next.js', icon: <NextIcon className="size-4 fill-black dark:fill-white" /> },
        { title: 'Solid.js', icon: <SolidIcon className="size-4 fill-[#2C4F7C]" /> },
        { title: 'React', icon: <ReactIcon className="size-4 fill-[#61DAFB]" /> },
        { title: 'Tailwind CSS', icon: <TailwindIcon className="size-4 fill-[#06B6D4]" /> },
        { title: 'Expo', icon: <ExpoIcon className="size-4 fill-[#1C2024] dark:fill-white" /> },
        { title: 'TanStack', icon: <TanStackIcon className="size-4 fill-black dark:fill-white" /> },
        { title: 'Typescript', icon: <TSIcon className="size-4 fill-[#3178C6]" /> },
        { title: 'Flutter', icon: <FlutterIcon className="size-4 fill-[#02569B]" /> },
      ],
    },
    {
      title: 'Backend',
      techs: [
        { title: 'Node.js', icon: <NodeIcon className="size-4 fill-[#5FA04E]" /> },
        { title: 'Express.js', icon: <ExpressIcon className="size-4 fill-black dark:fill-white" /> },
        { title: 'Nest.js', icon: <NestJSIcon className="size-4 fill-[#E0234E]" /> },
        { title: 'Zod', icon: <ZodIcon className="size-4 fill-[#408AFF]" /> },
        { title: 'Drizzle', icon: <DrizzleIcon className="size-4 fill-[#C5F74F]" /> },
        { title: 'Prisma', icon: <PrismaIcon className="size-4 fill-[#2D3748] dark:fill-white" /> },
        { title: 'Java Spring Boot', icon: <SpringBootIcon className="size-4 fill-[#6DB33F]" /> },
        { title: 'Apache Kafka', icon: <KafkaIcon className="size-4 fill-[#231F20] dark:fill-white" /> },
        { title: 'Python FastAPI', icon: <FastAPIIcon className="size-4 fill-[#009688]" /> },
      ],
    },
    {
      title: 'Database',
      techs: [
        { title: 'PostgreSQL', icon: <PostgreSQLIcon className="size-4 fill-[#4169E1]" /> },
        { title: 'MongoDB', icon: <MongoIcon className="size-4 fill-[#47A248]" /> },
        { title: 'Redis', icon: <RedisIcon className="size-4 fill-[#FF4438]" /> },
        { title: 'Supabase', icon: <SupabaseIcon className="size-4 fill-[#3FCF8E]" /> },
      ],
    },
    {
      title: 'DevOps / Infra',
      techs: [
        { title: 'Render', icon: <RenderIcon className="size-4 fill-black dark:fill-white" /> },
        { title: 'Vercel', icon: <VercelIcon className="size-4 fill-black dark:fill-white" /> },
        { title: 'Docker', icon: <DockerIcon className="size-4 fill-[#2496ED]" /> },
        { title: 'Git', icon: <GitIcon className="size-4 fill-[#F05032]" /> },
        { title: 'GitHub Actions', icon: <GitHubActionsIcon className="size-4 fill-[#2088FF]" /> },
        { title: 'GitLab', icon: <GitLabIcon className="size-4 fill-[#FC6D26]" /> },
      ],
    },
    {
      title: 'Payments',
      techs: [{ title: 'Stripe', icon: <StripeIcon className="size-4 fill-[#635BFF]" /> }],
    },
    {
      title: 'AI / Data',
      techs: [
        { title: 'LangChain', icon: <LangChainIcon className="size-4 fill-[#1C3C3C]" /> },
        { title: 'Pandas', icon: <PandasIcon className="size-4 fill-[#150458] dark:fill-white" /> },
      ],
    },
    {
      title: 'Game Engines',
      techs: [
        { title: 'Unreal', icon: <UnrealIcon className="size-4 fill-[#0E1128] dark:fill-white" /> },
        { title: 'Unity', icon: <UnityIcon className="size-4 fill-black dark:fill-white" /> },
      ],
    },
  ];

  return (
    <div className="pt-4 space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.2, ease: 'easeOut' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4">
        {TECH_CATEGORIES.map((category) => (
          <div
            key={category.title}
            className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
            <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-4">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.techs.map((tech) => (
                <Badge key={tech.title} title={tech.title} icon={tech.icon} fillClassName="bg-indigo-500/20" />
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
