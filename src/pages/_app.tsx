import { UnifiedWalletButton, UnifiedWalletProvider } from '@jup-ag/wallet-adapter';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';



import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

import AppHeader from 'src/components/AppHeader/AppHeader';
import Footer from 'src/components/Footer/Footer';

import { SolflareWalletAdapter, UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import CodeBlocks from 'src/components/CodeBlocks/CodeBlocks';
import FormConfigurator from 'src/components/FormConfigurator';
import { IFormConfigurator, INITIAL_FORM_CONFIG, JUPITER_DEFAULT_RPC } from 'src/constants';
import IntegratedTerminal from 'src/content/IntegratedTerminal';
import ModalTerminal from 'src/content/ModalTerminal';
import WidgetTerminal from 'src/content/WidgetTerminal';
import { IInit } from 'src/types';
import V2SexyChameleonText from 'src/components/SexyChameleonText/V2SexyChameleonText';
import V2FeatureButton from 'src/components/V2FeatureButton';

const isDevNodeENV = process.env.NODE_ENV === 'development';
const isDeveloping = isDevNodeENV && typeof window !== 'undefined';
// In NextJS preview env settings
const isPreview = Boolean(process.env.NEXT_PUBLIC_IS_NEXT_PREVIEW);
if ((isDeveloping || isPreview) && typeof window !== 'undefined') {
  // Initialize an empty value, simulate webpack IIFE when imported
  (window as any).Jupiter = {};

  // Perform local fetch on development, and next preview
  Promise.all([import('../library'), import('../index')]).then((res) => {
    const [libraryProps, rendererProps] = res;

    (window as any).Jupiter = libraryProps;
    (window as any).JupiterRenderer = rendererProps;
  });
}

export default function App({ Component, pageProps }: AppProps) {
  const [tab, setTab] = useState<IInit['displayMode']>('integrated');

  // Cleanup on tab change
  useEffect(() => {
    if (window.Jupiter._instance) {
      window.Jupiter._instance = null;
    }
  }, [tab]);

  const rpcUrl = useMemo(() => JUPITER_DEFAULT_RPC, []);

  const { watch, reset, setValue, formState } = useForm<IFormConfigurator>({
    defaultValues: INITIAL_FORM_CONFIG,
  });

  const watchAllFields = watch();

  // Solflare wallet adapter comes with Metamask Snaps supports
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter(), new SolflareWalletAdapter()], []);

  const ShouldWrapWalletProvider = useMemo(() => {
    return watchAllFields.simulateWalletPassthrough
      ? ({ children }: { children: ReactNode }) => (
          <UnifiedWalletProvider
            wallets={wallets}
            config={{
              env: 'mainnet-beta',
              autoConnect: true,
              metadata: {
                name: 'retardex',
                description: '',
                url: 'https://retardio.xyz/',
                iconUrls: [''],
              },
              theme: 'jupiter',
            }}
          >
            {children}
          </UnifiedWalletProvider>
        )
      : React.Fragment;
  }, [watchAllFields.simulateWalletPassthrough]);

  return (
    <>
      <DefaultSeo
        title={'retardex'}
        openGraph={{
          type: 'website',
          locale: 'en',
          title: 'retardex',
          description: 'sex on the solana block chain',
          url: 'https://retardio.xyz/',
          site_name: 'retardex',
          images: [
            {
              url: `https://retardio.xyz/`,
              alt: 'retardex',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: 'retardex',
          handle: '@retardiosolana',
        }}
      />

<div className="h-screen w-screen max-w-screen overflow-x-hidden flex flex-col justify-between">
  <div className="relative h-full w-full">
    {/* Adjust layout and objectFit as needed */}
    <Image src="/Group 962.png" layout="fill" objectFit="cover" alt="Background" />
    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat flex flex-col justify-between">
      <div>
          <AppHeader />

          <div className="">
            <div className="flex flex-col items-center h-full w-full mt-4 md:mt-14">
              <div className="flex flex-col justify-center items-center text-center">
                <div className="flex space-x-2">
                  <V2SexyChameleonText className="text-4xl md:text-[52px] font-semibold px-4 pb-2 md:px-0">
                    retardex
                  </V2SexyChameleonText>

                  <div className="px-1 py-0.5 bg-[#4DCE67] rounded-md ml-2.5 font-semibold flex text-xs self-start">
                    v0
                  </div>
                </div>
                <p className="text-[#9D9DA6] max-w-[100%] md:max-w-[60%] text-md mb-6 heading-[24px]">
                Retardio did 9/11
                </p>
              </div>

              {/* <V2FeatureButton /> */}
            </div>

            <div className="flex justify-center">
              <div className="max-w-6xl rounded-xl flex flex-col md:flex-row w-full md:p-4 relative">
                {/* Desktop configurator */}

                <ShouldWrapWalletProvider>
                <div className="mt-2 md:mt-0 md:ml-4 h-full w-full rounded-xl flex flex-col">
                  {watchAllFields.simulateWalletPassthrough && (
                    <div className="absolute right-6 top-8 text-white flex flex-col justify-center text-center">
                      <UnifiedWalletButton />
                    </div>
                  )}
                  {/* Your IntegratedTerminal component */}
                  <div className="flex flex-grow items-center justify-center text-white/75">
                    <IntegratedTerminal
                      rpcUrl={rpcUrl}
                      formProps={{
                        initialAmount: "10",
                        fixedAmount: false,
                        initialInputMint: "So11111111111111111111111111111111111111112",
                        fixedInputMint: false,
                        initialOutputMint: "6ogzHhzdrQr9Pgv6hZ2MNze7UrzBMAFyBBWUYp1Fhitx",
                        fixedOutputMint: true
                      }}                      simulateWalletPassthrough={watchAllFields.simulateWalletPassthrough}
                      strictTokenList={false}
                      defaultExplorer={watchAllFields.defaultExplorer}
                    />
                  </div>
                </div>
              </ShouldWrapWalletProvider>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    </>
  )};