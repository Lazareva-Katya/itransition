import os
import sha3

path = 'D:\\Itra\\Task2\\task2'
filelist = os.listdir(path)
my_list = []

for name in filelist:
    file = open(path + '\\' + name, 'rb')
    my_list.append(sha3.sha3_256(file.read()).hexdigest())
    file.close()

my_list = sorted(my_list)
ts = my_list[0]

for i in range (1, len(my_list)):
    ts += my_list[i]

mail = 'lazareva-katya@tut.by'
ts += mail
print(sha3.sha3_256(ts.encode('utf-8')).hexdigest())
