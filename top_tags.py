import csv
d ={}
ctr = 0
with open('data.csv', 'r') as csvFile:
    reader = csv.reader(csvFile)
    r = 0
    for row in reader:
        if r!= 0:
            ctr +=1
            taglist = row[4]
            year = row[5].strip()
            year = year.split("/")
            
            #print(ctr)
            #print(row)
            year = year[2]
            #print(year)
            if len(taglist) ==2 :
                continue
            else :    
                taglist = taglist.replace("[", "")
                taglist = taglist.replace("]", "")
                if "'" in taglist :
                    taglist = taglist.replace("'", "")
                    taglist = taglist.replace(" ", "")
                tag = taglist.split(",")                  
                for i in range(len(tag)):
                    tag[i] = tag[i].strip()
                    if (tag[i] , year) in d:
                            d[(tag[i] , year)] += 1
                    else :
                        d[(tag[i] , year)] = 1
                        
        r = r+1
        
top_tags = {}
for tag,year in d:
    if year == "18":
        top_tags[tag] = d[(tag,year)]

#print(top_tags)
ctr = 0
res = []
y = sorted(top_tags, key = lambda x: top_tags[x], reverse=True)
#print(y)

for k in y:
    if ctr > 9:
        break
    #print(k[0])
    res.append(k)
    ctr += 1

#print(res)
final = {}
#print("-------------")
for k in d:
    #rint(k[0], k[1])
    if k[0] in res:
        #print(res, k[0])
        final[k[1]] = final.get(k[1], []) + [[k[0],d[k]]]
        #print(final[k[1]])

for year in final:
    #print(len(final[year]))
    final[year] = sorted(final[year], key=lambda x: res.index(x[0]))
    print(year, len(final[year]))
    print (final[year])



'''
outfile5 = open("years.csv","w")
writer5 = csv.writer(outfile5, delimiter=",")
writer5.writerow(["Tag","Year", "Counts"])
for i in d :
    writer5.writerow([i[0], i[1], d[i] ])
'''