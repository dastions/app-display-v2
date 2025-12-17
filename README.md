# README — Guía de Configuración de Raspberry Pi en Modo Kiosk + Servicios Docker

Este documento describe el procedimiento estándar para configurar una Raspberry Pi como kiosk web, arrancando automáticamente Chromium en modo fullscreen y levantando servicios mediante Docker Compose.

## Incluye:

- Configuración del sistema
- Modo kiosk sin escritorio
- Espera automática de red
- Lanzamiento de Chromium fullscreen
- Instalación y arranque automático de Docker
- Ejecución de servicios vía docker compose up -d
- Estructura de archivos usada

## 1. Requisitos de sistema

Raspberry Pi OS Lite (recomendado) o Desktop.
Conexión a internet para instalación de paquetes.
Usuario principal: pi.

## 2. Configurar arranque en consola + autologin

Ejecutar:

```bash
sudo raspi-config
```

Ir a:

**System Options → Boot / Auto Login → Console Autologin**

Esto permite que el usuario pi inicie la sesión automáticamente en tty1, condición necesaria para lanzar el kiosk.

## 3. Instalar entorno gráfico mínimo y Chromium

```bash
sudo apt update
sudo apt install --no-install-recommends xserver-xorg x11-xserver-utils xinit openbox chromium-browser
```

## 4. Configurar arranque automático de X y modo kiosk

El archivo `~/.bash_profile` debe contener:

```bash
if [[ -z "$DISPLAY" ]] && [[ $(tty) == /dev/tty1 ]]; then
    startx -- -nocursor
fi
```

## 5. Configuración de Openbox + Chromium

### 5.1 Archivo: ~/.xinitrc

```bash
#!/bin/bash

# Evitar apagado y blanking
xset -dpms
xset s off
xset s noblank

# Esperar un poco antes de cargar Openbox
sleep 5

# Cargar sesión de Openbox
exec openbox-session
```

### 5.2 Archivo: /home/pi/.config/openbox/autostart

```
/home/pi/dastions/open-display.sh &
```

> **IMPORTANTE:** La ruta debe apuntar al script real de arranque del kiosk (open-display.sh).

### 5.3 Script kiosk: /home/pi/open-display.sh

```bash
#!/bin/bash
set -euo pipefail

URL="http://localhost:2000"

# En Debian suele ser /usr/bin/chromium
CHROME_BIN="$(command -v chromium || command -v chromium-browser)"

# Perfil dedicado (recomendado). Si quieres que sea 100% inmune a cortes de luz:
# PROFILE_DIR="/run/chromium-kiosk"
# (en ese caso no persiste nada entre reinicios)
PROFILE_DIR="/home/dastions/.config/chromium-kiosk"

# Espera a tener ruta por defecto IPv4 (más robusto que wlan0/eth0)
while ! ip -4 route show default | grep -q . ; do
  echo "Esperando red..."
  sleep 2
done

sleep 5

# 1) Mata cualquier Chromium previo (y procesos hijos tipo crashpad/renderers)
pkill -u "$(id -un)" -f "chromium|chrome" 2>/dev/null || true
sleep 1
pkill -9 -u "$(id -un)" -f "chromium|chrome" 2>/dev/null || true

# 2) Limpia locks + sesión del perfil (típico tras corte de corriente)
mkdir -p "$PROFILE_DIR"
rm -f "$PROFILE_DIR"/Singleton* 2>/dev/null || true

# En Chromium moderno la sesión suele estar en Default/Sessions (Session_* / Tabs_*)
rm -rf "$PROFILE_DIR/Default/Sessions" 2>/dev/null || true

# Por compatibilidad (algunas builds aún usan estos nombres)
rm -f "$PROFILE_DIR"/Default/{Current\ Tabs,Current\ Session,Last\ Tabs,Last\ Session} 2>/dev/null || true

# 3) Arranca kiosk/app con perfil dedicado (evita ventana extra)
exec "$CHROME_BIN" \
  --user-data-dir="$PROFILE_DIR" \
  --kiosk \
  --noerrdialogs \
  --disable-infobars \
  --disable-session-crashed-bubble \
  --disable-popup-blocking \
  --no-first-run \
  --overscroll-history-navigation=0 \
  --app="$URL"
```

Dar permisos:

```bash
chmod +x /home/pi/open-display.sh
```

## 6. Instalar Docker + Docker Compose

### 6.1 Instalar Docker

```bash
curl -fsSL https://get.docker.com | sudo sh
```

Añadir usuario pi al grupo docker:

```bash
sudo usermod -aG docker pi
```

> **Reiniciar sesión o reiniciar la Raspberry:**

```bash
sudo reboot
```

Comprobar:

```bash
docker compose version
```

## 7. Arranque de servicios Docker

Colocar un `docker-compose.yml` en el directorio:

```
/home/pi/docker/
```

Ejemplo:

```yaml
services:
  frontend:
    image: registry.gitlab.com/dastions/portsur-app:latest_armv7
    container_name: frontend
    ports:
      - "5173:5173"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:5173"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  box_2:
    image: armari_iot:latest
    container_name: box2
    restart: always
    ports:
      - target: 3001
        published: 3011
        protocol: tcp
        mode: host
      - target: 3000
        published: 3010
        protocol: tcp
        mode: host
    extra_hosts:
      - host.docker.internal:host-gateway
    env_file:
      - .box2.env
    environment:
      - TCP_PORT=3001
      - HTTP_PORT=3000
```

Levantar servicios:

```bash
cd /home/pi/docker
docker compose up -d
```

## 8. Hacer que los servicios Docker arranquen automáticamente

Docker ya arranca automáticamente al inicio.
Si tus contenedores tienen `restart: always`, se levantarán solos.

Opciones válidas:

Verificar:

```bash
docker ps
```

Forzar reinicio de todos los contenedores:

```bash
docker compose restart
```

## 9. Flujo final de arranque

1. La Raspberry arranca.
2. Autologin en consola (pi, tty1).
3. `.bash_profile` lanza `startx`.
4. X lee `.xinitrc`.
5. Openbox inicia y ejecuta `autostart`.
6. `open-display.sh` espera red y abre Chromium en kiosk.
7. Docker se inicia y levanta los servicios para el frontend/backend.

## 10. Solución de problemas rápida

### Chromium se abre dos veces

Hay más de un launcher (autostart, .xinitrc, .desktop).
→ Dejar solo el de Openbox.

### No detecta IP

Revisar:

```bash
ip a
```

### Docker no arranca contenedores

Revisar:

```bash
docker compose logs
```

### Sin cursor (deseado)

Usamos `startx -- -nocursor`.

## 11. Resumen de archivos finales

```
/home/pi/.bash_profile
/home/pi/.xinitrc
/home/pi/.config/openbox/autostart
/home/pi/open-display.sh
/home/pi/docker/docker-compose.yml
```
