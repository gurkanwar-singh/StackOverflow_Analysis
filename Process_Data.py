import csv

r1 = [0]
r2 =[0]
r3 =[0]
r8 =[0]

with open('data.csv', 'r') as csvFile:
    reader = csv.reader(csvFile)

    r = 0
    for row in reader:
        if r!= 0:
            if ',' in row[1]:
               row[1].replace(",","")
            if ',' in row[2]:
                row[1].replace(",","")
            if ',' in row[3]:
               row[1].replace(",","")
            if ',' in row[8]:
               row[1].replace(",","")
            if 'k'  in row[1] :
                row[1] = row[1].strip()
                row[1].replace("k","")
                x = int(row[1])
                row[1] = row[1]*1000             
            if 'k'  in row[1] :
                row[1] = row[1].strip()
                row[1].replace("k","")
                x = int(row[1])
                row[1] = row[1]*1000 
            if 'k'  in row[2] :
                row[2] = row[2].strip()
                row[2].replace("k","")
                x = int(row[2])
                row[2] = row[2]*1000 
            if 'k'  in row[3] :
                row[3] = row[1].strip()
                row[3].replace("k","")
                x = int(row[3])
                row[3] = row[3]*1000 
            if 'k'  in row[8] :
                row[8] = row[8].strip()
                row[8].replace("k","")
                x = int(row[8])
                row[8] = row[8]*1000   
            r1.append(row[1])    
            r2.append(row[2]) 
            r3.append(row[3]) 
            r8.append(row[8])  
                  
        r = r+1

        
        outfile5 = open("Clean_data.csv","w")
        writer5 = csv.writer(outfile5, delimiter=",")
        h = 0
        for row in reader:
            if h ==0 :
                writer5.writerow(row)      
            else :
                writer5.writerow([row[0],r1[h], r2[h], r3[h], row[4], row[5], row[6], row[7], r8[h]])         