import numpy as np
salecount=np.random.randint(0,100,size=(5,7))
price=np.random.randint(15,200,size=(5,7))
totalsales=salecount*price
print(salecount)
print(price)
print(totalsales)
mask=salecount>50
price=price.astype(float)
price[mask]*=0.9
print(price)