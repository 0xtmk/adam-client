import { FC, ReactNode } from "react"
import { HelmetProvider } from "react-helmet-async"
import { I18nextProvider } from "react-i18next"
import { SWRConfig } from "swr"

import { isEnabledLocalDevMode } from "@/configs/env.config"
import { TailwindClasses } from "@/configs/generate-tailwind-classes"
import i18next from "@/configs/languages/i18next.config"
import { swrConfig } from "@/configs/swr.config"
import { SolanaProvider } from "@/libs/web3/solana/provider/solana-provider"
import { ScrollToTop } from "@/routes/scroll-to-top"
import { ComingSoonPageWrapper } from "../layouts/coming-soon-page-wrapper"
import { LocalDevMode } from "../local-dev-mode"
import { AntProvider } from "./ant-provider"
import { GlobalHooks } from "./global-hooks"
import { ToastContainer } from "./toast-container"

interface ProviderProps {
  children: ReactNode
}

export const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <AntProvider>
        <SWRConfig value={swrConfig}>
          <SolanaProvider>
            <I18nextProvider i18n={i18next} defaultNS={"translation"}>
              <ToastContainer />
              <GlobalHooks />
              <ScrollToTop />
              <TailwindClasses />

              <ComingSoonPageWrapper>{children}</ComingSoonPageWrapper>

              {isEnabledLocalDevMode && <LocalDevMode />}
            </I18nextProvider>
          </SolanaProvider>
        </SWRConfig>
      </AntProvider>
    </HelmetProvider>
  )
}
