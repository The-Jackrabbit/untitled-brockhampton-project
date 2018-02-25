import re
import json
s = ""

with open('song.txt') as f:
	content = f.readlines()

song = {}
song['song_title'] = str(input("Song name: "))
pars = {}
paragraph = ""
prog = re.compile(r"[A-Za-z 0-9]+:")
current_header = ""
current_paragraph = {}
position = 0
print(content)
for i in range(len(content)):
	result = prog.search(content[i])
	if result is not None:
		current_header = content[i].replace("\n", "") + "_" + str(position)
		print("new header")
		print(current_header)
		print("")
		header_data = content[i].replace("[", "").replace("]", "").replace("\n", "").split(":")
		print("header_data")
		print(header_data)
		if re.search('[,]', header_data[1].strip()) is not None:
			header_people = header_data[1].strip().split(",")
		else:
			header_people = header_data[1].strip().split("&")
		for i in range(len(header_people)):
			print(header_people[i])
			header_people[i] = header_people[i].strip()
		print("header_people")
		print(header_people)
		current_paragraph['partType'] = header_data[0].split(" ")[0]
		current_paragraph['persons'] = header_people
		current_paragraph['position'] = position
	else: 
		if content[i] == '\n':
			current_paragraph['body'] = paragraph
			pars[current_header] = current_paragraph
			current_paragraph = {}
			paragraph = ""
			position += 1
		else:
			paragraph += content[i]

print("current paragraph after the run")
print(content[i])
if content[i] != '\n':
	current_paragraph['body'] = paragraph
	pars[current_header] = current_paragraph
song['body'] = pars

import json

with open('data.json', 'w') as fp:
	json.dump(song, fp)

f = open("parsedsong.txt", "w")
f.write(s)

# you may also want to remove whitespace characters like `\n` at the end of each line

print("")
print("")
print("")
print(pars)