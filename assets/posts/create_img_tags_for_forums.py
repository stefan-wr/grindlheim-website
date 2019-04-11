#!/usr/bin/python
# -*- coding: utf-8 -*-
try:
    import Tkinter as tk
except:
    import tkinter as tk
import sys

myprint = sys.stdout.write
post_path = "http://www.grindlheim.com/assets/posts/"

# Create post
post_id = input("Post ID:")
n_imgs = input("Anzahl Bilder:")

result = ""
for i in range(1, n_imgs):
    result += ('\n\n[img]' + post_path + str(post_id) + '/p' + str(post_id) + '-' + str(i) + '.jpg' + '[/img]' + '\n')
myprint(result)

# Copy to clipboard
copy_to_cp = raw_input("In die Zwischenablage kopieren (y/n)?")
if copy_to_cp == 'y':
    cp = tk.Tk()
    cp.withdraw()
    cp.clipboard_clear()
    cp.clipboard_append(result)
    cp.update()
    cp.destroy()