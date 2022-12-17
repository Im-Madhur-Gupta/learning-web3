import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import useFactoryStore from "../store/useFactoryStore"
import getFactoryContract from '../utils/getFactoryContract'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const setFactoryContract = useFactoryStore(state => state.setFactoryContract);
  useEffect(() => {
    const main = async () => {
      const factoryContract = await getFactoryContract();
      console.log("contract address: ", factoryContract.address);
      setFactoryContract(factoryContract);
    }
    main();
  }, []);
  return (<ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>)
}
