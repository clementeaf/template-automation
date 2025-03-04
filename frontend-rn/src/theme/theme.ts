// Definición de colores base
const palette = {
  // Colores primarios
  primary: '#2196F3',
  primaryDark: '#1976D2',
  primaryLight: '#BBDEFB',
  
  // Colores secundarios
  secondary: '#FF9800',
  secondaryDark: '#F57C00',
  secondaryLight: '#FFE0B2',
  
  // Colores de acento
  accent: '#FF4081',
  accentDark: '#F50057',
  accentLight: '#FF80AB',
  
  // Colores de estado
  success: '#4CAF50',
  info: '#2196F3',
  warning: '#FFC107',
  error: '#FF3B30',
  
  // Escala de grises
  white: '#FFFFFF',
  grey50: '#FAFAFA',
  grey100: '#F5F5F5',
  grey200: '#EEEEEE',
  grey300: '#E0E0E0',
  grey400: '#BDBDBD',
  grey500: '#9E9E9E',
  grey600: '#757575',
  grey700: '#616161',
  grey800: '#424242',
  grey900: '#212121',
  black: '#000000',
};

// Tema claro
export const lightTheme = {
  colors: {
    ...palette,
    
    // Colores específicos de la UI
    background: palette.white,
    surface: palette.white,
    text: palette.grey900,
    textSecondary: palette.grey600,
    border: palette.grey300,
    divider: palette.grey200,
    
    // Colores de interacción
    ripple: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
    round: 1000,
  },
  
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: 12,
      s: 14,
      m: 16,
      l: 18,
      xl: 20,
      xxl: 24,
      xxxl: 30,
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
  },
  
  // Sombras para elevación
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
  },
};

// Tema oscuro
export const darkTheme = {
  colors: {
    ...palette,
    
    // Colores específicos de la UI
    background: palette.grey900,
    surface: palette.grey800,
    text: palette.grey50,
    textSecondary: palette.grey400,
    border: palette.grey700,
    divider: palette.grey800,
    
    // Colores de interacción
    ripple: 'rgba(255, 255, 255, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    
    // Algunos colores con ajustes para modo oscuro
    primary: '#90CAF9', // más claro en modo oscuro
    primaryLight: '#2196F3', // invertimos para contraste
  },
  
  // Los demás valores son iguales al tema claro
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  typography: lightTheme.typography,
  shadows: lightTheme.shadows,
};

// Exportación del tema por defecto
export default lightTheme; 