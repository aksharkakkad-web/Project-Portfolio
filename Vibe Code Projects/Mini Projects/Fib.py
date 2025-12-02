def fib(n):
    seq=[0, 1]
    for i in range(2,n):
        seq.append(seq[i-1]+seq[i-2])
    print(seq[:n])
n=input()
print(fib(int(n)))