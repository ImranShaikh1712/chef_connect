import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    heading: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    body: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  },
  colors: {
    brand: {
      50: '#f5f0ff',
      100: '#e8dafe',
      200: '#d3b7fd',
      300: '#b98bfb',
      400: '#9a59f7',
      500: '#7c3aed',
      600: '#6b2bd3',
      700: '#5823ad',
      800: '#471d8a',
      900: '#351667',
    },
    accent: {
      400: '#f97316',
      500: '#fb923c',
    }
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand'
      }
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          borderWidth: '1px',
          borderColor: 'blackAlpha.200',
          boxShadow: 'lg',
        }
      }
    }
  },
  styles: {
    global: {
      body: {
        bg: 'white',
      }
    }
  }
})

export default theme
