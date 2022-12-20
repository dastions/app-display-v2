# Display App v2

## Available Scripts

In the project directory, you can run:

- `yarn start`
- `yarn build`

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

- `yarn eject` ¡Warning!

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## Screenshot
![image](https://user-images.githubusercontent.com/14354821/208718815-0772bcff-8c9c-4fec-a421-e71497d12895.png)

### Deployment

**A06 Display**
`/boot/config.txt`
```
[all]
#dtoverlay=vc4-fkms-v3d
hdmi_force_hotplug=1
dtparam=i2c_arm=on
dtparam=spi=on
enable_uart=1
display_rotate=0
# max_usb_current=1
config_hdmi_boost=7
hdmi_group=2
hdmi_mode=87
hdmi_drive=1
hdmi_cvt 1024 600 60 6 0 0 0
```

**Rotate Display**
Preferences Config or;
```
lcd_rotate=2
display_rotate=2
```

**Hide Cursor** `/etc/lightdm/lightdm.conf`
```
xserver-command = X -nocursor
```

### Steps to autostart chromium


Script: `/home/pi/bmauri/screen/start.sh`

```
#!/usr/bin/bash

sleep 15
chromium-browser --kiosk --enable-auto-reload --incognito --app="http://SERVER_IP:PORT"
```

**Exec script**

`chmod +x /home/pi/bmauri/screen/start.sh`


Config: `.config/lxsession/LXDE-pi/autostart`
```
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
# @xscreensaver -no-splash
@point-rpi

/home/pi/bmauri/screen/start.sh
```
