import React, { ReactNode } from "react"
import { SWRConfig } from "swr"

import { useSystem } from "../hooks/system"

type Props = { children: ReactNode };

export const SWRProvider: React.FC<Props> = ({ children }) => {
  const { backend } = useSystem()

  return (
    <SWRConfig
      value={{
        fetcher: (resource) => {
          return backend.get(resource)
        },
        revalidateOnMount: true,
      }}
    >
      {children}
    </SWRConfig>
  )
}
