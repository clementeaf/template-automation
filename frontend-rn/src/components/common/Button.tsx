import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  // Determinar estilos basados en el tipo
  const getBackgroundColor = () => {
    if (disabled) return '#cccccc';
    
    switch (type) {
      case 'primary':
        return '#2196F3';
      case 'secondary':
        return '#FF9800';
      case 'outline':
        return 'transparent';
      default:
        return '#2196F3';
    }
  };

  const getBorderColor = () => {
    if (disabled) return '#cccccc';
    
    switch (type) {
      case 'outline':
        return '#2196F3';
      default:
        return 'transparent';
    }
  };

  const getTextColor = () => {
    if (disabled) return '#666666';
    
    switch (type) {
      case 'outline':
        return '#2196F3';
      default:
        return '#FFFFFF';
    }
  };

  // Determinar dimensiones basadas en el tamaño
  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 6, paddingHorizontal: 12 };
      case 'medium':
        return { paddingVertical: 10, paddingHorizontal: 20 };
      case 'large':
        return { paddingVertical: 14, paddingHorizontal: 28 };
      default:
        return { paddingVertical: 10, paddingHorizontal: 20 };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'medium':
        return 16;
      case 'large':
        return 18;
      default:
        return 16;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          ...getPadding(),
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: getFontSize(),
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Button; 