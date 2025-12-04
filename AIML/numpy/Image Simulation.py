import numpy as np
pixarray=np.random.randint(0,255,size=(10,10))
print(pixarray)
mask=np.ones((10,10),dtype=bool)
mask[3:7,3:7]=False
pixarray=np.where(mask, pixarray+20,pixarray)
pixarray=np.clip(pixarray,0,255)
print(pixarray)
