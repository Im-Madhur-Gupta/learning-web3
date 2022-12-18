import { useEffect, useState } from "react";

import Head from 'next/head'
import { Inter } from '@next/font/google'
import NextLink from 'next/link'

import useFactoryStore from "../store/useFactoryStore"
import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import CampaignCard from "../components/CampaignCard";

import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const factoryContract = useFactoryStore(state => state.factoryContract);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (factoryContract !== null) {
      const main = async () => {
        setCampaigns(await factoryContract.getDeployedCampaigns());
      }
      main();
    }
  }, [factoryContract]);
  return (
    <>
      <Head>
        <title>KickStart</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Flex direction="column">
          <Heading>Open Campaigns</Heading>
          {campaigns.map(campaignAddress =>
            <CampaignCard key={campaignAddress} address={campaignAddress} />)}
        </Flex>
        <Text fontSize={20} backgroundColor="red.100" width="fit-content" borderRadius={10} padding="10px 30px" marginTop={20}>
          <Link as={NextLink} href="/campaigns/new" _hover={{ textDecoration: "none" }}>Create Campaign</Link>
        </Text>
      </main>
    </>
  )
}
