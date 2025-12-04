import numpy as np
sample=np.random.randint(1,3,size=(2,2))
print(sample)
rows=np.sum(sample,axis=1)
columns=np.sum(sample,axis=0)
maind=np.sum(np.diagonal(sample))
antid=np.diagonal(np.fliplr(sample))
antid=np.sum(antid)
ref=rows[0]
if np.all(rows==ref) and np.all(columns==ref) and maind==ref and antid==ref:
    print("You have a magic matrix!")
else:
    print("You don't have a magic matrix")