#!/bin/bash

# Script simple para crear un repositorio template-automation en GitHub
# utilizando el token almacenado en archivo .env

# Verificar que existe el archivo .env
if [ ! -f .env ]; then
  echo "Error: No se encuentra el archivo .env"
  echo "Cree un archivo .env con el contenido: GITHUB_TOKEN=su_token_github"
  exit 1
fi

# Cargar el token desde .env
GITHUB_TOKEN=$(grep GITHUB_TOKEN .env | cut -d '=' -f2)

# Verificar que el token existe
if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: No se encontró GITHUB_TOKEN en el archivo .env"
  echo "Asegúrese de que el archivo .env contiene: GITHUB_TOKEN=su_token_github"
  exit 1
fi

# Verificar dependencias necesarias
if ! command -v curl >/dev/null 2>&1; then
  echo "Error: Se requiere curl. Por favor, instálelo e intente nuevamente."
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "Error: Se requiere git. Por favor, instálelo e intente nuevamente."
  exit 1
fi

# Nombre y descripción fijos
REPO_NAME="template-automation"
DESCRIPTION="Sistema de templates para inicialización automática de proyectos"

echo "Creando el repositorio $REPO_NAME..."
response=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{\"name\": \"$REPO_NAME\", \"description\": \"$DESCRIPTION\", \"private\": false, \"auto_init\": true}")

# Verificar si la creación fue exitosa
if echo "$response" | grep -q "html_url"; then
  echo "Repositorio creado exitosamente!"
  repo_url=$(echo "$response" | grep -o "\"html_url\": \"[^\"]*\"" | head -1 | cut -d"\"" -f4)
  echo "URL del repositorio: $repo_url"
  
  echo "¿Deseas clonar el repositorio? (s/n)"
  read -r clonar
  if [[ "$clonar" == "s" || "$clonar" == "S" ]]; then
    git_url=$(echo "$response" | grep -o "\"clone_url\": \"[^\"]*\"" | head -1 | cut -d"\"" -f4)
    echo "Clonando repositorio..."
    git clone "$git_url"
    if [ $? -eq 0 ]; then
      echo "Repositorio clonado exitosamente."
      echo "Puedes comenzar a trabajar en él con: cd $REPO_NAME"
    else
      echo "Error al clonar el repositorio."
    fi
  fi
else
  echo "Error al crear el repositorio:"
  echo "$response"
fi 