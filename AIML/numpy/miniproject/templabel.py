import numpy as np
temp=np.random.randint(-11,41,size=(7,24))
print(temp)
tempf=np.round(temp.astype(float)*1.8+32)
print(tempf)
label=np.where(tempf>90,"Hot",np.where(tempf<32,"Cold","Normal"))
print(label)