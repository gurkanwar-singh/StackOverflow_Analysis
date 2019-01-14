import csv

TAGS =[]
tagstring =""
COUNTS=[]
VIEWS = []
UPVOTES =[]
ANSWERS =[]
YEAR =[]


with open('data.csv', 'r') as csvFile:
    reader = csv.reader(csvFile)
    r = 0
    for row in reader:
        if r!= 0:
            print r
            taglist = row[4]
           
            if len(taglist) ==2 :
                continue
            else :   
                
                taglist = taglist.replace("[", "")
                taglist = taglist.replace("]", "")
                if "'" in taglist :
                    taglist = taglist.replace("'", "")
                tag = taglist.split(",")
                for i in range(len(tag)) :
                    
                    tag[i] = tag[i].strip()
                    
                    if tag[i] in TAGS :
                        tagstring = tagstring+ str(tag[i]) + ' '
                        index = TAGS.index(tag[i])
                        COUNTS[index] = COUNTS[index] +1 
                        VIEWS[index] = VIEWS[index] + int(row[2].replace(",",""))
                        UPVOTES[index] = UPVOTES[index] + int(row[1].replace(",",""))
                        ANSWERS[index] = ANSWERS[index] + int(row[3].replace(",",""))
                        
                        
                    else :
                        TAGS.append(tag[i])
                        COUNTS.append(1)
                        VIEWS.append(int(row[2].replace(",","")))
                        UPVOTES.append(int(row[1].replace(",","")))
                        ANSWERS.append(int(row[3].replace(",","")))
                        
                        
            
        r = r+1
            

csvFile.close()

print tagstring

outfile1 = open("counts.csv","w")
writer1 = csv.writer(outfile1, delimiter=",")
writer1.writerow(["Tag", "Counts"])

outfile2 = open("views.csv","w")
writer2 = csv.writer(outfile2, delimiter=",")
writer2.writerow(["Tag", "Views"])

outfile3 = open("votes.csv","w")
writer3 = csv.writer(outfile3, delimiter=",")
writer3.writerow(["Tag", "Votes"])

outfile4 = open("answers.csv","w")
writer4 = csv.writer(outfile4, delimiter=",")
writer4.writerow(["Tag", "Answers"])

for i in range(len(TAGS)) :
    writer1.writerow([TAGS[i], COUNTS[i]])
    writer2.writerow([TAGS[i], VIEWS[i]])
    writer3.writerow([TAGS[i], UPVOTES[i]])
    writer4.writerow([TAGS[i], ANSWERS[i]])
   