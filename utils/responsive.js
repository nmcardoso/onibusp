import { useMediaQuery } from 'react-responsive'

// Hooks
export function useMobile() {
  return useMediaQuery({ maxWidth: 768 })
}

export function useTablet() {
  return useMediaQuery({ minWidth: 769, maxWidth: 1023 })
}

export function useDesktop() {
  return useMediaQuery({ minWidth: 1024, maxWidth: 1407 })
}

export function useTabletAndAbove() {
  return useMediaQuery({ minWidth: 769 })
}

export function useDesktopAndAbove() {
  return useMediaQuery({ minWidth: 1024 })
}

export function useFullHdAndAbove() {
  return useMediaQuery({ minWidth: 1408 })
}


// Components
export function Mobile({ children }) {
  const isMobileOnly = useMobile()
  return isMobileOnly ? children : null
}

export function Tablet({ children }) {
  const isTablet = useTablet()
  return isTablet ? children : null
}

export function Desktop({ children }) {
  const isDesktop = useDesktop()
  return isDesktop ? children : null
}

export function TabletAndAbove({ children }) {
  const isTabletAndAbove = useTabletAndAbove()
  return isTabletAndAbove ? children : null
}

export function DesktopAndAbove({ children }) {
  const isDesktopAndAbove = useDesktopAndAbove()
  return isDesktopAndAbove ? children : null
}

export function FullHdAndAbove({ children }) {
  const isFullHdAndAbove = useFullHdAndAbove()
  return isFullHdAndAbove ? children : null
}