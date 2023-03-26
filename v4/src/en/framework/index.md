---
title: Framework Laptop
---

# Framework Laptop

[Framework](https://frame.work/) Laptop is a laptop that is repairable and upgradable.
I bought one in 2022 for personal use, another in 2023 for work.
Both currently have Ubuntu Desktop 22.04.

## HiDPI

Framework Linux's display is 13.5 inch and 2256 x 1504 px. The pixel density is slightly lower than Apple's similar laptops. For example, MacBook Air is 13.3 inch and 2560 x 1600 px.

For me, the following setting strikes the good balance between screen real estate and smooth text rendering.

* Settings > Displays > Scale: 100%
* Tweaks > Fonts > Scaling Factor: 1.50
* Tweaks > Fonts > All font sizes: 10

"Tweaks" is `gnome-tweaks`.

## Brightness buttons don't work

The buttons don't work out of the box, but there is a fix.

https://community.frame.work/t/solved-ubuntu-22-brightness-keys-not-working/22460/7

## macOS-like Cmd/Ctrl split

macOS uses `Cmd` for GUI shortcuts (e.g., Cmd-c as copy) and keeps `Ctrl` for Unix-like shortcuts, including
Emacs-like editing shortcuts (e.g., Ctrl-n as down).

On Linux, technically Gnome + Wayland, [xremap](https://github.com/k0kubun/xremap) makes that possible.
My xremap.yml is on [GitHub](https://github.com/kzys/dotfiles/blob/master/xremap.yml).
