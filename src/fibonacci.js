
export default function fibonacci(n) {
    if (n < 2) {
        return n;
    }
 
    let fibA = 0;
    let fibB = 1;
    let result = 0;
 
    for(let i = 2; i <= n; i++) {
        result = fibA + fibB;
        fibA = fibB;
        fibB = result;
    }
 
    return result;
}