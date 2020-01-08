#!/usr/bin/python
# -*- coding: utf-8 -*-
import clipboard as cp
import sys

post_path = "http://www.grindlheim.com/assets/posts/"

# Ask for post id and number of images
post_id = int(input("Post ID:"))
n_imgs = int(input("Anzahl Bilder:"))

# Build the result string
result = ""
for i in range(1, n_imgs + 1):
    result += ('\n\n[img]' + post_path + str(post_id) + '/p' + str(post_id) + '-' + str(i) + '.jpg' + '[/img]' + '\n')
sys.stdout.write(result)

# Copy result to clipboard
copy_to_cp = str(input("In die Zwischenablage kopieren (y/n)?"))
if copy_to_cp == 'y':
    cp.copy(result)